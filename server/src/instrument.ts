import "./load-env.js";
import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_DSN;
const enabled = Boolean(dsn);

if (enabled) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    enableLogs: true,
    // Forward console.* output to Sentry Logs so existing logging is captured.
    integrations: [Sentry.consoleLoggingIntegration({ levels: ["log", "info", "warn", "error"] })],
  });
}

export { Sentry, enabled as sentryEnabled };
