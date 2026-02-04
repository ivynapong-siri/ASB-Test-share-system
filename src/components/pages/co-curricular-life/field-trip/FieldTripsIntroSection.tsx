import { CalendarIcon, GlobeIcon, KnotIcon, SchoolBusIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FieldTripsIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const FieldTripsIntroSection = ({ data, breadcrumbData }: FieldTripsIntroSectionProps) => {
  return (
    <IntroSection
      imageSrc={data.image?.imageUrl || ""}
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={data.description}
      ribbonText={data.ribbonText}
      className="pb-4"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-10 right-1 z-10 h-22 w-34 translate-x-1/3 -rotate-180 md:top-5 md:h-30 md:w-42 lg:top-0 xl:-top-32 xl:-right-8 xl:h-60 xl:w-84" />
          <PatternStroke1 className="absolute top-auto -bottom-18 -left-18 z-10 h-19 w-42 rotate-35 sm:top-[660px] md:top-[440px] xl:top-[800px] xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
        </>
      }
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      topLeftIcon={<CalendarIcon className="h-9 w-7 lg:h-[80px] lg:w-[58px]" />}
      topRightIcon={<KnotIcon className="h-[27px] w-[28px] md:h-[30px] md:w-[29px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<SchoolBusIcon className="h-[40px] w-[50px] md:h-[30px] md:w-[29px] lg:h-[56px] lg:w-[98px]" />}
      bottomRightIcon={<GlobeIcon className="h-[27px] w-[28px] md:h-[30px] md:w-[25px] lg:h-[50px] lg:w-[49px]" />}
      topLeftIconClassName="-left-4 -top-4 sm:-left-10 sm:top-3 xl:-top-16 xl:-left-4 transform scale-x-[-1] lg:rotate-0"
      topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-5 -left-8 lg:-bottom-13 xl:-bottom-6 lg:-left-10 xl:-left-20 rotate-y-180"
      bottomRightIconClassName="-bottom-10 right-0 lg:-bottom-4 lg:-right-15 -rotate-20 scale-x-[-1]"
      showStandardVector={false}
    />
  );
};

export default FieldTripsIntroSection;
