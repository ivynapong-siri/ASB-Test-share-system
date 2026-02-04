import { AlarmClockIcon, KnotIcon, MagnifyIcon, StickyNoteIcon } from "@/components/icons";

import { PatternStroke2 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface UniversityPreparationIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const UniversityPreparationIntroSection = ({ data, breadcrumbData }: UniversityPreparationIntroSectionProps) => {
  return (
    <IntroSection
      breadcrumbClickable={true}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={data.title}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl ?? ""}
      description={data.description}
      showStandardVector={false}
      textClassName="justify-center"
      imageClassName="rotate-y-180 object-cover scale-125 w-full h-full lg:scale-100 "
      imageContainerClassName="overflow-hidden rounded-[50px]"
      containerClassName="rotate-y-180"
      topLeftIcon={<StickyNoteIcon className="h-[22px] w-[22px] rotate-y-180 lg:h-16 lg:w-12" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<AlarmClockIcon className="h-[32px] w-[28px] -rotate-12 lg:h-10 lg:w-10" />}
      bottomRightIcon={<MagnifyIcon className="h-[20px] w-[20px] md:h-[37px] md:w-[45px] lg:h-[47px] lg:w-[55px]" />}
      topLeftIconClassName="-left-4 top-0 lg:-left-10 xl:-left-18 lg:top-0"
      topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-4 -left-2 lg:-bottom-10 lg:left-0 xl:-left-20"
      bottomRightIconClassName="-bottom-3 -right-4 lg:-bottom-4 lg:-right-6"
      vectorChildren={
        <PatternStroke2
          className="absolute top-14 -right-14 z-20 h-[132px] w-[180px] rotate-180 lg:-top-24 lg:-right-28 lg:h-[265px] lg:w-[361px]"
          color="#B81E29"
        />
      }
    />
  );
};

export default UniversityPreparationIntroSection;
