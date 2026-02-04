import { CalendarEventJson, CalendarJson } from "@/server/serializers/pages/calendar-serializer";

import CalendarCalendarSection from "./CalendarCalendarSection";

interface CalendarDetailProps {
  data: CalendarJson;
  events: CalendarEventJson[];
}

const CalendarDetail = ({ data, events }: CalendarDetailProps) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <CalendarCalendarSection data={data} events={events} />
      {/* <SimpleContentCarouselSection
        buttonName="calendar"
        carouselName="calendar"
        breakPoints={contentCarouselPoints}
        isProfile={true}
        contentClassName="min-w-0"
      /> */}
    </div>
  );
};

export default CalendarDetail;
