import { useState } from "react";
import { brand } from "../../lib/brand";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="font-mono text-lg text-flow-light">
        You're in. Growth insights heading your way.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 ${compact ? "" : "md:flex-row md:items-end"}`}
    >
      <div className={compact ? "space-y-3" : "flex flex-1 flex-col gap-4 sm:flex-row"}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="input-dark"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="input-dark"
        />
      </div>
      <button type="submit" className="btn-solid shrink-0">
        Subscribe
      </button>
      <p className="sr-only">Newsletter signup. Connect to {brand.email} or ESP later.</p>
    </form>
  );
}
