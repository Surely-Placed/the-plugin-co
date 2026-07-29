import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { PageSEO } from "../components/seo/PageSEO";
import { PageHero } from "../components/sections/PageHero";
import { GsapReveal } from "../components/effects/GsapReveal";
import { RevealSection } from "../components/sections/RevealSection";
import { DualCTA } from "../components/division/DualCTA";
import { fetchOrder } from "../lib/payments";
import { divisions } from "../lib/divisions";
import { sectionGradientClass } from "../lib/section-gradients";

type ResultKind = "success" | "failure";

interface PaymentResultPageProps {
  kind: ResultKind;
}

export function PaymentResultPage({ kind }: PaymentResultPageProps) {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  const [order, setOrder] = useState<Awaited<ReturnType<typeof fetchOrder>>>(null);

  useEffect(() => {
    if (!orderId) return;
    fetchOrder(orderId).then(setOrder);
  }, [orderId]);

  const success = kind === "success";
  const divisionRoute =
    order?.division === "careers"
      ? divisions.careers.routes.landing
      : divisions.growth.routes.landing;

  return (
    <>
      <PageSEO
        title={success ? "Payment successful | The Plugin" : "Payment failed | The Plugin"}
        description={
          success
            ? "Your payment was received. We'll be in touch shortly."
            : "Your payment was not completed. You can try again or book a free call."
        }
        path={success ? "/payment/success" : "/payment/failure"}
      />

      <PageHero page="contact" className="pb-16 md:pb-20">
        <GsapReveal immediate effect="clip">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            {success ? (
              <CheckCircle2 className="h-16 w-16 text-flow-light md:h-20 md:w-20" strokeWidth={1.5} />
            ) : (
              <XCircle className="h-16 w-16 text-red-400 md:h-20 md:w-20" strokeWidth={1.5} />
            )}
            <h1 className="heading-section mt-8 text-white">
              {success ? "Payment successful" : "Payment not completed"}
            </h1>
            <p className="mt-4 max-w-lg font-mono text-base text-white/80 md:text-lg">
              {success
                ? "Thank you. Your payment is confirmed and our team will follow up soon."
                : "No charge was made. You can retry checkout or book a free consultation instead."}
            </p>
          </div>
        </GsapReveal>
      </PageHero>

      <RevealSection className={`section-padding pt-0 ${sectionGradientClass("rise")}`}>
        <div className="container-site mx-auto max-w-xl">
          <article className="flow-card card-stack p-8 text-center" data-reveal="scale">
            {order && (
              <>
                <p className="label-xs text-flow-light">Order details</p>
                <p className="heading-card-md mt-3">{order.plan_name}</p>
                <p className="mt-2 font-mono text-sm text-white/70">
                  {(order.amount_minor / 100).toLocaleString("en-GB", {
                    style: "currency",
                    currency: order.currency,
                  })}{" "}
                  · {order.status}
                </p>
              </>
            )}
            <div className="card-stack__footer mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to={divisionRoute} className="btn-primary">
                {success ? "Back to division" : "Try again"}
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact us
              </Link>
            </div>
          </article>

          <div className="mt-16 text-center">
            <DualCTA className="justify-center" />
          </div>
        </div>
      </RevealSection>
    </>
  );
}
