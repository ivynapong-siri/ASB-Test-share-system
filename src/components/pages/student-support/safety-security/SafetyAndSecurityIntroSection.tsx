import { BluePencil, CalendarIcon, KnotIcon, PaintTubeIcon } from "@/components/icons";

import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SafetyAndSecurityIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function SafetyAndSecurityIntroSection({ data, breadcrumbData }: SafetyAndSecurityIntroSectionProps) {
  return (
    <IntroSection
      breadcrumbClickable={true}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={data.title}
      description={data.description}
      imageSrc={data.image?.imageUrl ?? ""}
      textClassName="justify-center"
      showStandardVector={false}
      imageClassName="object-cover rotate-y-180"
      containerClassName="rotate-y-180"
      ribbonText={data.ribbonText}
      topLeftIcon={<BluePencil className="h-[36px] w-[16px] rotate-180 lg:h-16 lg:w-10" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<PaintTubeIcon className="h-[32px] w-[20px] -rotate-90 rotate-y-180 lg:h-16 lg:w-12" />}
      bottomRightIcon={<CalendarIcon className="h-[28px] w-[28px] -rotate-30 rotate-y-180 lg:h-[58px] lg:w-14" />}
      topLeftIconClassName="-left-0 top-0 lg:-left-6 lg:top-8"
      topRightIconClassName="-top-4 right-0 lg:-top-2 xl:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-6 left-2 lg:-bottom-10 lg:-left0 xl:-left-20"
      bottomRightIconClassName="-bottom-2 -right-6 lg:-bottom-8 lg:-right-14"
      vectorChildren={
        <PatternStroke1 className="absolute top-20 -right-18 z-10 h-[74px] w-[166px] rotate-180 lg:-top-12 lg:-right-22 lg:h-[148px] lg:w-[333px]" />
      }
    />
  );
}
