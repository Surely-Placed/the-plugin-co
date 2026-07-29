import { motion } from "framer-motion";

import { parentHome } from "../lib/home";

import { PageSEO } from "../components/seo/PageSEO";

import { RubiksCubeHero } from "../components/effects/rubiks-cube/RubiksCubeHero";

import { RevealSection } from "../components/sections/RevealSection";

import { DivisionCard } from "../components/division/DivisionCard";

import { DualCTA } from "../components/division/DualCTA";

import { StatsBar } from "../components/division/StatsBar";

import { TestimonialList } from "../components/division/TestimonialList";

import { staticPageSEO } from "../lib/seo";



export function HomePage() {

  const seo = staticPageSEO["/"];



  return (

    <>

      <PageSEO {...seo} path="/" />

      <section
        className="relative overflow-x-hidden bg-gradient-flow pt-24 md:pt-28 lg:min-h-screen"
        data-gsap-skip
      >

        <div className="container-site relative z-10 section-padding pb-12 pt-8 lg:pb-20 lg:pointer-events-none">

          <div className="hero-text-block relative z-10 lg:pointer-events-auto">

              <motion.p

                initial={{ opacity: 0, x: -20 }}

                animate={{ opacity: 1, x: 0 }}

                className="label-xs mb-6"

              >

                {parentHome.hero.eyebrow}

              </motion.p>



              <h1 className="heading-hero max-w-full">

                {parentHome.hero.title.map((line) => (

                  <span key={line} className="block">

                    {line}

                  </span>

                ))}

              </h1>



              <motion.p

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ delay: 0.35 }}

                className="mt-8 max-w-2xl font-mono text-sm uppercase tracking-wide text-white/85 md:text-base"

              >

                {parentHome.hero.subtitle}

              </motion.p>



              <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ delay: 0.5 }}

              >

                <DualCTA className="mt-10" />

              </motion.div>



              <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ delay: 0.65 }}

                className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wide text-white/70 md:text-xs"

              >

                {parentHome.hero.trustBar.map((item) => (

                  <span key={item}>{item}</span>

                ))}

              </motion.div>

          </div>

        </div>



        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-cube-layer"
        >
          <RubiksCubeHero />
        </motion.div>

      </section>



      <RevealSection className="bg-gradient-home-main section-padding pb-20 pt-12 md:pb-28 md:pt-16 lg:pb-32 lg:pt-20">

        <div className="container-site">

          <h2 className="heading-section-lg home-division-title mb-10 text-center" data-reveal="clip">

            {parentHome.divisionSection.title}

          </h2>

          <div className="card-grid grid gap-8 lg:grid-cols-2">

            {parentHome.divisionCards.map((card) => (

              <DivisionCard key={card.division} {...card} />

            ))}

          </div>

        </div>



        <div className="container-site mt-24 border-t border-white/10 pt-24">

          <h2 className="heading-section-lg text-center" data-reveal="clip">

            Trusted on both sides

          </h2>

          <StatsBar stats={parentHome.stats} className="mt-12" />

        </div>



        <div className="mt-24 border-t border-white/10 pt-24">

          <TestimonialList

            embedded

            title={parentHome.testimonialsTitle}

            testimonials={parentHome.testimonials}

          />

        </div>

      </RevealSection>



      <RevealSection className="section-padding bg-gradient-cta">

        <div className="container-site text-center">

          <h2 className="heading-section-lg" data-reveal="clip">

            {parentHome.ctaBanner.title}

          </h2>

          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-white/75 md:text-base">

            {parentHome.ctaBanner.subtitle}

          </p>

          <DualCTA className="mt-10 justify-center" />

        </div>

      </RevealSection>

    </>

  );

}


