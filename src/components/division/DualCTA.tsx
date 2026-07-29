import { Link } from "react-router-dom";
import { divisions } from "../../lib/divisions";

export function DualCTA({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <Link to={divisions.growth.routes.landing} className="btn-primary">
        Grow with The Plugin →
      </Link>
      <Link to={divisions.careers.routes.landing} className="btn-secondary">
        Get Hired with The Plugin →
      </Link>
    </div>
  );
}
