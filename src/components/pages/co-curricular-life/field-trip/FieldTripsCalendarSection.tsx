"use client";

import MarkYourCalendarSection from "@/components/shared/mark-your-calendar-section";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface FieldTripsCalendarSectionProps {
  data: SectionWithTabJson;
}

const FieldTripsCalendarSection = ({ data }: FieldTripsCalendarSectionProps) => {
  return (
    <MarkYourCalendarSection
      data={data}
      variant="secondary"
      buttonLeftLinkClassName="w-fit max-sm:translate-x-3 max-sm:scale-80"
      buttonRightLinkClassName="max-sm:scale-80 max-sm:-translate-x-3"
      buttonContainerClassName="flex-row max-sm:gap-0"
      requireDropDownButton={false}
      className="lg:pt-[101px]"
    />
  );
};

export default FieldTripsCalendarSection;
