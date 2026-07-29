import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";
import { Logo } from "./Logo";

export function AppHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5 md:px-6 pointer-events-none">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "liquid-glass shadow-glass-lg" : "bg-transparent"
        }`}
      >
        <Logo iconClassName="h-auto max-h-10 w-auto max-w-[220px] object-contain md:max-h-11 md:max-w-[260px]" />

        <PrimaryCtaButton compact className="hidden sm:inline-flex" />
      </motion.div>
    </header>
  );
}
