"use client";

import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import SimpleIconCardCarousel from "@/components/carousel/simple-icon-card-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdvancedPlacementBenefitSectionProps {
  benefitData: SectionJson;
}

export default function AdvancedPlacementBenefitSection({ benefitData }: AdvancedPlacementBenefitSectionProps) {
  const cards = getMinSectionCardJsonLoop({ cards: benefitData.cards ?? [], minLoopCard: 10 });

  return (
    <section className="w-full pb-20">
      <SectionContainer className="items-center gap-8 px-8 pb-12">
        <ASBRibbonText title={benefitData.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={benefitData.title ?? ""} className="max-w-4xl" />
        <ASBDescription description={benefitData.description ?? ""} className="max-w-4xl text-center" />
      </SectionContainer>

      <SimpleIconCardCarousel cards={cards} iconClassName="w-96" carouselName="advanced-placement" />
    </section>
  );
}
