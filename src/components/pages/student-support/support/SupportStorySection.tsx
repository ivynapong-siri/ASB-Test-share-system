import { HighlightPen, KnotIcon, MagnifyIcon, ProtractorIcon } from "@/components/icons";

import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SupportStorySectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const SupportStorySection = ({ data, breadcrumbData }: SupportStorySectionProps) => {
  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl ?? ""}
      showStandardVector={false}
      vectorChildren={
        <PatternStroke1 className="absolute -top-[20px] -right-18 z-10 h-[120px] w-[150px] rotate-180 lg:-top-[50px] lg:-right-22 lg:h-[150px] lg:w-[340px]" />
      }
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      topLeftIconClassName="-left-8 top-3 md:-left-10 xl:-left-20 transform scale-x-[-1]"
      topRightIconClassName="-top-1 right-4 md:-top-3 lg:-top-4 xl:-top-2 xl:right-2"
      bottomLeftIconClassName="-left-8 -bottom-4 md:-left-10 md:-bottom-5 lg:-bottom-10 lg:-left-15  transform scale-x-[-1]"
      bottomRightIconClassName="-right-9 bottom-0 md:-right-10 md:-bottom-5 lg:-right-15 transform scale-x-[-1]"
      topLeftIcon={
        <MagnifyIcon className="h-[32px] w-[23px] md:h-[48px] md:w-[35px] lg:h-[54px] lg:w-[36px] xl:h-[64px] xl:w-[46px]" />
      }
      topRightIcon={<KnotIcon className="h-[19px] w-[18px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={
        <HighlightPen className="h-[22px] w-[37px] rotate-y-180 md:h-[33px] md:w-[56px] lg:h-[44px] lg:w-[74px]" />
      }
      bottomRightIcon={
        <ProtractorIcon className="h-[35px] w-[27px] rotate-y-180 md:h-[53px] md:w-[41px] lg:h-[50px] lg:w-[54px]" />
      }
    />
  );
};

export default SupportStorySection;
