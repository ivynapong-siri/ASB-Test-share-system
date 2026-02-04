import { PatternStroke1, PatternStroke3 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import ImageCard from "@/components/custom/cards/image-card";
import { SectionContainer } from "@/components/custom/section-container";
import { KnotIcon } from "@/components/icons";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { NewsJson } from "@/server/serializers/pages/news-serializer";

interface AllDetailTitleSectionProps {
  data: NewsJson;
}

const AllDetailTitleSection = ({ data }: AllDetailTitleSectionProps) => {
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
          breadcrumbs1: data.breadcrumbs1 && data.breadcrumbs1 != "" ? data.breadcrumbs1 : "News & update",
          breadcrumbs2: data.breadcrumbs2 && data.breadcrumbs2 != "" ? data.breadcrumbs2 : "Detail",
        }}
      />
      <div className="flex w-full flex-col items-center pt-16">
        {data.ribbonText && data.ribbonText != "" && (
          <ASBRibbonText title={data.ribbonText} className="translate-x-8" />
        )}
        <ASBTitle title={data.title} as="h1" />
        <ImageCard
          image={data.image?.imageUrl ?? ""}
          alt={data.title || "Co-curricular activity image"}
          className="my-24 aspect-[358/324] h-auto md:aspect-[982/547]"
          assetComponent={
            <>
              <KnotIcon className="absolute top-0 right-16 z-20 h-10 w-10 translate-x-full -translate-y-full" />
              <span className="bg-secondary absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 font-mono text-white lg:left-11">
                {data.date}
              </span>
              {data.badge && (
                <span className="border-primary-300/25 text-secondary absolute bottom-0 left-11 z-20 translate-y-1/2 rounded-full border bg-white px-4 py-2 font-mono font-medium">
                  {data.badge?.toUpperCase()}
                </span>
              )}
            </>
          }
        />
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(data.description) }}
          className="dangerous-content font-mono text-base/[1.625rem] text-neutral-300 max-sm:max-w-[calc(100vw-40px)]"
        />
      </div>
    </SectionContainer>
  );
};

export default AllDetailTitleSection;
