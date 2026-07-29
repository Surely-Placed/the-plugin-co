import { useRef, useState } from "react";

const inputClass = "input-dark";

export interface CheckoutFormValues {
  name: string;
  contact: string;
  email: string;
  website: string;
  serviceRequirement: string;
}

interface PaymentCheckoutFormProps {
  planName: string;
  loading?: boolean;
  onPay: (values: CheckoutFormValues) => void | Promise<void>;
  onCancel: () => void;
}

export function PaymentCheckoutForm({ planName, loading, onPay, onCancel }: PaymentCheckoutFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const values: CheckoutFormValues = {
      name: String(form.get("name") ?? "").trim(),
      contact: String(form.get("contact") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
      serviceRequirement: String(form.get("serviceRequirement") ?? "").trim(),
    };
    try {
      await onPay(values);
    } catch {
      setError("Payment could not be started. Please try again.");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <p className="font-mono text-sm text-white/70">
        Plan: <span className="text-flow-light">{planName}</span>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pay-name" className="label-xs mb-2 block">
            Name
          </label>
          <input id="pay-name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="pay-contact" className="label-xs mb-2 block">
            Contact
          </label>
          <input id="pay-contact" name="contact" type="tel" required autoComplete="tel" className={inputClass} placeholder="Phone or WhatsApp" />
        </div>
        <div>
          <label htmlFor="pay-email" className="label-xs mb-2 block">
            Email
          </label>
          <input id="pay-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="pay-website" className="label-xs mb-2 block">
            Website
          </label>
          <input id="pay-website" name="website" type="text" inputMode="url" autoComplete="url" className={inputClass} placeholder="yourcompany.com" />
        </div>
      </div>

      <div>
        <label htmlFor="pay-serviceRequirement" className="label-xs mb-2 block">
          Service requirement
        </label>
        <textarea
          id="pay-serviceRequirement"
          name="serviceRequirement"
          rows={4}
          required
          minLength={10}
          className={inputClass}
          placeholder="What do you need help with? Include goals and timeline if you can."
        />
      </div>

      {error && <p className="font-mono text-sm text-red-300">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn-secondary min-h-11 flex-1" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary min-h-11 flex-1" disabled={loading}>
          {loading ? "Opening checkout…" : "Pay"}
        </button>
      </div>
    </form>
  );
}
