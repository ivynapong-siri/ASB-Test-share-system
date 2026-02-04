"use client";

import { slideOurVoicesBreakPoints } from "@/client/configs/slide-carousel-config";
import HoverCardWithFilterSection from "@/components/shared/hover-card-with-filter-section";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface FamilyOurVoiceSectionProps {
  data: SectionWithTabJson;
}

const FamilyOurVoiceSection = ({ data }: FamilyOurVoiceSectionProps) => {
  return (
    <HoverCardWithFilterSection
      data={data}
      variant="secondary"
      isProfile
      filterButtonClassName="border border-solid"
      dropDownContainerClassName="bg-transparent"
      breakpoints={slideOurVoicesBreakPoints}
    />
  );
};

export default FamilyOurVoiceSection;
