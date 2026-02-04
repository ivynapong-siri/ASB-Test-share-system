"use client";

import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { getImageUrl } from "@/client/utils/helper";
import BlogCardWithIndex from "@/components/custom/cards/blog-card-with-index";
import IntroSection from "@/components/shared/intro-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface VisionAndMissionOurMissionSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const VisionAndMissionOurMissionSection = ({ data, breadcrumbData }: VisionAndMissionOurMissionSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <IntroSection
      title={data.title}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      description={data.description}
      imageSrc={data.image?.imageUrl || ""}
      ribbonText={data.ribbonText}
      topLeftIcon={<LightBulbIcon className="h-10 w-8 lg:h-16 lg:w-12" />}
      topRightIcon={<KnotIcon className="h-6 w-5 lg:h-10 lg:w-9" />}
      bottomLeftIcon={<BookIcon className="h-8 w-13 lg:h-13 lg:w-21" />}
      bottomRightIcon={<MagnifyIcon className="h-5 w-6 lg:h-9 lg:w-10" />}
      topLeftIconClassName="-left-12 top-0 lg:-left-18 lg:top-0"
      topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-10 -left-10 lg:-bottom-10 lg:-left-20"
      bottomRightIconClassName="-bottom-10 right-0 lg:-bottom-10 lg:right-0"
      children={
        <div className="flex flex-col gap-8 pt-14 lg:flex-row lg:gap-5 lg:pt-32">
          {renderCardWithIndex(data.cards ?? [], isMobile)}
        </div>
      }
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-12 -right-40 h-32 w-64 md:-top-0 md:-right-40 lg:-top-32 lg:-right-60 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke1
            color="#1A245C"
            className="absolute top-9/24 -left-16 -z-10 h-28 w-40 lg:top-2/5 lg:-left-12 lg:h-[150px] lg:w-[330px]"
          />
        </>
      }
    />
  );
};

const renderCardWithIndex = (data: SectionCardJson[], isMobile: boolean) => {
  return data.map((e, index) => {
    const primaryUrl = getImageUrl(e, isMobile);
    const fallbackUrl = e.image?.imageUrl || "/mock-image.jpg";
    const [imgSrc, setImgSrc] = useState(primaryUrl);

    return (
      <BlogCardWithIndex
        key={index}
        index={index}
        title={e.title}
        content={e.description}
        imageSrc={imgSrc}
        setImgSrc={setImgSrc}
        fallbackUrl={fallbackUrl}
        badgeClassName="-translate-x-1/10 bg-primary"
        contentBackgroundClassName="bg-primary-gray px-8 py-9 h-fit"
        imageClassName="rounded-t-3xl"
        isImageOnTop={true}
      />
    );
  });
};

export default VisionAndMissionOurMissionSection;
