import { slideUniversityBreakPoints } from "@/client/configs/slide-carousel-config";
import { getGearCards } from "@/client/utils/helper";
import GearCarousel from "@/components/carousel/gear-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import GearCard from "@/components/custom/cards/gear-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SupportUniversitySectionProps {
  data: SectionJson;
}

const SupportUniversitySection = ({ data }: SupportUniversitySectionProps) => {
  const convertCards = getGearCards({
    cards: data.cards ?? [],
    image:
      data.image?.imageUrl ??
      "https://dcb9450325.nxcli.io/wp-content/uploads/2025/05/c3db4444a88ba77eeabf2d2eff394c1937f85eaa-scaled-e1746787640714.jpg",
  });

  return (
    <>
      <SectionContainer className="items-center pb-0 lg:pb-20" sectionClassName="w-full">
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} />
        <ASBDescription description={data.description ?? ""} className="pt-4 pb-12 text-center lg:max-w-2xl lg:pt-8" />
        <GearCarousel
          cardData={convertCards}
          breakpoints={slideUniversityBreakPoints}
          cardComponent={GearCard}
          isMobile={false}
          paginateClassName="lg:w-[min(100%,300px)]"
          className="max-lg:flex-col xl:flex-row"
        />
      </SectionContainer>
      <GearCarousel
        cardData={convertCards}
        breakpoints={slideUniversityBreakPoints}
        cardComponent={GearCard}
        isMobile={true}
      />
    </>
  );
};

export default SupportUniversitySection;
