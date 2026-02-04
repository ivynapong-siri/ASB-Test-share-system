"use client";

import { getImageUrl } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import BlogCardWithIndex from "@/components/custom/cards/blog-card-with-index";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface AdditionalProgramsSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}
// const cardStyles: Record<number, { imageBgClass: string; wrapperClass: string }> = {
//   1: { imageBgClass: "w-[351px] h-[260px]", wrapperClass: "top-1/4" },
//   2: { imageBgClass: "w-[351px] h-[260px]", wrapperClass: "top-1/5 left-1/3" },
// };

const RenderBlogCards = ({ card, index }: { card: SectionCardJson; index: number }) => {
  const isMobile = useIsMobile();

  const primaryUrl = getImageUrl(card, isMobile);
  const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <BlogCardWithIndex
      key={`american-ourCurriculum-${card.id}`}
      index={index}
      title={card.title}
      content={card.description}
      imageSrc={imgSrc}
      setImgSrc={setImgSrc}
      fallbackUrl={fallbackUrl}
      badgeClassName="-translate-x-1/10 bg-primary"
      contentBackgroundClassName="px-8 py-9 h-fit bg-primary-gray"
      cardClassName="bg-primary-gray rounded-b-4xl"
      imageClassName="rounded-t-3xl  min-h-[237px] lg:min-h-[256px]"
      isImageOnTop={true}
      imageBackground={card.image2?.imageUrl ?? ""}
      // imageBackgroundClassName={imageBgClass}
      imageBackgroundWrapperClassName="right-4  left-auto"
    />
  );
};

const AmericanOurCurriculumSection = ({ data, breadcrumbData }: AdditionalProgramsSectionProps) => {
  return (
    <SectionContainer className="py-10 md:py-20">
      <div className="py-10 md:py-20">
        <BreadcrumbCustom
          data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
        />
      </div>
      <div className="flex flex-col items-center">
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} className="max-w-[900px] pb-8" />
        <ASBDescription description={data.description ?? ""} className="max-w-[576px] pb-10 text-center" />
        <div className="grid w-full max-w-7xl grid-cols-1 flex-col gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.cards &&
            data.cards.map((data, index) => {
              return <RenderBlogCards key={data.id} card={data} index={index} />;
            })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AmericanOurCurriculumSection;
