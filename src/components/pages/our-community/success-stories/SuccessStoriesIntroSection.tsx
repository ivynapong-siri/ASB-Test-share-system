"use client";

import { GraduateHatIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";

import { PatternStroke2 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SuccessStoriesIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function SuccessStoriesIntroSection({ data, breadcrumbData }: SuccessStoriesIntroSectionProps) {
  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl || ""}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-4 -right-20 h-[132px] w-[130px] lg:-top-32 lg:-right-58 lg:h-[265px] lg:w-[360px]" />
          {/* <PatternStroke1 className="absolute bottom-16 -left-12 z-10 h-19 w-42 rotate-12 max-md:hidden max-sm:translate-y-full md:top-[420px] md:rotate-35 lg:rotate-30 xl:top-[590px] xl:-left-18 xl:h-38 xl:w-84" /> */}
        </>
      }
      topLeftIcon={<LightBulbIcon className="h-[27px] w-[28px] md:h-[35px] md:w-[34px] xl:h-[45px] xl:w-[44px]" />}
      topLeftIconClassName="top-0 left-2 lg:top-12 xl:top-0 xl:-left-4 -translate-x-full"
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] xl:h-[30px] xl:w-[29px]" />}
      topRightIconClassName="top-2 lg:top-13 xl:top-4 right-0 -translate-y-full"
      bottomLeftIcon={<GraduateHatIcon className="h-5 w-17 xl:h-[44px] xl:w-[95px]" />}
      bottomLeftIconClassName="-bottom-4 lg:bottom-8 xl:-bottom-0 -left-8 xl:-left-30"
      bottomRightIcon={<MagnifyIcon className="h-[18px] w-[20px] xl:h-9 xl:w-10" />}
      bottomRightIconClassName="xl:-bottom-6 lg:bottom-8 -bottom-3 -right-2 xl:-right-8"
    />
  );
}
