import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { GlobalMotion } from "../effects/GlobalMotion";
import { Footer } from "./Footer";

export function SiteLayout() {
  const location = useLocation();

  return (
    <GlobalMotion>
      <main id="main" className="text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="overflow-x-clip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </main>
    </GlobalMotion>
  );
}
