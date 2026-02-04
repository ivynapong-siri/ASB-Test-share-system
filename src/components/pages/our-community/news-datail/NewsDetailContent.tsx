import { PatternStroke1, PatternStroke3 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import ImageCard from "@/components/custom/cards/image-card";
import { SectionContainer } from "@/components/custom/section-container";
import { KnotIcon } from "@/components/icons";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { NewsJson } from "@/server/serializers/pages/news-serializer";
import { NewsDetailIframe } from "./NewsDetailIframe";

interface NewsDetailContentProps {
  data: NewsJson;
}

/**
 * Server Component for News Detail Content
 * This ensures the content is rendered on the server for SEO
 */
export default function NewsDetailContent({ data }: NewsDetailContentProps) {
  const ARTICLE = "article";
  const elementorLink = data.elementorLink;

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
          <NewsDetailIframe elementorLink={elementorLink} />
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
            {/* SEO-friendly: Server-rendered HTML content */}
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
