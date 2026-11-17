import "./load-env.js";
import { z } from "zod";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

const schema = z.object({
  DATABASE_URL: z.string().url(),
  RAZORPAY_KEY_ID: z.string().min(8),
  RAZORPAY_KEY_SECRET: z.string().min(8),
  RAZORPAY_WEBHOOK_SECRET: z.string().min(8),
  FRONTEND_ORIGIN: z.string().url(),
  PORT: z.coerce.number().int().positive().default(8080),
  RAZORPAY_WEBHOOK_URL: z.string().url().optional(),
  SITE_URL: z.string().url().default("https://theplugin.world"),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_APP_PASSWORD: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().default("grow@theplugin.world"),
  CONTACT_FROM_EMAIL: z.string().email().default("grow@theplugin.world"),
  RAZORPAY_CHECKOUT_CONFIG_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  CALL_BOOKINGS_SECRET: z.preprocess(blankToUndefined, z.string().min(16).optional()),
  CALL_BOOKINGS_SHEETS_WEBHOOK_URL: z.preprocess(blankToUndefined, z.string().url().optional()),
});

export const env = schema.parse(process.env);
