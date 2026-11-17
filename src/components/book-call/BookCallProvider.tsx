import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { captureUtm } from "../../lib/book-call";
import { BookCallModal } from "./BookCallModal";

interface BookCallContextValue {
  openBookCall: () => void;
  closeBookCall: () => void;
  isOpen: boolean;
}

const BookCallContext = createContext<BookCallContextValue | null>(null);

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    captureUtm(search);
  }, [search]);

  const openBookCall = useCallback(() => setIsOpen(true), []);
  const closeBookCall = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openBookCall, closeBookCall, isOpen }),
    [openBookCall, closeBookCall, isOpen]
  );

  return (
    <BookCallContext.Provider value={value}>
      {children}
      <BookCallModal open={isOpen} onClose={closeBookCall} />
    </BookCallContext.Provider>
  );
}

export function useBookCall() {
  const ctx = useContext(BookCallContext);
  if (!ctx) throw new Error("useBookCall must be used within BookCallProvider");
  return ctx;
}
