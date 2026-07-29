import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { balancedGridClass } from "../../lib/balanced-grid";

interface BalancedCardGridProps extends ComponentPropsWithoutRef<"div"> {
  itemCount: number;
  children: ReactNode;
  gapClass?: string;
}

export function BalancedCardGrid({
  itemCount,
  children,
  className = "",
  gapClass = "gap-6",
  ...rest
}: BalancedCardGridProps) {
  return (
    <div className={balancedGridClass(itemCount, className, gapClass)} {...rest}>
      {children}
    </div>
  );
}
