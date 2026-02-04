"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface NewsDetailIframeProps {
  elementorLink: string | null;
}

/**
 * Client Component for dynamic iframe height
 * Separated from server component to enable interactive features
 */
export function NewsDetailIframe({ elementorLink }: NewsDetailIframeProps) {
  const offset = 10;
  const defaultHeight = 1800;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const offsetAdded = useRef(false);

  const allowedOrigin = useMemo(() => {
    if (!elementorLink) return null;
    try {
      return new URL(elementorLink).origin;
    } catch {
      return null;
    }
  }, [elementorLink]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: only accept from the elementor page's origin
      if (allowedOrigin && event.origin !== allowedOrigin) return;
      if (event.data?.type !== "resize-iframe") return;

      let newHeight = Number(event.data?.height || 0);
      if (!Number.isFinite(newHeight) || newHeight <= 0) return;

      // optional one-time padding
      if (!offsetAdded.current) {
        newHeight += offset;
        offsetAdded.current = true;
      }

      // ignore tiny jitters
      if (Math.abs(newHeight - heightRef.current) < 8) return;

      // clamp and set
      const clamped = Math.min(Math.max(newHeight, 300), 20000);
      heightRef.current = clamped;
      setHeight(clamped);
    };

    const heightRef = { current: defaultHeight };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [allowedOrigin, offset]);

  if (!elementorLink) {
    return <div className="my-10 text-center text-gray-500">Content not available</div>;
  }

  return (
    <div className="relative mt-10 w-full overflow-hidden" style={{ minHeight: `${height}px` }}>
      <iframe
        ref={iframeRef}
        src={elementorLink}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          display: "block",
          overflow: "hidden",
        }}
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}
