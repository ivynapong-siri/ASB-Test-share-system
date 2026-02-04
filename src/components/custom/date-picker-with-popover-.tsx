"use client";

import * as React from "react";

import { enUS, th } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateTime } from "luxon";
import { useLocale } from "next-intl";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selected?: Date | Date[];
};

const localeMap = {
  en: enUS,
  th: th,
};

function CalendarDropdown({
  displayMonth,
  displayYear,
  onChangeMonth,
  onChangeYear,
}: {
  displayMonth: Date;
  displayYear: number;
  onChangeMonth: (date: Date) => void;
  onChangeYear: (year: number) => void;
}) {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i).sort((a, b) => b - a); // Sort descending to show newest years first

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(displayYear, i, 1);
    return {
      value: i.toString(),
      label: format(month, "MMMM", { locale: localeMap[locale as keyof typeof localeMap] }),
    };
  });

  return (
    <div className="flex items-center justify-center gap-1 pt-1">
      <Select
        value={displayMonth.getMonth().toString()}
        onValueChange={(value) => {
          const newDate = new Date(displayMonth);
          newDate.setMonth(parseInt(value));
          onChangeMonth(newDate);
        }}
      >
        <SelectTrigger className="h-7 w-[110px]">
          <SelectValue>
            {format(displayMonth, "MMMM", { locale: localeMap[locale as keyof typeof localeMap] })}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value} className="cursor-pointer">
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={displayYear.toString()}
        onValueChange={(value) => {
          onChangeYear(parseInt(value));
        }}
      >
        <SelectTrigger className="h-7 w-[80px]">
          <SelectValue>{displayYear}</SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()} className="cursor-pointer">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  defaultMonth,
  index = 0,
  ...props
}: CalendarProps & { index?: number }) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    if (props.selected instanceof Date) {
      return props.selected;
    }
    if (Array.isArray(props.selected) && props.selected[0]) {
      const selectedDate = props.selected[0];
      if (selectedDate instanceof Date) {
        return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + index, 1);
      }
      return new Date();
    }
    if (defaultMonth) {
      return new Date(defaultMonth.getFullYear(), defaultMonth.getMonth() + index, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + index, 1);
  });

  const [currentYear, setCurrentYear] = React.useState<number>(() => currentMonth.getFullYear());

  React.useEffect(() => {
    if (props.selected instanceof Date) {
      const newDate = new Date(props.selected);
      newDate.setMonth(newDate.getMonth() + index);
      setCurrentMonth(newDate);
      setCurrentYear(newDate.getFullYear());
    } else if (Array.isArray(props.selected) && props.selected[0] instanceof Date) {
      const newDate = new Date(props.selected[0]);
      newDate.setMonth(newDate.getMonth() + index);
      setCurrentMonth(newDate);
      setCurrentYear(newDate.getFullYear());
    }
  }, [props.selected, index]);

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
    props.onMonthChange?.(newMonth);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentYear(year);
    setCurrentMonth(newDate);
    props.onMonthChange?.(newDate);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      locale={localeMap[props.locale as unknown as keyof typeof localeMap] || enUS}
      month={currentMonth}
      defaultMonth={defaultMonth}
      onMonthChange={handleMonthChange}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className={cn("h-4 w-4", className)} {...props} />;
          }
          return <ChevronRight className={cn("h-4 w-4", className)} {...props} />;
        },
        MonthCaption: () => (
          <CalendarDropdown
            displayMonth={currentMonth}
            displayYear={currentYear}
            onChangeMonth={handleMonthChange}
            onChangeYear={handleYearChange}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

interface DatePickerWithPopoverProps {
  selected?: Date;
  onSelect: (date?: Date) => void;
  defaultMonth?: Date;
  showOutsideDays?: boolean;
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  formatters?: Record<string, any>;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePickerWithPopover({
  selected,
  onSelect,
  defaultMonth,
  showOutsideDays,
  captionLayout,
  formatters,
  disabled = false,
  placeholder = "Pick a date",
}: DatePickerWithPopoverProps) {
  const locale = useLocale();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          className={cn(
            "bg-muted text-primary h-12 w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? DateTime.fromJSDate(selected).toFormat("LLLL", { locale }) : <span>{placeholder}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          defaultMonth={defaultMonth}
          showOutsideDays={showOutsideDays}
          captionLayout={captionLayout}
          formatters={formatters}
        />
      </PopoverContent>
    </Popover>
  );
}
