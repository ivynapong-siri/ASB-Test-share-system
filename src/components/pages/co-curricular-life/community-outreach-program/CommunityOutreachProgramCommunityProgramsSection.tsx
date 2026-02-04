"use client";

import MarkYourCalendarSection from "@/components/shared/mark-your-calendar-section";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface HolidaysAndCelebrationsCelebrationDaysSectionProps {
  data: SectionWithTabJson;
}

const HolidaysAndCelebrationsCelebrationDaysSection = ({
  data,
}: HolidaysAndCelebrationsCelebrationDaysSectionProps) => {
  return <MarkYourCalendarSection data={data} variant="secondary" className="pt-0" requireDropDownButton={false} />;
};

export default HolidaysAndCelebrationsCelebrationDaysSection;
