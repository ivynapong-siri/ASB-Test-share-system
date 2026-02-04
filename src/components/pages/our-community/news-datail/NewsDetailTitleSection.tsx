import { PatternStroke1, PatternStroke3 } from "@/components/shapes";
import { useEffect, useMemo, useRef, useState } from "react";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import ImageCard from "@/components/custom/cards/image-card";
import { SectionContainer } from "@/components/custom/section-container";
import { KnotIcon } from "@/components/icons";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { NewsJson } from "@/server/serializers/pages/news-serializer";

interface NewsDetailTitleSectionProps {
  data: NewsJson;
}

export default function NewsDetailTitleSection({ data }: NewsDetailTitleSectionProps) {
  const ARTICLE = "article";
  const offset = 10;
  const defaultHeight = 1800;
  const elementorLink = data.elementorLink;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const offsetAdded = useRef(false);

  const allowedOrigin = useMemo(() => {
    try {
      return new URL(elementorLink).origin;
    } catch {
      return null;
    }
  }, [elementorLink]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: only accept from the elementor page’s origin
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

  return (
    <SectionContainer
      sectionClassName="pt-52"
      vectorChildren={
        <>
          <PatternStroke3 className="absolute top-[930px] left-0 w-10 md:top-[900px] md:w-20" />
          <PatternStroke1 className="absolute top-[500px] -right-16 w-32 -rotate-12 md:top-[600px] md:-right-20 md:w-64" />
        </>
      }
    >
      <BreadcrumbCustom
        data={{
          breadcrumbs1: data.breadcrumbs1 && data.breadcrumbs1 != "" ? data.breadcrumbs1 : "Our Community",
          breadcrumbs2: data.breadcrumbs2 && data.breadcrumbs2 != "" ? data.breadcrumbs2 : "News",
          breadcrumbs3: data.breadcrumbs3 && data.breadcrumbs3 != "" ? data.breadcrumbs3 : "Detail",
        }}
      />
      <div className="flex w-full flex-col items-center pt-16">
        {data.ribbonText && data.ribbonText != "" && (
          <ASBRibbonText title={data.ribbonText} className="translate-x-8" />
        )}
        <ASBTitle title={data.title} as="h1" />
        {data.newsType.toLocaleLowerCase() === ARTICLE ? (
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
        ) : (
          <>
            <ImageCard
              image={data.image?.imageUrl ?? ""}
              alt={data.title || "News image"}
              className="my-24 aspect-[358/324] h-auto md:aspect-[982/547]"
              assetComponent={
                <>
                  <KnotIcon className="absolute top-0.5 right-12 z-20 h-6 w-6 translate-x-full -translate-y-full lg:top-0 lg:right-16 lg:h-10 lg:w-10" />
                  <span className="bg-secondary absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 font-mono text-white lg:left-11">
                    {data.date}
                  </span>
                  {data.subcategory && (
                    <span className="border-primary-300/25 text-secondary absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2 justify-center rounded-full border bg-white px-4 py-2 text-center font-mono font-medium lg:left-11 lg:translate-x-0">
                      {data.subcategory.toUpperCase()}
                    </span>
                  )}
                </>
              }
            />
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(data.description) }}
              className="font-mono text-base/[1.625rem] text-neutral-300"
            />
          </>
        )}
      </div>
    </SectionContainer>
  );
}
