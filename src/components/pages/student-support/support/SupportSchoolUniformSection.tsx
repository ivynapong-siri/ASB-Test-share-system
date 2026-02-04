"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { CalendarIcon } from "@/components/icons";
import { SectionJson } from "@/server/serializers/section-serializer";
import SchoolUniformCarousel from "../../../carousel/school-uniform-carousel";

interface SupportSchoolUniformSectionProps {
  data: SectionJson;
}

const SupportSchoolUniformSection = ({ data }: SupportSchoolUniformSectionProps) => {
  const cards = getMinSectionCardJsonLoop({ cards: data.cards ?? [], minLoopCard: 8 });

  const renderVector = () => {
    return (
      <>
        <PatternStroke2 className="absolute top-14 -right-31 h-[132px] w-[180px] -rotate-60 rotate-y-180 lg:top-5 lg:-right-25 lg:h-[265px] lg:w-[360px] lg:-rotate-45" />
        <CalendarIcon className="absolute top-38 right-18 h-[53px] w-[28px] rotate-30 max-md:rotate-y-180 lg:top-48 lg:right-72 lg:h-[68px] lg:w-[50px]" />
        <PatternStroke1 className="absolute top-70 -left-28 h-[75px] w-[170px] -rotate-30 rotate-y-180 lg:top-50 lg:h-[265px] lg:w-[360px] xl:top-40 xl:-left-5" />
      </>
    );
  };

  return (
    <>
      <SectionContainer
        sectionClassName="bg-primary-gray"
        className="px-0 max-md:pb-0 lg:items-center"
        vectorChildren={renderVector()}
      >
        <div className="flex flex-col items-center max-lg:px-10">
          <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
          <ASBTitle title={data.title ?? ""} className="text-start lg:text-center" />
          <ASBDescription
            description={data.description ?? ""}
            className="pt-8 pb-15 lg:max-w-lg lg:pb-20 lg:text-center xl:max-w-2xl"
          />
        </div>
        <SchoolUniformCarousel slides={cards} buttonName="school-uniform" className="pb-8 max-md:hidden" />
        <div className="flex w-full items-center justify-center max-md:hidden">
          <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? ""} />
        </div>
      </SectionContainer>

      <div className="bg-primary-gray flex w-full max-w-screen flex-col pb-16 md:hidden">
        <SchoolUniformCarousel slides={cards} buttonName="school-uniform-mobile" className="pb-8" />
        <div className="flex w-full items-center justify-center">
          <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? ""} />
        </div>
      </div>
    </>
  );
};

export default SupportSchoolUniformSection;
