"use client";

import { SectionContainer } from "@/components/custom/section-container";

export default function JotformApplicationForm() {
  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <SectionContainer className="gap-8 px-0" sectionClassName="bg-white py-16">
        <h1 className="sr-only">Application Form</h1>
        <div className="h-[4400px] lg:h-[4000px]">
          <iframe
            src="https://form.jotform.com/251660299759068"
            frameBorder="0"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </SectionContainer>
    </div>
  );
}

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";

// export default function JotformApplicationForm() {
//   const offset = 10;
//   const defaultHeight = 1200;
//   const jotFormUrl = "https://form.jotform.com/251660299759068";

//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [height, setHeight] = useState(defaultHeight);
//   const offsetAdded = useRef(false);

//   const allowedOrigin = useMemo(() => {
//     try {
//       return new URL(jotFormUrl).origin;
//     } catch {
//       return null;
//     }
//   }, [jotFormUrl]);

//   useEffect(() => {
//     const handleMessage = (event: MessageEvent) => {
//       if (allowedOrigin && event.origin !== allowedOrigin) return;
//       if (event.data?.type !== "resize-iframe") return;

//       let newHeight = Number(event.data?.height || 0);
//       if (!Number.isFinite(newHeight) || newHeight <= 0) return;

//       if (!offsetAdded.current) {
//         newHeight += offset;
//         offsetAdded.current = true;
//       }

//       if (Math.abs(newHeight - height) > 10) {
//         setHeight(newHeight);
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [allowedOrigin, height, offset]);

//   return (
//     <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
//       <iframe
//         ref={iframeRef}
//         src={jotFormUrl}
//         style={{
//           width: "100%",
//           height: `${height}px`,
//           border: "none",
//           display: "block",
//         }}
//         scrolling="no"
//         loading="lazy"
//       />
//     </div>
//   );
// }
