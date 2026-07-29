import { useState } from "react";
import type { DivisionId } from "../../lib/divisions";
import { getDivision } from "../../lib/divisions";
import { useRazorpayCheckout } from "../../hooks/useRazorpayCheckout";
import { PaymentCheckoutForm } from "./PaymentCheckoutForm";

interface PayTierButtonProps {
  division: DivisionId;
  planSlug: string;
  planName: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

export function PayTierButton({
  division,
  planSlug,
  planName,
  label = "Pay now",
  className = "",
  fullWidth = false,
}: PayTierButtonProps) {
  const config = getDivision(division);
  const { checkout, loading, enabled } = useRazorpayCheckout();
  const [open, setOpen] = useState(false);

  if (!enabled) {
    return (
      <a
        href={config.bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={["btn-primary", fullWidth && "w-full", className].filter(Boolean).join(" ")}
      >
        {config.ctaLabel}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen(true)}
        className={["btn-primary", fullWidth && "w-full", className].filter(Boolean).join(" ")}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="flow-card my-8 w-full max-w-2xl p-6 md:p-10">
            <p className="label-xs text-flow-light">Secure checkout</p>
            <h3 className="heading-card-lg mt-2">Before you pay</h3>
            <p className="mt-2 font-mono text-sm text-white/70">
              Tell us a bit about you, then continue to Razorpay.
            </p>
            <div className="mt-8">
              <PaymentCheckoutForm
                planName={planName}
                loading={loading}
                onCancel={() => setOpen(false)}
                onPay={async (values) => {
                  await checkout({ planSlug, ...values });
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
