import { db } from "./db.js";
import { Sentry } from "./instrument.js";
import { sendPaymentEmails } from "./mail.js";

const DIVISION_LABEL: Record<string, string> = {
  growth: "For Businesses",
  careers: "For Talent",
};

export async function notifyPaymentSuccess(orderId: string, paymentId?: string) {
  const claimed = await db("orders")
    .where({ id: orderId, status: "paid" })
    .whereNull("confirmation_emailed_at")
    .update({ confirmation_emailed_at: db.fn.now() })
    .returning("id");

  if (!claimed.length) return;

  try {
    const row = await db("orders as o")
      .join("customers as c", "c.id", "o.customer_id")
      .join("plans as p", "p.slug", "o.plan_slug")
      .leftJoin("payments as pay", "pay.order_id", "o.id")
      .select(
        "o.id",
        "o.amount_minor",
        "o.currency",
        "c.name",
        "c.email",
        "c.phone",
        "c.website",
        "c.service_requirement",
        "p.name as plan_name",
        "p.division",
        "pay.razorpay_payment_id"
      )
      .where("o.id", orderId)
      .first();

    if (!row) {
      await db("orders").where({ id: orderId }).update({ confirmation_emailed_at: null });
      return;
    }

    const amountLabel = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: row.currency,
    }).format(row.amount_minor / 100);

    await sendPaymentEmails({
      name: row.name,
      email: row.email,
      contact: row.phone ?? "—",
      website: row.website ?? undefined,
      serviceRequirement: row.service_requirement ?? "—",
      planName: row.plan_name,
      division: DIVISION_LABEL[row.division] ?? row.division,
      amountLabel,
      orderId: row.id,
      paymentId: paymentId ?? row.razorpay_payment_id ?? undefined,
    });
  } catch (err) {
    await db("orders").where({ id: orderId }).update({ confirmation_emailed_at: null });
    Sentry.captureException(err);
    console.error("[payment-email]", err);
  }
}
