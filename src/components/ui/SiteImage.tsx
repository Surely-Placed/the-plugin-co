import { forwardRef, useEffect, useState, type ImgHTMLAttributes } from "react";
import { webpSrc } from "../../lib/media-url";

type SiteImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Above-the-fold hero images should set eager loading. */
  priority?: boolean;
};

function resolveSrc(src: ImgHTMLAttributes<HTMLImageElement>["src"]) {
  if (typeof src !== "string") return src;
  return webpSrc(src) ?? src;
}

export const SiteImage = forwardRef<HTMLImageElement, SiteImageProps>(
  function SiteImage(
    {
      priority = false,
      loading,
      decoding = "async",
      width,
      height,
      alt,
      src,
      onError,
      ...props
    },
    ref
  ) {
    const originalSrc = typeof src === "string" ? src : undefined;
    const [activeSrc, setActiveSrc] = useState(() => resolveSrc(src));

    useEffect(() => {
      setActiveSrc(resolveSrc(src));
    }, [src]);

    return (
      <img
        ref={ref}
        src={activeSrc}
        alt={alt ?? ""}
        width={width}
        height={height}
        loading={loading ?? (priority ? "eager" : "lazy")}
        decoding={decoding}
        fetchPriority={priority ? "high" : undefined}
        onError={(event) => {
          if (originalSrc && activeSrc !== originalSrc) {
            setActiveSrc(originalSrc);
          }
          onError?.(event);
        }}
        {...props}
      />
    );
  }
);
