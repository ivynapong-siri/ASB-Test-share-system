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

interface EnglishLanguageLearnerProgramBenefitSectionProps {
  benefitData: SectionJson;
}

export default function EnglishLanguageLearnerProgramBenefitSection({
  benefitData,
}: EnglishLanguageLearnerProgramBenefitSectionProps) {
  const convertCards = getGearCards({
    cards: benefitData.cards ?? [],
    image: benefitData.image?.imageUrl ?? "",
    requiredCardImage: false,
  });

  return (
    <>
      <SectionContainer className="items-center gap-8">
        <div className="flex w-full flex-col items-center">
          <ASBRibbonText title={benefitData.ribbonText ?? ""} className="translate-x-8" />
          <ASBTitle title={benefitData.title ?? ""} className="max-w-4xl" />
        </div>
        <ASBDescription description={benefitData.description ?? ""} className="max-w-4xl text-center" />
        <GearCarousel
          breakpoints={slideUniversityBreakPoints}
          cardComponent={GearCard}
          cardData={convertCards}
          isMobile={false}
        />
      </SectionContainer>
      <GearCarousel
        breakpoints={slideUniversityBreakPoints}
        cardComponent={GearCard}
        cardData={convertCards}
        isMobile={true}
      />
    </>
  );
}
