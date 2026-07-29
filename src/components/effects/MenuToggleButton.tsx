import { Menu, X } from "lucide-react";
import { useMenuLabelAnimation } from "./useMenuLabelAnimation";
import "./StaggeredMenu.css";

interface MenuToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  compact?: boolean;
  theme?: "dark" | "light";
}

export function MenuToggleButton({
  isOpen,
  onToggle,
  className = "",
  compact = false,
  theme = "dark",
}: MenuToggleButtonProps) {
  const { menuLabelRef, closeLabelRef } = useMenuLabelAnimation(isOpen, !compact);
  const iconSize = compact ? 20 : 26;

  return (
    <button
      type="button"
      className={`menu-toggle ${compact ? "menu-toggle--compact" : "menu-toggle--inline"} ${theme === "light" ? "menu-toggle--light" : ""} ${isOpen ? "is-open" : ""} ${className}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className="menu-toggle-icon" aria-hidden>
        {isOpen ? <X size={iconSize} strokeWidth={1.75} /> : <Menu size={iconSize} strokeWidth={1.75} />}
      </span>
      {!compact && (
        <span className="menu-toggle-label">
          <span ref={menuLabelRef}>Menu</span>
          <span ref={closeLabelRef} style={{ top: "100%" }}>
            Close
          </span>
        </span>
      )}
    </button>
  );
}
