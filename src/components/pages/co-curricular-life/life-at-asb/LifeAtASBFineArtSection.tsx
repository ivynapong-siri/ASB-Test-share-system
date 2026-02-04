import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { slideUniversityBreakPoints } from "@/client/configs/slide-carousel-config";
import { getGearCards } from "@/client/utils/helper";
import GearCarousel from "@/components/carousel/gear-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import GearCard from "@/components/custom/cards/gear-card";
import { SectionJson } from "@/server/serializers/section-serializer";
import { SectionContainer } from "../../../custom/section-container";

interface LifeAtASBFineArtSectionProps {
  data: SectionJson;
}

const LifeAtASBFineArtSection = ({ data }: LifeAtASBFineArtSectionProps) => {
  const convertCards = getGearCards({
    cards: data.cards ?? [],
    image: data.image?.imageUrl ?? "",
    requiredCardImage: false,
  });

  return (
    <>
      <SectionContainer
        className="items-center pb-0"
        sectionClassName="w-full"
        vectorChildren={
          <>
            <PatternStroke1 className="absolute -top-10 -right-24 h-32 w-42 lg:-top-15 lg:-right-38 lg:h-[200px] lg:w-[360px]" />
            <PatternStroke2 className="absolute top-24 -left-20 h-[102px] w-[150px] -rotate-[-30deg] lg:top-32 lg:h-[205px] lg:w-[300px] xl:h-[265px] xl:w-[360px]" />
          </>
        }
      >
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} />
        <ASBDescription
          description={data.description ?? ""}
          className="pt-4 pb-15 text-center lg:max-w-lg lg:pt-8 lg:pb-24 xl:max-w-2xl"
        />
        <GearCarousel
          breakpoints={slideUniversityBreakPoints}
          cardComponent={GearCard}
          cardData={convertCards}
          arrowClass="hidden"
          paginateClassName="lg:w-[min(100%,370px)]"
          isMobile={false}
        />
      </SectionContainer>
      <GearCarousel
        breakpoints={slideUniversityBreakPoints}
        cardComponent={GearCard}
        cardData={convertCards}
        arrowClass="hidden"
        paginateClassName="w-[min(100%,200px)]"
        isMobile={true}
      />
    </>
  );
};

export default LifeAtASBFineArtSection;
