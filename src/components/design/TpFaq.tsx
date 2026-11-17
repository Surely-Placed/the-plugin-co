export interface FaqItem {
  question: string;
  answer: string;
}

export function TpFaq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="tp-section border-t border-tp-border-subtle">
      <div className="tp-container">
        <p className="tp-eyebrow mb-4">FAQ</p>
        <h2 className="tp-heading-section mb-8 text-balance">{title}</h2>
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <details key={item.question} className="tp-faq-item group">
              <summary className="tp-faq-summary">
                <h3 className="m-0 text-[17px] font-bold leading-snug">{item.question}</h3>
                <span aria-hidden className="tp-faq-plus">
                  +
                </span>
              </summary>
              <p className="tp-faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}