"use client";

import { getImageUrl } from "@/client/utils/helper";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import BlogCardWithIndex from "@/components/custom/cards/blog-card-with-index";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface XCLASBStoryOurLegacySectionProps {
  sectionData: SectionJson;
}

const XCLASBStoryOurLegacySection = ({ sectionData }: XCLASBStoryOurLegacySectionProps) => {
  const { title, ribbonText, description, buttonLabel, buttonUrl, cards } = sectionData;
  const isMobile = useIsMobile();

  const renderLegacyCards = ({ cards }: { cards: SectionCardJson[] }) =>
    cards.map((card, index) => {
      const primaryUrl = getImageUrl(card, isMobile);
      const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
      const [imgSrc, setImgSrc] = useState(primaryUrl);

      return (
        <BlogCardWithIndex
          key={`xcl-asb-ourLegacy-${card.id}`}
          content={card.description}
          index={index}
          title={card.title}
          imageBackground={card.image2?.imageUrl ?? ""}
          imageSrc={imgSrc}
          setImgSrc={setImgSrc}
          fallbackUrl={fallbackUrl}
          isImageOnTop={true}
          cardClassName="min-h-[420px] md:min-h-[400px]"
          contentBackgroundClassName="bg-muted"
          contentClassName="text-primary-400"
          badgeClassName="bg-primary-200"
          imageBackgroundWrapperClassName="left-auto right-4 lg:right-8"
        />
      );
    });

  return (
    <SectionContainer>
      <div className="flex w-full flex-col justify-between lg:flex-row xl:gap-20">
        <div className="flex-1/2 pb-8 lg:pb-0">
          {ribbonText && <ASBRibbonText title={ribbonText} className="pt-0" />}
          {title && <ASBTitle title={title} className="text-start" />}
        </div>

        <div className="flex-1/2 gap-8">
          {description && (
            <p className="pb-7 font-mono text-base/[1.625rem] text-neutral-300 lg:pt-16 lg:pb-8 2xl:pr-15">
              {description}
            </p>
          )}
          {buttonLabel && buttonUrl && (
            <LinkButton
              buttonText={buttonLabel}
              href={buttonUrl}
              iconClassName="text-white border border-dashed border-white rounded-full"
            />
          )}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 bg-white pt-10 lg:grid-cols-2 xl:grid-cols-3 xl:pt-25">
        {cards && renderLegacyCards({ cards })}
      </div>
    </SectionContainer>
  );
};

export default XCLASBStoryOurLegacySection;
