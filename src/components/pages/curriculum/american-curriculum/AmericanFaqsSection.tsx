import { LightBulbIcon, YellowPencilIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import AmericanFaqComponent from "./AmericanFaqComponent";

interface AmericanFaqSectionProps {
  data: SectionWithTabJson;
}

const AmericanFaqSection = ({ data }: AmericanFaqSectionProps) => {
  return (
    <div className="relative">
      <SectionContainer
        className="md:pb-40"
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-32 -left-32 z-10 h-[132px] w-[180px] rotate-45 lg:top-32 lg:-left-36 lg:h-[266px] lg:w-[360px]" />
            <PatternStroke1 className="absolute -top-20 -right-32 h-20 w-[190px] lg:-right-4 lg:h-[150px] lg:w-[334px]" />

            <LightBulbIcon className="absolute top-12 right-14 h-8 w-6 lg:top-4 lg:right-78 lg:h-16 lg:w-12" />
            <YellowPencilIcon className="absolute top-56 left-16 h-8 w-3 -rotate-30 lg:top-60 lg:left-56 lg:h-16 lg:w-6" />

            <div className="absolute bottom-0 left-0 -z-1 h-[270px] w-[430px] md:-bottom-10 md:h-[550px] md:w-[870px]">
              <div className="relative h-[270px] w-[430px] md:h-[550px] md:w-[870px]">
                <Image
                  src="/bg-faq-section.jpg"
                  alt="bg-american-faq-section"
                  fill
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white/100 to-transparent" />
              </div>
            </div>
          </>
        }
      >
        <div className="relative z-10 flex w-full flex-col items-center">
          <ASBRibbonText title={data.ribbonText} className="translate-x-8" />
          <ASBTitle title={data.title ?? ""} className="max-w-[900px] pb-18" />
          <AmericanFaqComponent stepsDetail={data.tabs ?? []} />
        </div>
      </SectionContainer>
    </div>
  );
};

export default AmericanFaqSection;
