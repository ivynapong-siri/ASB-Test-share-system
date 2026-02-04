import { BluePrintIcon, KnotIcon, MouseIcon, TargetIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface WorkWithUsIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function WorkWithUsIntroSection({ data, breadcrumbData }: WorkWithUsIntroSectionProps) {
  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl || ""}
      textClassName="justify-center lg:max-w-[546px] whitespace-pre-wrap"
      showStandardVector={false}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-0 right-6 z-10 h-33 w-45 translate-x-3/4 md:right-5 xl:-top-40 xl:right-9 xl:h-66 xl:w-90" />
          <PatternStroke1 className="absolute -left-18 z-10 h-19 w-42 rotate-35 max-md:hidden md:bottom-0 xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
        </>
      }
      containerClassName="sm:h-92 sm:w-88 xl:h-[596px] xl:w-[592px] "
      topLeftIconClassName="-left-4 -top-3 sm:left-3 sm:top-6 lg:left-0 lg:top-0 "
      topRightIconClassName="right-0 -top-3.5 sm:right-8 sm:top-2 md:right-8 md:top-1 lg:top-0 xl:top-4"
      bottomLeftIconClassName="-left-6 -bottom-6 sm:-left-2 sm:bottom-4 md:left-2 md:bottom-4 lg:bottom-0 lg:-left-4"
      bottomRightIconClassName="-right-4 -bottom-4 sm:right-4 sm:bottom-0 md:right-7 md:-bottom-4 lg:-right-2"
      topLeftIcon={<MouseIcon className="h-[33px] w-[18px] lg:h-17 lg:w-9" />}
      topRightIcon={<KnotIcon className="h-[24px] w-[22px] md:h-6 md:w-6 lg:h-8 lg:w-8" />}
      bottomLeftIcon={<BluePrintIcon className="h-[30px] w-[34px] lg:h-12 lg:w-15" />}
      bottomRightIcon={<TargetIcon className="h-[24px] w-[24px] lg:h-10 lg:w-13" />}
    />
  );
}
