import { BrushIcon, KnotIcon, LightBulbIcon, PaletteIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface PerformingIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const PerformingIntroSection = ({ data, breadcrumbData }: PerformingIntroSectionProps) => {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? data.imageMobile?.imageUrl : data.image?.imageMediumLargeUrl) ||
    data.image?.imageUrl ||
    "/mock-image.jpg";
  return (
    <IntroSection
      imageSrc={imageUrl}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={data.title}
      description={data.description}
      ribbonText={data.ribbonText}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-10 -right-8 z-10 h-22 w-34 translate-x-1/3 md:top-5 md:h-30 md:w-42 lg:top-0 xl:-top-32 xl:-right-24 xl:h-60 xl:w-84" />
          <PatternStroke1 className="absolute top-auto -bottom-2 -left-18 z-10 h-19 w-42 rotate-35 sm:top-[660px] md:top-[480px] lg:top-[650px] xl:top-[800px] xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
        </>
      }
      topLeftIcon={<LightBulbIcon className="h-[27px] w-[28px] md:h-[35px] md:w-[34px] lg:h-[45px] lg:w-[44px]" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<PaletteIcon className="h-[22px] w-[31px] md:h-[25px] md:w-[24px] lg:h-[32px] lg:w-[50px]" />}
      bottomRightIcon={<BrushIcon className="h-[27px] w-[35px] md:h-[37px] md:w-[45px] lg:h-[47px] lg:w-[55px]" />}
      topLeftIconClassName="-left-5 top-0 lg:-left-10 xl:-left-16 lg:top-5"
      topRightIconClassName="-top-4 right-0 lg:top-7 xl:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-5 -left-4 lg:-bottom-10 lg:-left-6 "
      bottomRightIconClassName="-bottom-10 -right-8 lg:-bottom-4 lg:-right-6"
      showStandardVector={false}
    />
  );
};

export default PerformingIntroSection;
