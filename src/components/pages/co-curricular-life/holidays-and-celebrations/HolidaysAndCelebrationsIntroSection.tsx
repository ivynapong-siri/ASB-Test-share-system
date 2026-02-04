import { CalendarIcon, ClockIcon, KnotIcon, LightBulbIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface HolidaysAndCelebrationsIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const HolidaysAndCelebrationsIntroSection = ({ data, breadcrumbData }: HolidaysAndCelebrationsIntroSectionProps) => {
  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      textClassName="justify-center max-w-[600px]"
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl || ""}
      showStandardVector={false}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-10 right-1 z-10 h-33 w-45 translate-x-1/3 -rotate-180 md:top-5 lg:top-0 xl:-top-32 xl:-right-8 xl:h-66 xl:w-90" />
          <PatternStroke1 className="absolute top-auto -bottom-2 -left-18 z-10 h-19 w-42 rotate-35 sm:top-[660px] md:top-[580px] xl:top-[800px] xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
        </>
      }
      ribbonClassName="max-md:max-w-2/3"
      containerClassName="sm:h-92 sm:w-88 xl:h-[596px] xl:w-[592px] transform scale-x-[-1]"
      topLeftIconClassName="-left-4 -top-4 sm:left-8 sm:top-3 md:left-0 lg:-left-3 xl:-left-1 transform scale-x-[-1] lg:-top-4 2xl:left-4"
      topRightIconClassName="right-3 -top-2 sm:right-14 sm:top-7 md:top-2 md:right-8 lg:top-0 lg:right-8 xl:top-4 2xl:top-6 2xl:right-10"
      bottomLeftIconClassName="-left-4 -bottom-4 sm:left-6 sm:bottom-4 lg:-bottom-2 lg:left-0 transform scale-x-[-1]"
      bottomRightIconClassName="-right-4 -bottom-4 sm:right-8 sm:bottom-5 md:right-7 md:bottom-2 lg:-right-2 transform scale-x-[-1]"
      topLeftIcon={<CalendarIcon className="h-9 w-7 lg:h-[76px] lg:w-[64px]" />}
      topRightIcon={<KnotIcon className="h-5 w-5 lg:h-8 lg:w-8" />}
      bottomLeftIcon={<ClockIcon className="h-8 w-8 lg:h-15 lg:w-15" />}
      bottomRightIcon={<LightBulbIcon className="h-8 w-6 lg:h-15 lg:w-11" />}
    />
  );
};

export default HolidaysAndCelebrationsIntroSection;
