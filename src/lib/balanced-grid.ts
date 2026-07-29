/**
 * Tailwind column classes that avoid orphan rows (e.g. 4 items in a 3-col grid).
 */
export function balancedGridClass(
  itemCount: number,
  extraClass = "",
  gapClass = "gap-6"
): string {
  return ["card-grid grid items-stretch", gapClass, resolveCols(itemCount), extraClass]
    .filter(Boolean)
    .join(" ");
}

function resolveCols(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
  if (count === 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
  if (count % 6 === 0) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
  if (count % 5 === 0) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
  if (count % 4 === 0) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count % 3 === 0) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  if (count % 3 === 1) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count % 2 === 0) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}
