import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalMotion } from "../effects/GlobalMotion";
import { TpFooter } from "../design/TpFooter";

export function SiteLayout() {
  const location = useLocation();

  return (
    <GlobalMotion>
      <main id="main">
        <div className="h-24 shrink-0" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="tp-page overflow-x-clip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <TpFooter />
      </main>
    </GlobalMotion>
  );
}
