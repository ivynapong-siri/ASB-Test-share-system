import { BluePencil, CalendarIcon, KnotIcon, PaintTubeIcon } from "@/components/icons";

import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface PastoralCareIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function PastoralCareIntroSection({ data, breadcrumbData }: PastoralCareIntroSectionProps) {
  return (
    <>
      <IntroSection
        className="lg:pb-32"
        breadcrumbClickable={true}
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
        title={data.title}
        description={data.description}
        ribbonText={data.ribbonText}
        imageSrc={data.image?.imageUrl || ""}
        showStandardVector={false}
        imageClassName="object-cover rotate-y-180"
        vectorChildren={
          <PatternStroke1
            color="#B81E29"
            className="absolute -top-[20px] -right-18 z-10 h-[120px] w-[150px] rotate-180 lg:-top-[50px] lg:-right-22 lg:h-[150px] lg:w-[340px]"
          />
        }
        containerClassName="rotate-y-180"
        textClassName="justify-center"
        topLeftIcon={<BluePencil className="h-[36px] w-[16px] rotate-180 lg:h-16 lg:w-10 lg:rotate-140" />}
        topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
        bottomLeftIcon={<PaintTubeIcon className="h-[32px] w-[20px] -rotate-90 rotate-y-180 lg:h-16 lg:w-12" />}
        bottomRightIcon={<CalendarIcon className="h-[28px] w-[28px] -rotate-30 rotate-y-180 lg:h-10 lg:w-10" />}
        topLeftIconClassName="-left-0 top-0 lg:-left-8 xl:-left-18 lg:top-0"
        topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
        bottomLeftIconClassName="-bottom-6 left-2 lg:-bottom-12 lg:-left-6 xl:-bottom-10 xl:-left-20"
        bottomRightIconClassName="-bottom-2 -right-6 lg:-bottom-10 lg:-right-6"
      />
    </>
  );
}
