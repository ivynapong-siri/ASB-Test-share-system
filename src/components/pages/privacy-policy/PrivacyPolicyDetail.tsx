"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const PrivacyPolicyDetail = () => {
  const offset = 10;
  const defaultHeight = 1200;
  const policyUrl = "https://dcb9450325.nxcli.io/privacy-policy/";

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const offsetAdded = useRef(false);

  const allowedOrigin = useMemo(() => {
    try {
      return new URL(policyUrl).origin;
    } catch {
      return null;
    }
  }, [policyUrl]);

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
    <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe
        ref={iframeRef}
        src={policyUrl}
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
  );
};

export default PrivacyPolicyDetail;
