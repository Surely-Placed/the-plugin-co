import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, XCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastInput {
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastItem extends ToastInput {
  id: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const styles = {
  success: "border-accent/40 from-accent/15 to-black/80",
  error: "border-red-500/40 from-red-500/10 to-black/80",
  info: "border-white/20 from-white/10 to-black/80",
};

const iconStyles = {
  success: "text-accent",
  error: "text-red-400",
  info: "text-flow-light",
};

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const Icon = icons[item.type];

  return (
    <motion.div
      layout
      role="status"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-auto flex w-[min(100vw-2rem,380px)] gap-3 rounded-2xl border bg-gradient-to-br p-4 shadow-glass-lg backdrop-blur-xl ${styles[item.type]}`}
    >
      <Icon className={`mt-0.5 shrink-0 ${iconStyles[item.type]}`} size={20} strokeWidth={2} />
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold text-white">{item.title}</p>
        {item.message && (
          <p className="mt-1 font-mono text-xs leading-relaxed text-white/75">
            {item.message}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="touch-target -mr-1 -mt-1 inline-flex shrink-0 items-center justify-center rounded-full p-1 text-white/50 transition-colors hover:text-white"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "info", title, message, duration = 5000 }: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now() + Math.random());

      setToasts((current) => [...current, { id, type, title, message, duration }]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed bottom-5 right-5 z-[200] flex flex-col gap-3 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => (
            <ToastCard key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
