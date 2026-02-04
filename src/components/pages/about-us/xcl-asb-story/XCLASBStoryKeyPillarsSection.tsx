"use client";

import { PatternStroke1, PatternStroke3, TextHighlight1 } from "@/components/shapes";

import { getImageUrl } from "@/client/utils/helper";
import ASBTitle from "@/components/custom/asb-title";
import BlogCardWithIndex from "@/components/custom/cards/blog-card-with-index";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface XCLASBStoryKeyPillarsSectionProps {
  sectionData: SectionJson;
}

const XCLASBStoryKeyPillarsSection = ({ sectionData }: XCLASBStoryKeyPillarsSectionProps) => {
  const { description, titleLine1, titleLine2, cards } = sectionData;
  const isMobile = useIsMobile();

  const renderPillarCard = (cards: SectionCardJson[]) => {
    return cards.map((card, idx) => {
      const primaryUrl = getImageUrl(card, isMobile);
      const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
      const [imgSrc, setImgSrc] = useState(primaryUrl);

      return (
        <BlogCardWithIndex
          key={idx}
          index={idx}
          title={card.title}
          content={card.description}
          imageSrc={imgSrc}
          setImgSrc={setImgSrc}
          fallbackUrl={fallbackUrl}
          badgeClassName="lg:-translate-x-1/2"
          isImageOnTop={idx === 0 || idx === 3}
          imageClassName="object-cover min-h-0 h-[237px] lg:h-[412px]"
          cardClassName="h-[320px] md:h-[300px]  lg:h-[320px]"
          className="lg:h-[652px]"
          contentClassName="text-xs md:text-sm"
          contentBackgroundClassName="lg:px-15"
          isKeyPillar
        />
      );
    });
  };

  const renderVectors = () => (
    <>
      <PatternStroke1
        color="white"
        className="absolute bottom-1/6 -left-2 h-[70px] w-[156px] -rotate-10 sm:bottom-1/5 lg:-left-6 lg:h-[150px] lg:w-[340px]"
      />
      <PatternStroke3
        color="white"
        className="absolute top-60 -right-8 h-20 w-20 rotate-30 lg:top-42 lg:h-28 lg:w-28 lg:rotate-0"
      />
    </>
  );

  return (
    <SectionContainer sectionClassName="bg-primary" vectorChildren={renderVectors()}>
      <div className="flex flex-col items-center">
        <div className="relative text-center">
          <TextHighlight1 className="absolute top-0 -right-1 h-14 w-15 md:top-10 md:-right-16 lg:top-24" />
          {titleLine1 && <ASBTitle title={titleLine1} className="text-white" />}
          {titleLine2 && <ASBTitle title={titleLine2} className="text-white" as="h3" />}
        </div>
        {description && (
          <p className="w-full pt-6 text-center font-mono text-base/[2rem] font-light text-white lg:w-[660px]">
            {description}
          </p>
        )}
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 pt-10 lg:grid-cols-2 xl:pt-25">
          {cards && renderPillarCard(cards)}
        </div>
      </div>
    </SectionContainer>
  );
};

export default XCLASBStoryKeyPillarsSection;
