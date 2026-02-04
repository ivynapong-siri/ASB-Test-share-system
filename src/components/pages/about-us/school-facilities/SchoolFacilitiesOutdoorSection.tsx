"use client";

import { BasketBallIcon, TrophyIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke3 } from "@/components/shapes";

import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import SportFacilitiesCarousel from "@/components/carousel/sport-facilities-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SchoolFacilitiesOutdoorSectionProps {
  data: SectionJson;
}

const SchoolFacilitiesOutdoorSection = ({ data }: SchoolFacilitiesOutdoorSectionProps) => {
  const cards = getMinSectionCardJsonLoop({ cards: data.cards ?? [], minLoopCard: 11 });

  return (
    <div className="bg-primary flex flex-col pb-20">
      <SectionContainer
        sectionClassName="bg-primary"
        className="pb-0 lg:pb-8"
        vectorChildren={
          <>
            <PatternStroke1
              className="absolute top-0 -left-24 hidden h-[150px] w-[330px] -rotate-12 rotate-x-180 lg:block"
              color="white"
            />
            <PatternStroke3 className="absolute top-24 -right-4 h-[100px] w-[110px] rotate-30 lg:top-44 lg:h-[164px] lg:w-[104px] lg:rotate-10" />
            <TrophyIcon className="absolute hidden h-9 w-5 lg:top-[120px] lg:left-[168px] lg:block lg:h-[52px] lg:w-[50px]" />
            <BasketBallIcon className="absolute top-[155px] right-20 h-7 w-7 lg:top-[240px] lg:right-20 lg:h-10 lg:w-10" />
          </>
        }
      >
        <div className="flex w-full flex-col lg:items-center lg:text-center">
          <ASBRibbonText title={data.ribbonText ?? ""} className="lg:translate-x-8" />
          <ASBTitle title={data.title ?? ""} className="text-start text-white" />
          <p className="text-base-[2rem] max-w-4xl pt-8 font-mono text-white lg:pt-9">{data.description}</p>
        </div>
      </SectionContainer>
      <SportFacilitiesCarousel slides={cards} className="pt-8" />
    </div>
  );
};

export default SchoolFacilitiesOutdoorSection;
