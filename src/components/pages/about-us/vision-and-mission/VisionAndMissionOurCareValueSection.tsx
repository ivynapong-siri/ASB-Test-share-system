import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BlogCardWithIndex from "@/components/custom/cards/blog-card-with-index";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface VisionAndMissionOurCareValueSectionProps {
  data: SectionJson;
}

const VisionAndMissionOurCareValueSection = ({ data }: VisionAndMissionOurCareValueSectionProps) => {
  return (
    <SectionContainer
      vectorChildren={
        <>
          <PatternStroke2 className="absolute bottom-1/24 -left-16 h-[265px] w-[360px]" />
          <PatternStroke1 className="absolute top-1/3 -right-12 h-[148px] w-[330px]" />
        </>
      }
    >
      <div className="z-1 items-center">
        <div className="flex flex-col justify-center md:items-center">
          <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8 max-md:translate-x-4" />
          <ASBTitle title={data.title ?? ""} />
        </div>
        <div className="grid grid-cols-1 items-stretch gap-4 pt-16 lg:grid-cols-2 lg:pt-32 xl:grid-cols-4">
          <RenderCareCard data={data.cards ?? []} />
        </div>
      </div>
    </SectionContainer>
  );
};

const RenderCareCard = ({ data }: { data: SectionCardJson[] }) => {
  return data.map((e, index) => {
    const shortTitle = e?.title?.[0] ?? "-";

    return (
      <BlogCardWithIndex
        key={index}
        index={index}
        title={e.title}
        content={e.description}
        shortTitle={shortTitle}
        badgeClassName="-translate-x-1/10 bg-primary"
        contentBackgroundClassName="bg-primary-gray px-5 py-7 rounded-2xl h-full w-full justify-between"
        className="h-auto w-full"
        isImageOnTop={true}
      />
    );
  });
};

export default VisionAndMissionOurCareValueSection;
