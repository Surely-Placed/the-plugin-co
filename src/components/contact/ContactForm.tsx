import { useRef, useState } from "react";
import { submitContactForm } from "../../lib/leads";
import { useToast } from "../ui/ToastProvider";

const inputClass = "tp-in";

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      contact: String(form.get("contact") ?? ""),
      email: String(form.get("email") ?? ""),
      website: String(form.get("website") ?? ""),
      serviceRequirement: String(form.get("serviceRequirement") ?? ""),
      pageUrl: window.location.href,
    };

    try {
      await submitContactForm(payload);
      setStatus("success");
      formRef.current?.reset();
      toast({
        type: "success",
        title: "Message sent!",
        message: "We'll get back to you within 24 hours.",
        duration: 6000,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      toast({
        type: "error",
        title: "Could not send message",
        message,
        duration: 8000,
      });
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <p className="font-mono text-3xl text-accent">Thanks for reaching out.</p>
        <p className="mt-4 text-base text-muted">
          We&apos;ll respond within 24 hours at the email you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-8 min-h-11"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-xs mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact" className="label-xs mb-2 block">
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="Phone or WhatsApp"
          />
        </div>
        <div>
          <label htmlFor="email" className="label-xs mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="website" className="label-xs mb-2 block">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            className={inputClass}
            placeholder="yourcompany.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceRequirement" className="label-xs mb-2 block">
          Service requirement
        </label>
        <textarea
          id="serviceRequirement"
          name="serviceRequirement"
          rows={5}
          required
          minLength={10}
          className={inputClass}
          placeholder="What do you need help with? Include services, goals, and timeline if you can."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-solid min-h-11 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
