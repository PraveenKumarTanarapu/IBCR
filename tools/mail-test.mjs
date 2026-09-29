/**
 * Prove the mail settings before trusting the contact form.
 *
 *   npm run mail:test                 # sends to IBCR_SUBMISSION_EMAIL
 *   npm run mail:test you@example.com # sends somewhere else
 *
 * Reads .env.local exactly as the site does, opens the same SMTP connection
 * the site opens, and prints what the mail server actually said. A failure
 * here is the real reason the contact form is silent — this just shows it in
 * two seconds instead of after filling in a form.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import { smtpOptions } from "../src/lib/server/smtp.mjs";

/**
 * Read .env.local ourselves rather than relying on `node --env-file`, which
 * only exists on newer Node versions and fails the whole command on older
 * ones. Values already in the environment win, so you can still override any
 * of them inline for a one-off test.
 */
function loadEnv() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  for (const name of [".env.local", ".env"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
      if (!match) continue;
      const key = match[1];
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
    console.log(`  read   ${name}`);
  }
}

loadEnv();

const host = process.env.IBCR_SMTP_HOST;
const port = Number(process.env.IBCR_SMTP_PORT || 465);
const user = process.env.IBCR_SMTP_USER;
const pass = process.env.IBCR_SMTP_PASS;
const inbox = process.argv[2] || process.env.IBCR_SUBMISSION_EMAIL || "info@ibcr.rw";
const from = process.env.IBCR_SUBMISSION_FROM || `IBCR Website <${inbox}>`;

console.log("");
console.log("  host  ", host || "(not set)");
console.log("  port  ", port, port === 465 ? "(implicit TLS)" : "(STARTTLS if offered)");
console.log("  user  ", user || "(none — relaying without authentication)");
console.log("  pass  ", pass ? `${"*".repeat(Math.min(pass.length, 12))}` : "(none)");
console.log("  from  ", from);
console.log("  to    ", inbox);
console.log("");

if (!host) {
  console.error("IBCR_SMTP_HOST is not set.");
  console.error("Copy .env.example to .env.local, fill it in, and run this again.");
  process.exit(1);
}

const transport = nodemailer.createTransport(smtpOptions(host, port, user, pass));

try {
  console.log("→ verifying the connection…");
  await transport.verify();
  console.log("✓ connected and authenticated");

  console.log("→ sending…");
  const info = await transport.sendMail({
    from,
    to: inbox,
    subject: "IBCR website — mail test",
    text: [
      "This is a test from the IBCR website.",
      "",
      "If it is in the inbox, the contact form will deliver too.",
      `Sent: ${new Date().toISOString()}`,
    ].join("\n"),
  });
  console.log(`✓ accepted for delivery — id ${info.messageId}`);
  console.log("");
  console.log(`Now check ${inbox}. Look in Spam as well as the inbox.`);
} catch (error) {
  console.error("");
  console.error("✗ failed:", error.message);
  const code = error.code || "";
  const response = String(error.response || "");

  if (code === "EAUTH" || response.includes("535")) {
    console.error("");
    console.error("  The server rejected the username or password.");
    console.error("  - IBCR_SMTP_USER must be the FULL address, info@ibcr.rw, not 'info'.");
    console.error("  - Use the mailbox password from cPanel → Email Accounts.");
    console.error("  - Reset it in cPanel if you are unsure, then try again.");
  } else if (code === "ECONNECTION" || code === "ETIMEDOUT" || code === "ESOCKET") {
    console.error("");
    console.error("  Could not reach the mail server on that host and port.");
    console.error("  - Check the host in cPanel → Email Accounts → Connect Devices.");
    console.error("  - Try port 587 instead of 465.");
    console.error("  - If the site is hosted on the same server, try host=localhost port=25.");
    console.error("  - Some networks block outbound SMTP; try from the server itself.");
  } else if (response.includes("550") || response.includes("553")) {
    console.error("");
    console.error("  The server refused the From address.");
    console.error("  IBCR_SUBMISSION_FROM must be a mailbox this account may send as.");
  }
  process.exit(1);
}
