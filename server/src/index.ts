import "./instrument.js";
import crypto from "node:crypto";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import Razorpay from "razorpay";
import { z } from "zod";
import { callBookingsRouter, startSheetRetryLoop } from "./call-bookings.js";
import { db, verifyDbConnection } from "./db.js";
import { env } from "./env.js";
import { Sentry, sentryEnabled } from "./instrument.js";
import { notifyPaymentSuccess } from "./notify.js";

const razorpay = new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Idempotency-Key"],
  })
);
app.use(rateLimit({ windowMs: 60_000, max: 60, standardHeaders: true, legacyHeaders: false }));

app.get("/health", (_req, res) => res.json({ ok: true }));

if (process.env.NODE_ENV !== "production") {
  app.get("/debug-sentry", () => {
    throw new Error("Sentry test error");
  });
}

app.post(
  "/api/webhooks/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    try {
    const sig = req.header("x-razorpay-signature");
    if (!sig) return res.status(400).send("missing signature");

    const body = req.body as Buffer;
    const expected = crypto.createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex");
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return res.status(401).send("invalid signature");
    }

    const event = JSON.parse(body.toString("utf8")) as {
      event: string;
      payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string } } };
    };
    const paymentId = event.payload?.payment?.entity?.id;
    const eventId = paymentId ? `${event.event}:${paymentId}` : null;
    if (!eventId) return res.status(400).send("invalid event");

    const inserted = await db("payment_events")
      .insert({ event_id: eventId, type: event.event, payload: event })
      .onConflict("event_id")
      .ignore()
      .returning("id");
    if (!inserted.length) return res.json({ ok: true, duplicate: true });

    const payment = event.payload?.payment?.entity;
    if (payment?.order_id) {
      if (payment.status === "captured") {
        await db("orders").where({ razorpay_order_id: payment.order_id }).update({ status: "paid" });
        const order = await db("orders").where({ razorpay_order_id: payment.order_id }).first();
        if (order && payment.id) {
          await db("payments")
            .insert({ order_id: order.id, razorpay_payment_id: payment.id, status: "captured" })
            .onConflict("order_id")
            .merge({ razorpay_payment_id: payment.id, status: "captured", updated_at: db.fn.now() });
          void notifyPaymentSuccess(order.id, payment.id);
        }
      } else if (event.event === "payment.failed") {
        await db("orders").where({ razorpay_order_id: payment.order_id }).update({ status: "failed" });
      }
    }

    res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  }
);

app.use(express.json({ limit: "32kb" }));
app.use(callBookingsRouter);

const idemKey = z.string().uuid();
const createSchema = z.object({
  planSlug: z.string().min(3).max(64),
  name: z.string().min(2).max(120),
  contact: z.string().min(6).max(32),
  email: z.string().email().max(254),
  website: z.string().max(200).optional(),
  serviceRequirement: z.string().min(10).max(2000),
});

app.post("/api/payments/orders", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid request" });

  const keyParsed = idemKey.safeParse(req.header("Idempotency-Key"));
  if (!keyParsed.success) return res.status(400).json({ error: "Idempotency-Key must be a UUID" });
  const idemKeyValue = keyParsed.data;
  const scope = "create_order";

  const cached = await db("idempotency_keys").where({ key: idemKeyValue, scope }).first();
  if (cached) return res.status(cached.status_code).json(cached.body);

  const plan = await db("plans").where({ slug: parsed.data.planSlug, active: true }).first();
  if (!plan) return res.status(404).json({ error: "Plan not found" });

  try {
    const result = await db.transaction(async (trx) => {
      const existingOrder = await trx("orders").where({ idempotency_key: idemKeyValue }).first();
      if (existingOrder) {
        return {
          status: 200,
          body: {
            orderId: existingOrder.id,
            razorpayOrderId: existingOrder.razorpay_order_id,
            amount: existingOrder.amount_minor,
            currency: existingOrder.currency,
            keyId: env.RAZORPAY_KEY_ID,
            planName: plan.name,
          },
        };
      }

      const [customer] = await trx("customers")
        .insert({
          name: parsed.data.name.trim(),
          email: parsed.data.email.trim().toLowerCase(),
          phone: parsed.data.contact.trim(),
          website: parsed.data.website?.trim() || null,
          service_requirement: parsed.data.serviceRequirement.trim(),
        })
        .returning("*");

      const orderPayload = {
        amount: plan.amount_minor,
        currency: plan.currency,
        receipt: crypto.randomUUID().replace(/-/g, "").slice(0, 40),
        notes: { plan_slug: plan.slug, customer_id: customer.id },
        ...(env.RAZORPAY_CHECKOUT_CONFIG_ID
          ? { checkout_config_id: env.RAZORPAY_CHECKOUT_CONFIG_ID }
          : {}),
      };

      const rzOrder = await razorpay.orders.create(orderPayload);

      const [order] = await trx("orders")
        .insert({
          customer_id: customer.id,
          plan_slug: plan.slug,
          razorpay_order_id: rzOrder.id,
          status: "created",
          amount_minor: plan.amount_minor,
          currency: plan.currency,
          idempotency_key: idemKeyValue,
        })
        .returning("*");

      return {
        status: 201,
        body: {
          orderId: order.id,
          razorpayOrderId: rzOrder.id,
          amount: plan.amount_minor,
          currency: plan.currency,
          keyId: env.RAZORPAY_KEY_ID,
          planName: plan.name,
        },
      };
    });

    await db("idempotency_keys")
      .insert({ key: idemKeyValue, scope, status_code: result.status, body: result.body })
      .onConflict("key")
      .ignore();

    return res.status(result.status).json(result.body);
  } catch (err) {
    Sentry.captureException(err);
    return res.status(500).json({ error: "Could not create order" });
  }
});

const verifySchema = z.object({
  orderId: z.string().uuid(),
  razorpayOrderId: z.string().min(4).max(64),
  razorpayPaymentId: z.string().min(4).max(64),
  razorpaySignature: z.string().min(10).max(256),
});

app.post("/api/payments/verify", async (req, res, next) => {
  try {
  const parsed = verifySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid request" });

  const keyParsed = idemKey.safeParse(req.header("Idempotency-Key"));
  if (!keyParsed.success) return res.status(400).json({ error: "Idempotency-Key must be a UUID" });
  const idemKeyValue = keyParsed.data;
  const scope = `verify:${parsed.data.razorpayPaymentId}`;

  const cached = await db("idempotency_keys").where({ key: idemKeyValue, scope }).first();
  if (cached) return res.status(cached.status_code).json(cached.body);

  const order = await db("orders").where({ id: parsed.data.orderId }).first();
  if (!order || order.razorpay_order_id !== parsed.data.razorpayOrderId) {
    return res.status(404).json({ error: "Order not found" });
  }

  const payload = `${parsed.data.razorpayOrderId}|${parsed.data.razorpayPaymentId}`;
  const expected = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(payload).digest("hex");
  const valid =
    expected.length === parsed.data.razorpaySignature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parsed.data.razorpaySignature));

  if (!valid) {
    await db("orders").where({ id: order.id }).update({ status: "failed" });
    const body = { ok: false, status: "failed" };
    await db("idempotency_keys")
      .insert({ key: idemKeyValue, scope, status_code: 400, body })
      .onConflict("key")
      .ignore();
    return res.status(400).json(body);
  }

  await db.transaction(async (trx) => {
    await trx("orders").where({ id: order.id }).update({ status: "paid" });
    await trx("payments")
      .insert({
        order_id: order.id,
        razorpay_payment_id: parsed.data.razorpayPaymentId,
        status: "captured",
      })
      .onConflict("order_id")
      .merge({ razorpay_payment_id: parsed.data.razorpayPaymentId, status: "captured", updated_at: trx.fn.now() });
  });

  void notifyPaymentSuccess(order.id, parsed.data.razorpayPaymentId);

  const body = { ok: true, status: "paid", orderId: order.id };
  await db("idempotency_keys")
    .insert({ key: idemKeyValue, scope, status_code: 200, body })
    .onConflict("key")
    .ignore();
  return res.json(body);
  } catch (err) {
    next(err);
  }
});

app.get("/api/payments/orders/:id", async (req, res, next) => {
  try {
  const id = z.string().uuid().safeParse(req.params.id);
  if (!id.success) return res.status(400).json({ error: "Invalid id" });

  const row = await db("orders as o")
    .join("plans as p", "p.slug", "o.plan_slug")
    .leftJoin("payments as pay", "pay.order_id", "o.id")
    .select(
      "o.id",
      "o.status",
      "o.amount_minor",
      "o.currency",
      "o.created_at",
      "p.name as plan_name",
      "p.division",
      "pay.razorpay_payment_id"
    )
    .where("o.id", id.data)
    .first();

  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
  } catch (err) {
    next(err);
  }
});

if (sentryEnabled) {
  Sentry.setupExpressErrorHandler(app);
}

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (res.headersSent) return;
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

verifyDbConnection()
  .then(() => {
    app.listen(env.PORT, "0.0.0.0", () => {
      console.log(`payments api on :${env.PORT}`);
      startSheetRetryLoop();
      if (sentryEnabled) {
        Sentry.logger.info("payments api started", { port: env.PORT, env: process.env.NODE_ENV });
      }
      if (env.RAZORPAY_WEBHOOK_URL) {
        console.log(`razorpay webhook → ${env.RAZORPAY_WEBHOOK_URL}`);
      }
    });
  })
  .catch((err) => {
    Sentry.captureException(err);
    console.error("database connection failed", err);
    process.exit(1);
  });
