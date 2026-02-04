"use client";

import { LandingDetailJson } from "@/server/serializers/custom-landing-serializer";
import { useEffect, useMemo, useRef, useState } from "react";

interface LandingDetailProps {
  data: LandingDetailJson;
}

export function LandingDetail({ data }: LandingDetailProps) {
  const offset = 10;
  const defaultHeight = 1200;
  const { url } = data;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const offsetAdded = useRef(false);

  const allowedOrigin = useMemo(() => {
    try {
      return new URL(url).origin;
    } catch {
      return null;
    }
  }, [url]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (allowedOrigin && event.origin !== allowedOrigin) return;
      if (event.data?.type !== "resize-iframe") return;

      let newHeight = Number(event.data?.height || 0);
      if (!Number.isFinite(newHeight) || newHeight <= 0) return;

      if (!offsetAdded.current) {
        newHeight += offset;
        offsetAdded.current = true;
      }

      if (Math.abs(newHeight - height) > 10) {
        setHeight(newHeight);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [allowedOrigin, height, offset]);

  return (
    <>
      {/* <div className="h-50 md:h-60"></div>
      <div className="relative flex flex-col overflow-x-hidden">
        <SectionContainer>
          <ASBTitle title={data.title} as="h1" />
          <div className="py-8 font-mono" dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(data?.content ?? "") }}></div>
        </SectionContainer>
      </div> */}
      {/* <div className="relative min-h-[1800px] w-full overflow-hidden">
        <iframe
          src={data.url}
          allowFullScreen
          loading="lazy"
          className="absolute top-0 left-0 h-full w-[calc(100%+32px)]"
        />
      </div> */}
      <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
        <iframe
          ref={iframeRef}
          src={url}
          style={{
            width: "100%",
            height: `${height}px`,
            border: "none",
            display: "block",
          }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    </>
  );
}
