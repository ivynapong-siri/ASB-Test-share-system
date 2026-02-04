import { BrushIcon, GlobeIcon, GraduateHatIcon, KnotIcon } from "@/components/icons";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import PictureFrame from "@/components/custom/picture-frame";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke1 } from "@/components/shapes";
import { SectionJson } from "@/server/serializers/section-serializer";

interface VisionAndMissionOurFoundationSectionProps {
  data: SectionJson;
}

const VisionAndMissionOurFoundationSection = ({ data }: VisionAndMissionOurFoundationSectionProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-primary"
      vectorChildren={
        <PatternStroke1
          className="absolute bottom-0 -left-44 h-[148px] w-[330px] rotate-15 lg:bottom-8 lg:-left-6 xl:bottom-18 xl:rotate-0 2xl:bottom-14"
          color="white"
        />
      }
      className="flex flex-col gap-16 px-10 pt-10 pb-32 md:gap-20 lg:flex-row lg:py-36 2xl:gap-40"
    >
      <div className="z-1 flex flex-1/2 justify-center">
        {data.image && data.image.imageUrl && (
          <PictureFrame
            containerClassName="w-[360px] h-[370px] xl:w-[590px] xl:h-[595px] rotate-y-180"
            imageClassName="w-[300px] h-[320px] xl:w-[480px] xl:h-[536px] "
            borderClassName="w-[260px] h-[300px] xl:w-[480px] xl:h-[536px]"
            imageSrc={data.image?.imageUrl || ""}
            topLeftIcon={<GlobeIcon className="h-8 w-8 xl:h-16 xl:w-12" color="white" />}
            topRightIcon={<KnotIcon className="h-8 w-8 xl:h-10 xl:w-9" />}
            bottomLeftIcon={<GraduateHatIcon className="h-10 w-14 xl:h-13 xl:w-21" />}
            bottomRightIcon={<BrushIcon className="h-10 w-10 xl:h-19 xl:w-17" />}
            topLeftIconClassName="-left-2 top-0 xl:-left-4 xl:top-12 rotate-y-180"
            topRightIconClassName="sm:right-12 top-4 right-0 sm:top-4 md:right-2 md:top-6 xl:right-16 "
            bottomLeftIconClassName="-bottom-2 -left-4 xl:-bottom-4 xl:-left-4 rotate-y-180"
            bottomRightIconClassName="-bottom-2 right-0 xl:-bottom-4 xl:right-0 rotate-y-180"
          />
        )}
      </div>
      <div className="flex grow flex-col justify-center text-white xl:max-w-[550px]">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <ASBTitle title={data.title ?? ""} className="text-start text-white" />
        <p className="pt-8 font-mono text-base/[1.625rem]">{data.description}</p>
      </div>
    </SectionContainer>
  );
};

export default VisionAndMissionOurFoundationSection;
