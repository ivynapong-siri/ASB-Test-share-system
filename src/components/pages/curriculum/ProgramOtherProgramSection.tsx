"use client";

import { otherProjectBreakPoints } from "@/client/configs/slide-carousel-config";
import SlideSchoolProgramCarousel from "@/components/carousel/project-other-program-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProgramOtherProgramSectionProps {
  data: SectionJson;
}

export default function ProgramOtherProgramSection({ data }: ProgramOtherProgramSectionProps) {
  return (
    <SectionContainer sectionClassName="bg-primary" className="items-center px-0">
      <div className="flex flex-col items-center justify-center gap-8 px-10">
        <div className="flex flex-col items-center">
          <ASBRibbonText
            title={data.ribbonText ?? ""}
            className="translate-x-8 max-md:text-center"
            ribbonClassName="max-md:max-w-[200px]"
          />
          <ASBTitle title={data.title ?? ""} className="pt-3 text-white" />
        </div>
        <ASBDescription description={data.description ?? ""} className="max-w-[400px] pb-21 text-center text-white" />
      </div>
      <div className="flex w-full lg:px-10 xl:px-0">
        <SlideSchoolProgramCarousel
          cards={data.cards ?? []}
          breakPoint={otherProjectBreakPoints}
          carouselName="slideSchoolProgramCarousel"
        />
      </div>
    </SectionContainer>
  );
}
