import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import {
  BUDGET_OPTIONS,
  COUNTRY_OPTIONS,
  PROBLEM_MAX,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  emptyBookCallForm,
  submitBookCall,
  validateBookCall,
  type BookCallErrors,
  type BookCallForm,
} from "../../lib/book-call";
import { CALENDAR_EMBED_URL, CALENDAR_URL } from "../../config/calendar";
import { trackCtaClick } from "../../lib/design/cta";

interface BookCallModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/** Force the dark palette inside the modal regardless of the page theme. */
const DARK_VARS = {
  "--tp-input-bg": "#050a12",
  "--tp-text": "rgba(255, 255, 255, 0.95)",
  "--tp-muted": "rgba(255, 255, 255, 0.6)",
  "--tp-muted-strong": "rgba(255, 255, 255, 0.78)",
  "--tp-border": "rgba(255, 255, 255, 0.14)",
  colorScheme: "dark",
} as CSSProperties;

const labelCls = "font-mono text-[11px] uppercase tracking-[0.16em] text-white/70";
const errorCls = "mt-1.5 font-mono text-xs text-red-300";

export function BookCallModal({ open, onClose }: BookCallModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<BookCallForm>(emptyBookCallForm);
  const [errors, setErrors] = useState<BookCallErrors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const step2HeadingRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const descId = useId();
  const fid = useId();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPadding: document.body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      const first = panel?.querySelector<HTMLElement>("input:not([tabindex='-1']), iframe, h2[tabindex]");
      (first ?? panel)?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
      document.body.style.paddingRight = prev.bodyPadding;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && step === 2) step2HeadingRef.current?.focus();
  }, [open, step]);

  if (!open) return null;

  const set = <K extends keyof BookCallForm>(key: K, value: BookCallForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (service: string) =>
    set(
      "services",
      form.services.includes(service)
        ? form.services.filter((s) => s !== service)
        : [...form.services, service]
    );

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (sending) return;
    const found = validateBookCall(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0];
      panelRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setSending(true);
    setSubmitError(null);
    try {
      await submitBookCall(form);
      trackCtaClick("book-details-submitted");
      setStep(2);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  const fieldProps = (key: keyof BookCallForm) => ({
    id: `${fid}-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${fid}-${key}-err` : undefined,
    className: `tp-in ${errors[key] ? "border-red-400" : ""}`,
  });

  const fieldError = (key: keyof BookCallForm) =>
    errors[key] ? (
      <p id={`${fid}-${key}-err`} className={errorCls}>
        {errors[key]}
      </p>
    ) : null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-stretch justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        style={DARK_VARS}
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#061428] text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] outline-none sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:max-w-[780px] sm:rounded-3xl sm:border sm:border-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#061428]/90 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-cyan sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {step === 1 ? (
          <form noValidate onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-6 sm:px-9 sm:pt-9">
              <StepHeader eyebrow="STEP 1 OF 2 · YOUR DETAILS">
                <h2 id={titleId} className="m-0 pr-10 text-2xl font-extrabold tracking-[-0.01em] text-white sm:text-[28px]" style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}>
                  Tell us about your business
                </h2>
                <p id={descId} className="mt-2 text-sm text-white/70">
                  Takes about a minute. It helps us come prepared.
                </p>
              </StepHeader>

              <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                <Field label="Full name" required htmlFor={`${fid}-full_name`}>
                  <input
                    {...fieldProps("full_name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Priya Sharma"
                    maxLength={120}
                    required
                    value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                  />
                  {fieldError("full_name")}
                </Field>
                <Field label="Work email" required htmlFor={`${fid}-work_email`}>
                  <input
                    {...fieldProps("work_email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="priya@company.com"
                    maxLength={254}
                    required
                    value={form.work_email}
                    onChange={(e) => set("work_email", e.target.value)}
                  />
                  {fieldError("work_email")}
                </Field>
                <Field label="Phone / WhatsApp" required htmlFor={`${fid}-phone`}>
                  <input
                    {...fieldProps("phone")}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    maxLength={20}
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                  {fieldError("phone")}
                </Field>
                <Field label="Company" required htmlFor={`${fid}-company`}>
                  <input
                    {...fieldProps("company")}
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    maxLength={160}
                    required
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                  {fieldError("company")}
                </Field>
                <Field label="Website" hint="Optional" htmlFor={`${fid}-website`}>
                  <input
                    {...fieldProps("website")}
                    type="text"
                    autoComplete="url"
                    inputMode="url"
                    placeholder="company.com"
                    maxLength={200}
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </Field>
                <Field label="Country" required htmlFor={`${fid}-country`}>
                  <select
                    {...fieldProps("country")}
                    required
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                  >
                    <option value="">Select country</option>
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {fieldError("country")}
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className={labelCls}>
                    What do you need help with? <span className="normal-case tracking-normal text-white/45">(optional)</span>
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((s) => {
                      const pressed = form.services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={pressed}
                          onClick={() => toggleService(s)}
                          className={`min-h-10 rounded-full border px-4 py-2 font-mono text-xs tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-cyan/60 ${
                            pressed
                              ? "border-tp-primary bg-tp-primary text-white"
                              : "border-white/20 text-white/80 hover:border-tp-cyan hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <Field label="Monthly marketing budget" required htmlFor={`${fid}-monthly_budget`}>
                  <select
                    {...fieldProps("monthly_budget")}
                    required
                    value={form.monthly_budget}
                    onChange={(e) => set("monthly_budget", e.target.value)}
                  >
                    <option value="">Select a range</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {fieldError("monthly_budget")}
                </Field>
                <Field label="When do you want to start?" htmlFor={`${fid}-start_timeline`}>
                  <select
                    {...fieldProps("start_timeline")}
                    value={form.start_timeline}
                    onChange={(e) => set("start_timeline", e.target.value)}
                  >
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="What is the one thing you want to fix?" hint="Optional" htmlFor={`${fid}-problem_statement`}>
                    <textarea
                      {...fieldProps("problem_statement")}
                      rows={3}
                      maxLength={PROBLEM_MAX}
                      placeholder="e.g. CAC is climbing on Meta and our site converts at 0.8%"
                      value={form.problem_statement}
                      onChange={(e) => set("problem_statement", e.target.value)}
                    />
                    <p className="mt-1 text-right font-mono text-[11px] text-white/45" aria-live="polite">
                      {form.problem_statement.length}/{PROBLEM_MAX}
                    </p>
                    {fieldError("problem_statement")}
                  </Field>
                </div>
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${fid}-hp`}>Leave this field empty</label>
                <input
                  id={`${fid}-hp`}
                  name="hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.hp}
                  onChange={(e) => set("hp", e.target.value)}
                />
              </div>

              {submitError ? (
                <div role="alert" className="mt-6 rounded-2xl border border-red-400/40 bg-red-500/10 p-4">
                  <p className="m-0 text-sm text-white">
                    {submitError} You can try again, or go straight to the calendar.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      type="button"
                      onClick={() => void submit()}
                      disabled={sending}
                      className="font-mono text-xs uppercase tracking-[0.14em] text-tp-cyan underline-offset-4 hover:underline disabled:opacity-50"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        trackCtaClick("book-skip-to-calendar");
                        setStep(2);
                      }}
                      className="font-mono text-xs uppercase tracking-[0.14em] text-white/80 underline underline-offset-4 hover:text-white"
                    >
                      Continue to calendar anyway →
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-end border-t border-white/10 px-5 py-4 sm:px-9">
              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="tp-btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {sending ? "SENDING…" : "NEXT: PICK A TIME"} {!sending ? <span aria-hidden>→</span> : null}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-6 sm:px-9 sm:pb-8 sm:pt-9">
            <StepHeader eyebrow="STEP 2 OF 2 · PICK A TIME">
              <h2
                id={titleId}
                ref={step2HeadingRef}
                tabIndex={-1}
                className="m-0 pr-10 text-2xl font-extrabold tracking-[-0.01em] text-white outline-none sm:text-[28px]"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
              >
                Pick a time that works
              </h2>
              <p id={descId} className="mt-2 text-sm text-white/70">
                Use the same email you entered so we can send your meeting details.
              </p>
            </StepHeader>

            {CALENDAR_EMBED_URL ? <CalendarEmbed src={CALENDAR_EMBED_URL} /> : null}

            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="book-calendar-new-tab"
              onClick={() => trackCtaClick("book-calendar-new-tab")}
              className="tp-btn-primary mt-6 w-full justify-center sm:w-auto sm:self-start"
            >
              OPEN CALENDAR <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 underline-offset-4 hover:text-white hover:underline"
              >
                ← Edit details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarEmbed({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative mt-5 min-h-[640px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
      {!loaded ? (
        <div role="status" className="absolute inset-0 flex items-center justify-center bg-[#061428]">
          <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-white/60">Loading calendar…</p>
        </div>
      ) : null}
      <iframe
        src={src}
        title="Pick a time on The Plugin's booking calendar"
        onLoad={() => setLoaded(true)}
        className="block min-h-[640px] w-full border-0"
      />
    </div>
  );
}

function StepHeader({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <header>
      <p className="tp-eyebrow m-0 mb-3">{eyebrow}</p>
      {children}
    </header>
  );
}

function Field({
  label,
  required,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
        {required ? (
          <span className="text-tp-cyan" aria-hidden>
            {" "}*
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
        {hint ? <span className="normal-case tracking-normal text-white/45"> ({hint.toLowerCase()})</span> : null}
      </label>
      {children}
    </div>
  );
}
