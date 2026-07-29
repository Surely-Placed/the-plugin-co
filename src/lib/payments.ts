const api = import.meta.env.VITE_PAYMENTS_API_URL ?? "http://localhost:8080";

// The Razorpay Key ID is returned by the backend per-order, so it never
// needs to live in the frontend env. We only need the API URL configured.
export const paymentsConfig = { api, enabled: Boolean(api) };

export async function createPaymentOrder(
  body: {
    planSlug: string;
    name: string;
    contact: string;
    email: string;
    website?: string;
    serviceRequirement: string;
  },
  idempotencyKey: string
) {
  const res = await fetch(`${api}/api/payments/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Order failed");
  return data as {
    orderId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    keyId: string;
    planName: string;
  };
}

export async function verifyPayment(
  body: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  },
  idempotencyKey: string
) {
  const res = await fetch(`${api}/api/payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Verification failed");
  return data as { ok: boolean; status: string; orderId: string };
}

export async function fetchOrder(id: string) {
  const res = await fetch(`${api}/api/payments/orders/${id}`);
  if (!res.ok) return null;
  return res.json() as Promise<{
    id: string;
    status: string;
    amount_minor: number;
    currency: string;
    plan_name: string;
    division: string;
  }>;
}
