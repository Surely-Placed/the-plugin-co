import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPaymentOrder, paymentsConfig, verifyPayment } from "../lib/payments";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay() {
  return new Promise<void>((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Razorpay failed to load"));
    document.body.appendChild(s);
  });
}

export function useRazorpayCheckout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkout = useCallback(
    async (input: {
      planSlug: string;
      name: string;
      contact: string;
      email: string;
      website?: string;
      serviceRequirement: string;
    }) => {
      if (!paymentsConfig.enabled) throw new Error("Payments not configured");
      setLoading(true);
      const orderKey = crypto.randomUUID();
      try {
        await loadRazorpay();
        const order = await createPaymentOrder(input, orderKey);
        await new Promise<void>((resolve, reject) => {
          const rz = new window.Razorpay!({
            key: order.keyId,
            amount: order.amount,
            currency: order.currency,
            name: "The Plugin",
            description: order.planName,
            order_id: order.razorpayOrderId,
            prefill: { name: input.name, email: input.email, contact: input.contact },
            theme: { color: "#1b68cf" },
            // Enable every method Razorpay supports for this currency/account
            method: {
              upi: true,
              card: true,
              netbanking: true,
              wallet: true,
              emi: true,
              paylater: true,
            },
            config: {
              display: {
                preferences: { show_default_blocks: true },
              },
            },
            retry: { enabled: true, max_count: 3 },
            handler: async (response: {
              razorpay_payment_id: string;
              razorpay_order_id: string;
              razorpay_signature: string;
            }) => {
              try {
                await verifyPayment(
                  {
                    orderId: order.orderId,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                  crypto.randomUUID()
                );
                navigate(`/payment/success?order=${order.orderId}`);
                resolve();
              } catch {
                navigate(`/payment/failure?order=${order.orderId}`);
                reject();
              }
            },
            modal: {
              ondismiss: () => {
                navigate(`/payment/failure?order=${order.orderId}`);
                reject(new Error("dismissed"));
              },
            },
          });
          rz.open();
        });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return { checkout, loading, enabled: paymentsConfig.enabled };
}
