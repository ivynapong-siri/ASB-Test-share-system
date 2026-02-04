import { GlobeIcon, YellowPencilIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { FaqSection } from "@/components/shared/faq-section";
import { SectionJson } from "@/server/serializers/section-serializer";
import { ChevronDown } from "lucide-react";

interface AdvancedPlacementFAQSectionProps {
  faqData: SectionJson;
}

export default function AdvancedPlacementFAQSection({ faqData }: AdvancedPlacementFAQSectionProps) {
  return (
    <FaqSection
      className="max-md:pt-32 max-md:pb-20"
      ribbonText={faqData.ribbonText ?? ""}
      ribbonClassName="max-xl:translate-x-8 lg:translate-x-0 sm:max-w-[215px] max-md:max-w-[194px] text-center max-md:translate-x-4"
      variant="primary"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute -top-14 -left-32 h-[224px] w-[234px] rotate-60 lg:top-0 lg:h-[266px] lg:w-[360px]" />
          <YellowPencilIcon className="absolute top-21 left-[125px] h-8 w-3 rotate-15 rotate-y-180 lg:top-40 lg:left-[265px] lg:h-15 lg:w-6" />

          <PatternStroke1 className="absolute -top-24 -right-32 -z-1 h-50 w-50 lg:-right-16 lg:h-[165px] lg:w-[370px] lg:-rotate-30" />
          <GlobeIcon className="absolute top-14 right-17 size-9 h-[22px] w-[18px] rotate-30 lg:top-38 lg:right-54 lg:h-[44px] lg:w-[34px] lg:-rotate-14" />
        </>
      }
      questionClassName="text-white font-mono text-sm md:text-sm font-semibold"
      answerClassName="text-white font-normal"
      customIcon={<ChevronDown className="h-full min-w-6 cursor-pointer text-white transition-all" />}
      title={faqData.title ?? ""}
      faqs={faqData.faqs ?? []}
      activeFirstQuestion
      borderDashClassName="px-5 md:px-10"
    />
  );
}
