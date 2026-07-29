import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryCtaButton } from "../ui/PrimaryCtaButton";

export function StickyConsultationButton() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isContact = location.pathname === "/contact";

  useEffect(() => {
    if (isContact) return;

    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isContact, location.pathname]);

  if (isContact) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0"
        >
          <PrimaryCtaButton
            compact
            className="shadow-glass-lg"
            aria-label="Book a free consultation"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
