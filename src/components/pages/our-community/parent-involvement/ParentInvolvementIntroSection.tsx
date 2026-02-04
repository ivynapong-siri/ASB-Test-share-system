import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ParentInvolvementIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function ParentInvolvementIntroSection({ data, breadcrumbData }: ParentInvolvementIntroSectionProps) {
  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      ribbonText={data.ribbonText}
      description={data.description}
      imageSrc={data.image?.imageUrl || ""}
      breadcrumbClassname="max-md:max-w-2/3"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-4 -right-20 h-[132px] w-[130px] lg:-top-32 lg:-right-58 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke1 className="absolute bottom-0 -left-18 z-10 h-19 w-42 max-md:top-auto max-sm:translate-y-full md:top-[590px] xl:top-[590px] xl:-left-0 xl:h-38 xl:w-84" />
        </>
      }
      topLeftIcon={<LightBulbIcon className="h-[27px] w-[28px] md:h-[35px] md:w-[34px] lg:h-[64px] lg:w-[48px]" />}
      topLeftIconClassName="top-0 left-2 lg:left-6 lg:-top-12 -translate-x-full"
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      topRightIconClassName="top-2 lg:top-4 xl:top-4 right-0 -translate-y-full"
      bottomLeftIcon={<BookIcon className="h-[24px] w-[41px] lg:h-[49px] lg:w-[83px]" />}
      bottomLeftIconClassName="-bottom-5 lg:-bottom-8 -left-4 lg:-left-12"
      bottomRightIcon={<MagnifyIcon className="h-[18px] w-[20px] lg:h-9 lg:w-10" />}
      bottomRightIconClassName="lg:-bottom-6 -bottom-3 -right-2 lg:-right-8"
    />
  );
}
