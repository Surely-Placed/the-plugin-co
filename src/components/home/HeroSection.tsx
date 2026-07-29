import { motion } from "framer-motion";
import { visuals } from "../../lib/visuals";
import { sectionBlendClass } from "../../lib/section-gradients";
import { TextReveal } from "../effects/TextReveal";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { SiteImage } from "../ui/SiteImage";

export function HeroSection() {
  return (
    <section
      className={`min-h-screen bg-gradient-flow pt-24 md:pt-28 ${sectionBlendClass({ top: false, media: true })}`}
      data-gsap-skip
    >
      <div className="container-site relative grid min-h-[calc(100vh-6rem)] items-center gap-12 px-4 pb-20 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div className="hero-panel">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="label-xs mb-6"
          >
            The Plugin · Digital Solutions Agency
          </motion.p>

          <h1 className="heading-hero">
            <TextReveal as="span" className="block" splitBy="words" delay={0.15}>
              Plugin
            </TextReveal>
            <TextReveal as="span" className="block" splitBy="words" delay={0.35}>
              Amplify
            </TextReveal>
            <TextReveal as="span" className="block" splitBy="words" delay={0.55}>
              Grow
            </TextReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-8 font-mono text-sm uppercase tracking-wide text-white/85 md:text-base"
          >
            Your new growth systems are here
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-10"
          >
            <PrimaryCtaButton />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <SiteImage
            src={visuals.hero.image}
            alt="Digital marketing team reviewing growth analytics in a modern office"
            width={1200}
            height={900}
            priority
            className="relative z-10 w-full rounded-[2rem] border border-white/10 object-cover shadow-card"
          />
        </motion.div>
      </div>
    </section>
  );
}
