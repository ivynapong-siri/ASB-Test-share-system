"use client";

import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FamilyIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const FamilyIntroSection = ({ data, breadcrumbData }: FamilyIntroSectionProps) => {
  return (
    <IntroSection
      imageSrc={data.image?.imageUrl || ""}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={data.title}
      description={data.description}
      ribbonText={data.ribbonText}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-10 right-1 z-10 h-22 w-34 translate-x-1/3 -rotate-180 md:top-5 md:h-30 md:w-42 lg:top-0 xl:-top-32 xl:right-8 xl:h-60 xl:w-84" />
          <PatternStroke1 className="absolute bottom-16 -left-12 z-10 h-19 w-42 rotate-12 max-sm:translate-y-full md:top-[590px] md:rotate-35 lg:rotate-30 xl:top-[590px] xl:-left-18 xl:h-38 xl:w-84" />
        </>
      }
      topLeftIcon={<LightBulbIcon className="h-[32px] w-[24px] md:h-[35px] md:w-[34px] lg:h-[45px] lg:w-[44px]" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<BookIcon className="h-[24px] w-[41px] md:h-[25px] md:w-[24px] lg:h-[32px] lg:w-[50px]" />}
      bottomRightIcon={<MagnifyIcon className="h-[20px] w-[18px] md:h-[37px] md:w-[45px] lg:h-[47px] lg:w-[55px]" />}
      topLeftIconClassName="-left-5 top-6 lg:-left-10 xl:-left-16 lg:top-5"
      topRightIconClassName="-top-4 right-0 lg:top-4 xl:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-5 -left-6 lg:-bottom-10 lg:-left-6 "
      bottomRightIconClassName="-bottom-5 -right-4 lg:-bottom-4 lg:-right-6"
      showStandardVector={false}
    />
  );
};

export default FamilyIntroSection;
