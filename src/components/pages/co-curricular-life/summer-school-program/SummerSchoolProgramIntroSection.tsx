import { BluePencil, KnotIcon, PaintBottleIcon, PaintTubeIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SummerSchoolProgramIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const SummerSchoolProgramIntroSection = ({ data, breadcrumbData }: SummerSchoolProgramIntroSectionProps) => {
  return (
    <IntroSection
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={data.title}
      ribbonText={data.ribbonText}
      description={data.description}
      imageSrc={data.image?.imageUrl || ""}
      className="py-36"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-4 -right-20 h-[132px] w-[130px] lg:-top-32 lg:-right-58 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke1 className="absolute bottom-28 -left-12 z-10 h-19 w-42 rotate-12 max-sm:translate-y-full md:top-[560px] md:rotate-35 lg:top-[520px] lg:rotate-30 xl:top-[590px] xl:-left-18 xl:h-38 xl:w-84" />
        </>
      }
      topLeftIcon={<PaintBottleIcon className="h-[32px] w-[24px] lg:h-14 lg:w-10" />}
      topLeftIconClassName="top-0 -left-6  lg:-left-10"
      topRightIcon={<KnotIcon className="h-[23px] w-[22px] lg:h-10 lg:w-10" />}
      topRightIconClassName="-top-6 right-0 md:-top-4"
      bottomLeftIcon={<PaintTubeIcon className="h-[38px] w-[26px] lg:h-16 lg:w-10" />}
      bottomLeftIconClassName="-bottom-8 lg:-bottom-12 -left-2 -rotate-60 rotate-y-180"
      bottomRightIcon={<BluePencil className="h-[35px] w-[24px] lg:h-16 lg:w-10" />}
      bottomRightIconClassName="-bottom-8 lg:-bottom-12 -right-2 rotate-15"
    />
  );
};

export default SummerSchoolProgramIntroSection;
