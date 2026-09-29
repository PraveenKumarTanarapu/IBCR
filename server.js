/**
 * Production server.
 *
 * `next start` is the usual way to run a built Next.js app, but cPanel hosts
 * (InMotion, and anything else running Phusion Passenger) start an app by
 * requiring a single file and letting it call `listen()` — Passenger patches
 * `listen` and hands the app its own socket, ignoring the port. This file is
 * that entry point, and it does exactly what `next start` does.
 *
 * Deliberately plain CommonJS: it is not compiled by Next.js, so it has to be
 * valid for the bare Node version the host is running (20.9 or newer).
 */
const { createServer } = require("node:http");

const dir = __dirname;

// Passenger sets this through the "Application mode" field, but a default here
// means a misconfigured app still serves the production build rather than
// failing to find a dev server.
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Credentials can come either from the host's environment-variable panel or
// from a .env.local sitting next to this file. Next.js loads .env files itself
// under `next start`; a custom server has to ask for it.
try {
  require("@next/env").loadEnvConfig(dir, false);
} catch {
  // @next/env ships with next; if it ever moves, environment variables set by
  // the host still work and only .env files are skipped.
}

const nextModule = require("next");
const next = nextModule.default || nextModule;

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT) || 3000;

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`[ibcr] ready on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("[ibcr] failed to start", error);
    process.exit(1);
  });
