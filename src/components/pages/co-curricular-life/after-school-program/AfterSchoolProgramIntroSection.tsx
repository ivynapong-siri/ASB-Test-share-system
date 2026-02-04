import { BluePencil, KnotIcon, PaintBottleIcon, PaintTubeIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AfterSchoolProgramIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function AfterSchoolProgramIntroSection({ data, breadcrumbData }: AfterSchoolProgramIntroSectionProps) {
  return (
    <IntroSection
      imageSrc={data.image?.imageUrl || ""}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      ribbonText={data.ribbonText}
      description={data.description}
      title={data.title}
      titleClassName="max-w-sm"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-4 -right-20 h-[132px] w-[130px] lg:-top-32 lg:-right-58 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke1 className="absolute -bottom-10 -left-20 z-10 h-[74px] w-[166px] rotate-12 max-sm:translate-y-full md:top-[480px] md:rotate-35 lg:rotate-30 xl:top-[590px] xl:-left-18 xl:h-38 xl:w-84" />
        </>
      }
      topLeftIcon={<PaintBottleIcon className="h-[32px] w-[24px] lg:h-14 lg:w-10" />}
      topLeftIconClassName="top-0 -left-6 lg:-left-10"
      topRightIcon={<KnotIcon className="h-[23px] w-[22px] lg:h-10 lg:w-10" />}
      topRightIconClassName="-top-4 lg:-top-6 right-0"
      bottomLeftIcon={<PaintTubeIcon className="h-[38px] w-[26px] lg:h-16 lg:w-10" />}
      bottomLeftIconClassName="-bottom-8 lg:-bottom-12 -left-2 -rotate-60 rotate-y-180"
      bottomRightIcon={<BluePencil className="h-[35px] w-[24px] lg:h-16 lg:w-10" />}
      bottomRightIconClassName="-bottom-8 lg:-bottom-12 -right-2 rotate-15"
    />
  );
}
