/** WebP sibling for raster assets under /media/ (original JPG/PNG kept as fallback). */
export function webpSrc(src: string): string | undefined {
  if (!/^\/media\/.+\.(jpe?g|png)$/i.test(src)) return undefined;
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
}
