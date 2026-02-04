"use client";

import { slideUniversityBreakPoints } from "@/client/configs/slide-carousel-config";
import { getGearCards } from "@/client/utils/helper";
import GearCarousel from "@/components/carousel/gear-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import GearCard from "@/components/custom/cards/gear-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SportEmotionalGrowthSectionProps {
  data: SectionJson;
}

export default function SportEmotionalGrowthSection({ data }: SportEmotionalGrowthSectionProps) {
  const convertCards = getGearCards({
    cards: data.cards ?? [],
    image: data.image?.imageUrl ?? "",
    requiredCardImage: false,
  });

  return (
    <>
      <SectionContainer className="text-primary-400 items-center">
        <ASBRibbonText
          title={data.ribbonText ?? ""}
          className="translate-x-8 max-md:text-center"
          ribbonClassName="max-md:max-w-[207px]"
        />
        <ASBTitle title={data.title ?? ""} />
        <ASBDescription description={data.description ?? ""} className="my-8 max-w-2xl text-center md:my-12" />
        <GearCarousel
          breakpoints={slideUniversityBreakPoints}
          cardData={convertCards}
          cardComponent={GearCard}
          isMobile={false}
        />
      </SectionContainer>
      <GearCarousel
        breakpoints={slideUniversityBreakPoints}
        cardData={convertCards}
        cardComponent={GearCard}
        isMobile={true}
      />
    </>
  );
}
