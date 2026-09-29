/**
 * SMTP connection options, shared by the site and by `npm run mail:test`.
 *
 * Plain JavaScript on purpose: the test script is run directly by Node, and
 * this way it opens the exact connection the site opens rather than an
 * approximation that can drift out of step with it.
 *
 * @param {string} host
 * @param {number} port
 * @param {string} [user]
 * @param {string} [pass]
 */
export function smtpOptions(host, port, user, pass) {
  return {
    host,
    port,
    // 465 is implicit TLS; 587 and 25 upgrade with STARTTLS if it is offered.
    secure: port === 465,
    // Credentials are optional: relaying through the mail server on the same
    // machine (cPanel hosts, localhost:25) needs no login, and offering empty
    // credentials makes the server reject the session.
    ...(user && pass ? { auth: { user, pass } } : {}),
    // Shared hosts commonly present a certificate for the server's own
    // hostname rather than for the mail domain. The connection is still
    // encrypted; set IBCR_SMTP_STRICT_TLS=true to insist on a matching name.
    tls: { rejectUnauthorized: process.env.IBCR_SMTP_STRICT_TLS === "true" },
  };
}
