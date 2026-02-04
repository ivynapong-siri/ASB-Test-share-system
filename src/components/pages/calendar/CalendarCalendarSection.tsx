"use client";

import {
  CalendarEventJson,
  CalendarJson,
  CalendarNavBoxJson,
  TagsColorMap,
} from "@/server/serializers/pages/calendar-serializer";
import { Search, Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { formatCalendarDateKey } from "@/client/utils/helper";
import { ButtonWithIcons } from "@/components/custom/buttons/button-with-icon";
import { NavigationRoundedButton } from "@/components/custom/buttons/navigation-rounded-button";
import ContactBanner from "@/components/custom/contact-banner";
import { DatePickerWithPopover } from "@/components/custom/date-picker-with-popover-";
import { CalendarFilterDropdown } from "@/components/custom/dropdown-button-calendar-filter";
import { InputWithIcon } from "@/components/custom/input-with-icon";
import { SectionContainer } from "@/components/custom/section-container";
import SubstractBackground from "@/components/custom/substract-background";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";

interface CalendarCalendarSectionProps {
  data: CalendarJson;
  events: CalendarEventJson[];
}

const RenderLegends = ({ color, id, label }: { id: number; label: string; color: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTags = searchParams.getAll("tags");
  const isSelected = currentTags.includes(id.toString());

  const handleSelectLegends = () => {
    const params = new URLSearchParams(searchParams);
    if (isSelected) {
      // If already selected, deselect it
      params.delete("tags");
    } else {
      // Replace current tags with the selected one
      params.delete("tags");
      params.set("tags", id.toString());
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <button
      onClick={handleSelectLegends}
      className={cn(
        "flex w-44 items-center rounded px-2 py-1 text-center transition-all",
        isSelected ? "ring-2 ring-white" : "hover:opacity-80"
      )}
      style={{ backgroundColor: `${color}65` }}
    >
      <p className="w-full text-center font-mono text-base" style={{ color }}>
        {label}
      </p>
    </button>
  );
};

const CalendarCalendarSection = ({ data, events }: CalendarCalendarSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", searchQuery);
    router.push(`?${params.toString()}`);

    const today = new Date();

    const matchedEvents = events
      .filter((event) => (event.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()))
      .filter((event) => {
        const { year, month } = event.startDateDetails ?? {};
        if (!year || !month) return false;
        const eventDate = new Date(parseInt(year), parseInt(month) - 1);
        return eventDate >= today;
      });

    if (matchedEvents.length > 0) {
      const closestEvent = matchedEvents[0];

      const { year, month } = closestEvent.startDateDetails!;
      setSelectedDate(new Date(parseInt(year), parseInt(month) - 1, 1));
    }
  };

  const today = new Date();
  const formatted = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const legends = data.tags.map((tag) => {
    const tagsColor: TagsColorMap = data.tagsColor;
    const tagKey = tag.slug.split("-");
    const color = tagsColor?.[tagKey[0]] ?? "#0085FF";

    return {
      id: tag.id,
      label: tag.name,
      slug: tag.slug.toLowerCase(),
      color,
    };
  });

  const legendColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    legends.forEach((legend) => {
      map[legend.slug] = legend.color;
    });
    return map;
  }, [legends]);

  const eventsByDay = useMemo(() => {
    const grouped: Record<
      string,
      {
        title: string;
        tagLabel: string;
        color: string;
        textColor: string;
      }[]
    > = {};

    events.forEach((event) => {
      if (!event.startDate || !event.endDate) return;

      const isoStart = event.startDate.replace(" ", "T");
      const isoEnd = event.endDate.replace(" ", "T");

      const start = DateTime.fromISO(isoStart).setZone("Asia/Bangkok");
      const end = DateTime.fromISO(isoEnd).setZone("Asia/Bangkok");

      const tag = event.tags?.[0];
      const slug = tag?.slug?.toLowerCase() ?? "function";
      const color = legendColorMap[slug] ?? "#0085FF";

      // List all days between start and end
      let current = start.startOf("day");
      const endDay = end.startOf("day").plus({ days: 1 });

      while (current < endDay) {
        const dateKey = current.toFormat("yyyy-MM-dd");
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push({
          title: event.title ?? "Untitled Event",
          tagLabel: tag?.name ?? "No Tag",
          color: `${color}60`,
          textColor: color,
        });

        current = current.plus({ days: 1 });
      }
    });

    return grouped;
  }, [events, legendColorMap]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  // Handle tag selection and navigate to first upcoming event with selected tag
  useEffect(() => {
    const selectedTags = searchParams.getAll("tags");
    const today = new Date();

    if (selectedTags.length > 0) {
      const selectedTagId = parseInt(selectedTags[0]);

      // Find the first upcoming event with the selected tag
      const upcomingEventsWithTag = events
        .filter((event) => {
          // Check if event has the selected tag
          const hasSelectedTag = event.tags?.some((tag) => tag.id === selectedTagId);
          if (!hasSelectedTag) return false;

          // Check if event is upcoming
          const { year, month, day } = event.startDateDetails ?? {};
          if (!year || !month || !day) return false;

          const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return eventDate >= today;
        })
        .sort((a, b) => {
          // Sort by date to get the earliest upcoming event
          const aDate = new Date(
            parseInt(a.startDateDetails?.year || "0"),
            parseInt(a.startDateDetails?.month || "1") - 1,
            parseInt(a.startDateDetails?.day || "1")
          );
          const bDate = new Date(
            parseInt(b.startDateDetails?.year || "0"),
            parseInt(b.startDateDetails?.month || "1") - 1,
            parseInt(b.startDateDetails?.day || "1")
          );
          return aDate.getTime() - bDate.getTime();
        });

      if (upcomingEventsWithTag.length > 0) {
        const firstEvent = upcomingEventsWithTag[0];
        const { year, month } = firstEvent.startDateDetails!;
        const eventDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        setSelectedDate(eventDate);
      }
    } else {
      // If no tags are selected, go to current month
      setSelectedDate(today);
    }
  }, [searchParams, events]);

  const handleDateChange = (date?: Date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const RenderFooter = ({ navBox, isMobile }: { navBox: CalendarNavBoxJson[]; isMobile?: boolean }) => {
    return (
      <div className="flex flex-col gap-9 lg:gap-13">
        <div
          className="flex flex-col items-center justify-between gap-8 p-6 md:px-13 md:py-8 lg:flex-row lg:gap-0 xl:items-start"
          style={{
            backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='white' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
            borderRadius: 16,
          }}
        >
          <p className="min-w-36 text-xl font-semibold text-white">{`${data.tagsLegendTitle} :`}</p>
          <div className="flex w-full flex-row flex-wrap justify-center gap-4 2xl:justify-end">
            {data.tags &&
              legends.map((e, index) => (
                <RenderLegends key={index} color={e.color} id={e.id ?? index} label={e.label} />
              ))}
          </div>
        </div>

        <div
          className={cn(
            "gap-6 lg:gap-5",
            navBox.length > 1 ? "grid grid-cols-1 lg:grid-cols-2" : "flex justify-center"
          )}
        >
          {navBox.map((e, index) => (
            <ContactBanner
              key={`c-banner-${index}`}
              buttonText={e?.buttonLabel ?? ""}
              buttonHref={e?.buttonUrl ?? ""}
              className="md:rounded-full"
              customRx={isMobile ? 24 : 64}
            >
              <div className="flex flex-col gap-1 text-center md:text-start">
                <p className="font-mono text-base/[1.625rem] font-bold">{e?.title}</p>
                <p className="font-mono text-base/[1.625rem]">{e?.subtitle}</p>
              </div>
            </ContactBanner>
          ))}
        </div>
      </div>
    );
  };

  const CalendarBoxMobile = ({ selectedDate }: { selectedDate?: Date }) => {
    const today = new Date();

    const startOfMonth = useMemo(
      () =>
        new Date(selectedDate?.getFullYear() ?? today.getFullYear(), selectedDate?.getMonth() ?? today.getMonth(), 1),
      [selectedDate]
    );

    const endOfMonth = useMemo(
      () =>
        new Date(
          selectedDate?.getFullYear() ?? today.getFullYear(),
          (selectedDate?.getMonth() ?? today.getMonth()) + 1,
          0
        ),
      [selectedDate]
    );

    const daysInMonth = endOfMonth.getDate();

    const dayName = (date: Date) => date.toLocaleString("en-US", { weekday: "short" }).toUpperCase();

    return (
      <div className="mt-8 mb-32 max-h-[500px] overflow-y-auto rounded-[20px] bg-white md:mt-15 md:mb-40">
        <div className="flex w-full flex-col divide-y divide-gray-100 px-4 py-2">
          {[...Array(daysInMonth)].map((_, i) => {
            const date = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1);
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return (
              <div key={i} className="flex flex-col gap-2 py-4">
                {/* Date + Day */}
                <div className="flex items-center gap-4">
                  <div className="flex min-w-[48px] flex-col items-center">
                    <div className={cn("flex rounded-full px-2 py-1", isToday ? "bg-[#0085FF]" : "bg-transparent")}>
                      <span className={cn("text-base font-bold", isToday ? "text-white" : "text-primary-400")}>
                        {date.getDate()}
                      </span>
                    </div>

                    <span className="text-[12px] text-neutral-300">{dayName(date)}</span>
                  </div>
                </div>

                {/* Events */}
                <div className="ml-12 flex flex-col gap-2">
                  {eventsByDay[formatCalendarDateKey(date)]?.map((event, idx) => (
                    <div
                      key={idx}
                      className="rounded px-3 py-2 text-sm"
                      style={{
                        backgroundColor: event.color,
                        color: event.textColor,
                      }}
                    >
                      <p className="font-semibold">{event.title}</p>
                      {/* <p className="text-xs">{event.tagLabel}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CalendarBox = ({ selectedDate }: { selectedDate?: Date }) => {
    const today = new Date();

    const startOfMonth = new Date(
      selectedDate?.getFullYear() ?? today.getFullYear(),
      selectedDate?.getMonth() ?? today.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate?.getFullYear() ?? today.getFullYear(),
      (selectedDate?.getMonth() ?? today.getMonth()) + 1,
      0
    );
    const daysInMonth = endOfMonth.getDate();
    const startDay = startOfMonth.getDay();

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateDays = () => {
      const days = [];

      for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="min-h-[200px] text-gray-400" />);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), d);
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;
        // const dayEvents = eventsByDateMap.get(dateKey) ?? [];

        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        days.push(
          <div key={d} className="flex min-h-[200px] w-full flex-col gap-1 p-2 text-start font-mono text-[#0E2C59]">
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                  isToday ? "bg-[#0085FF] text-white" : "text-primary-400"
                )}
              >
                {d}
              </div>
            </div>

            {eventsByDay[formatCalendarDateKey(date)]?.map((event, index) => (
              <div
                key={index}
                className="w-full rounded-[4px] px-2 py-1 text-xs"
                style={{
                  backgroundColor: event.color,
                  color: event.textColor,
                }}
              >
                <p className="font-semibold">{event.title}</p>
                {/* <p className="text-[10px]">{event.tagLabel}</p> */}
              </div>
            ))}
          </div>
        );
      }

      return days;
    };

    return (
      <div className="mt-8 mb-32 rounded-[20px] bg-white md:mt-15 md:mb-40">
        {/* Header */}
        <div className="grid grid-cols-7 text-center font-semibold">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={cn(
                "flex min-h-11 w-full items-center justify-start border-x-1 border-gray-200 bg-[#F8F9FC] pl-2 font-mono font-normal text-[#969696]",
                index == 0 && "rounded-tl-[20px]",
                index == weekDays.length - 1 && "rounded-tr-[20px]"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="grid grid-cols-7">
          {generateDays().map((day, i, arr) => {
            const totalCells = arr.length;
            const lastRowStart = totalCells - (totalCells % 7 || 7);
            const isBottomLeft = i === lastRowStart;
            const isBottomRight = i === totalCells - 1 && (i + 1) % 7 === 0;

            return (
              <div
                key={i}
                className={cn(
                  "border border-gray-200 p-1 hover:bg-blue-100",
                  isBottomLeft && "rounded-bl-[20px]",
                  isBottomRight && "rounded-br-[20px]"
                )}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <SectionContainer sectionClassName="pt-52">
      <div className="flex flex-col items-center gap-10 pb-10 md:gap-14 md:pb-13">
        <h1 className="text-primary-400 w-full text-center text-[32px]/[32px] font-semibold md:max-w-[600px] md:text-[62px]/[70px]">
          {data.title}
        </h1>
        <div className="flex flex-row">
          <InputWithIcon
            startIcon={Search}
            type="text"
            className="mr-1 w-full rounded-full bg-white md:mr-2 lg:min-w-lg xl:min-w-2xl"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={data.search.placeholder || "Search (e.g. Winter Break)"}
          />
          <ButtonWithIcons
            endIcon={Send}
            className="mr-1 max-md:has-[>svg]:pl-1.5 md:mr-8"
            iconClass="max-md:border-none max-md:p-2 size-9 transform rounded-full border border-dashed border-white p-[10px] transition-all group-hover/button:rotate-45"
            showIcon
            onClick={handleSearch}
          >
            {!isMobile && data.search.button.buttonLabel}
          </ButtonWithIcons>
          <CalendarFilterDropdown
            tags={data.tags}
            filterLabel={(!isMobile && data.search.filterLabel) || ""}
            allLabel={data.search.filterAllLabel}
            minWidth="200px"
          />
        </div>
      </div>

      <div className="relative w-full max-w-screen rounded-4xl">
        <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full rotate-180">
          <SubstractBackground
            height="154px"
            backgroundColor="#0E2C59"
            topAreaClassName="h-[800px] sm:h-[730px] md:h-[550px] lg:h-[350px]  2xl:h-[300px]"
          />
        </div>

        <div className="flex flex-col rounded-[50px] p-14">
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col">
              <p className="text-xl/[26px] text-[#45A9E0] max-lg:text-center">{data.todayTitle}</p>
              <p className="text-[32px] text-white md:text-[44px]">{formatted}</p>
            </div>
            <div className="flex h-full w-full flex-row gap-4 pt-8 md:w-fit md:pt-0">
              <div className="flex size-12 items-center">
                <NavigationRoundedButton
                  navigationName="date-picker"
                  direction="prev"
                  onClick={() => {
                    const prevMonth = new Date(
                      selectedDate?.getFullYear() ?? today.getFullYear(),
                      (selectedDate?.getMonth() ?? today.getMonth()) - 1,
                      1
                    );
                    setSelectedDate(prevMonth);
                  }}
                />
              </div>
              <DatePickerWithPopover
                selected={selectedDate}
                onSelect={handleDateChange}
                placeholder={selectedDate?.toLocaleString("en-US", { month: "short" })}
              />
              <div className="flex size-12 items-center">
                <NavigationRoundedButton
                  navigationName="date-picker"
                  direction="next"
                  onClick={() => {
                    const nextMonth = new Date(
                      selectedDate?.getFullYear() ?? today.getFullYear(),
                      (selectedDate?.getMonth() ?? today.getMonth()) + 1,
                      1
                    );
                    setSelectedDate(nextMonth);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <CalendarBox selectedDate={selectedDate} />
          </div>
          <div className="block lg:hidden">
            <CalendarBoxMobile selectedDate={selectedDate} />
          </div>
          <RenderFooter navBox={data.navBox} isMobile={isMobile} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default CalendarCalendarSection;
