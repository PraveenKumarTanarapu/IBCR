import "server-only";

/**
 * Submission handling for the site's forms.
 *
 * Every form posts JSON here, gets validated, and is recorded. There is no
 * third-party dependency: swap `deliver()` for your CRM / mail transport
 * (Resend, SendGrid, HubSpot, a database write) and the rest keeps working.
 * See README.md → "Wiring the forms up".
 */

export type FieldRule = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "phone" | "textarea";
  max?: number;
  oneOf?: readonly string[];
};

export type Validated = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+]?[\d\s().-]{7,24}$/;

export function validate(
  input: unknown,
  rules: readonly FieldRule[],
): { ok: true; data: Validated } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = input as Record<string, unknown>;
  const data: Validated = {};

  // Honeypot: real people never fill this in.
  if (typeof raw.company_website === "string" && raw.company_website.trim() !== "") {
    return { ok: false, error: "Submission rejected." };
  }

  for (const rule of rules) {
    const value = typeof raw[rule.name] === "string" ? (raw[rule.name] as string).trim() : "";

    if (!value) {
      if (rule.required) return { ok: false, error: `${rule.label} is required.` };
      continue;
    }
    if (value.length > (rule.max ?? 2000)) {
      return { ok: false, error: `${rule.label} is too long.` };
    }
    if (rule.type === "email" && !EMAIL.test(value)) {
      return { ok: false, error: `Please enter a valid email address.` };
    }
    if (rule.type === "phone" && !PHONE.test(value)) {
      return { ok: false, error: `Please enter a valid phone number.` };
    }
    if (rule.oneOf && !rule.oneOf.includes(value)) {
      return { ok: false, error: `${rule.label} is not a recognised option.` };
    }
    data[rule.name] = value;
  }

  return { ok: true, data };
}

/* ------------------------------------------------------- rate limiting */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

export function rateLimit(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length <= MAX_PER_WINDOW;
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}

/* ------------------------------------------------------------ delivery */

export type SubmissionKind = "enquiry" | "membership" | "event" | "newsletter";

const SUBJECTS: Record<SubmissionKind, string> = {
  enquiry: "New enquiry from the IBCR website",
  membership: "New membership application",
  event: "New event registration",
  newsletter: "New newsletter subscription",
};

/** Where every submission is sent. Override with IBCR_SUBMISSION_EMAIL. */
const INBOX = process.env.IBCR_SUBMISSION_EMAIL || "info@ibcr.rw";

function asText(kind: SubmissionKind, data: Validated, receivedAt: string) {
  const lines = Object.entries(data).map(([key, value]) => `${key}: ${value}`);
  return [`${SUBJECTS[kind]}`, `Received: ${receivedAt}`, "", ...lines].join("\n");
}

/**
 * Send the submission on by email.
 *
 * Uses Resend's HTTP API when IBCR_RESEND_API_KEY is set — no SDK, just a
 * fetch, so nothing is added to the bundle. Without a key nothing is emailed
 * and the record still goes to the log and the webhook, which is what keeps
 * local development quiet.
 */
async function email(kind: SubmissionKind, data: Validated, receivedAt: string) {
  const key = process.env.IBCR_RESEND_API_KEY;
  if (!key) return false;

  const from = process.env.IBCR_SUBMISSION_FROM || "IBCR Website <website@ibcr.rw>";
  const replyTo = typeof data.email === "string" ? data.email : undefined;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from,
        to: [INBOX],
        subject: SUBJECTS[kind],
        text: asText(kind, data, receivedAt),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("[ibcr:submission] email rejected", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[ibcr:submission] email failed", error);
    return false;
  }
}

export async function deliver(kind: SubmissionKind, data: Validated) {
  const record = {
    kind,
    receivedAt: new Date().toISOString(),
    to: INBOX,
    data,
  };

  // The log is the floor: a submission is never silently dropped.
  console.info("[ibcr:submission]", JSON.stringify(record));

  await email(kind, data, record.receivedAt);

  const webhook = process.env.IBCR_SUBMISSION_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (error) {
      console.error("[ibcr:submission] webhook failed", error);
    }
  }

  return record;
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}
