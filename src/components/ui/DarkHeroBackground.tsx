import { motion } from "framer-motion";

export function DarkHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-accent/30 to-dark" />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          style={{
            width: `${120 + i * 40}px`,
            height: `${80 + i * 20}px`,
            left: `${10 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div
        className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-accent-light/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-accent-highlight/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
    </div>
  );
}
