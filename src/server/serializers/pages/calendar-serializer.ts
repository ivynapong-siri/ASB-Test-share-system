import {
  CalendarEventTagJson,
  WordPressCalendarEventJson,
  WordPressCalendarNavBoxJson,
  WordPressPostCalendarJson,
  WordPressTagsColorJson,
} from "@/server/types/wordpress/calendar-type";

export type CalendarJson = ReturnType<typeof serializeCalendar>;
export type CalendarEventJson = ReturnType<typeof serializeCalendarEvent>;
export type CalendarNavBoxJson = ReturnType<typeof serializeNavBox>;
export type CalendarTagJson = ReturnType<typeof serializeTag>;
export type TagsColorMap = Record<string, string>;

export const serializeCalendar = (data: WordPressPostCalendarJson) => {
  return {
    title: data.acf.title,
    description: data.acf.description,
    todayTitle: data.acf.today_title,
    search: {
      placeholder: data.acf.search.placeholder,
      button: {
        buttonLabel: data.acf.search.button.button_label,
        buttonUrl: data.acf.search.button.button_url,
      },
      filterLabel: data.acf.search.filter_label,
      filterAllLabel: data.acf.search.filter_all_label,
    },
    tagsLegendTitle: data.acf.tags_legend_title,
    tags: data.acf.tags && data.acf.tags.map((e) => serializeTag(e)),
    tagsColor: data.acf.tags_color && serializeTagsColor(data.acf.tags_color),
    navBox: data.acf.nav_boxes && data.acf.nav_boxes.map((e) => serializeNavBox(e)),
  };
};

const serializeTagsColor = (data: WordPressTagsColorJson) => {
  return {
    function: data.function,
    holiday: data.holiday,
    exams: data.exams,
    openToPublic: data.open_to_public,
    off: data.off,
  };
};

const serializeNavBox = (data: WordPressCalendarNavBoxJson) => {
  return {
    title: data.title,
    subtitle: data.subtitle,
    buttonLabel: data.button.button_label,
    buttonUrl: data.button.button_url,
  };
};

export const serializeCalendarEvents = (data: WordPressCalendarEventJson[]) => {
  return data.map((e) => serializeCalendarEvent(e));
};

export const serializeCalendarEvent = (data: WordPressCalendarEventJson) => {
  return {
    title: data.title,
    description: data.description,
    startDate: data.start_date,
    startDateDetails: {
      year: data.start_date_details.year,
      month: data.start_date_details.month,
      day: data.start_date_details.day,
      hour: data.start_date_details.hour,
      minutes: data.start_date_details.minutes,
      seconds: data.start_date_details.seconds,
    },
    endDate: data.end_date,
    endDateDetails: {
      year: data.end_date_details.year,
      month: data.end_date_details.month,
      day: data.end_date_details.day,
      hour: data.end_date_details.hour,
      minutes: data.end_date_details.minutes,
      seconds: data.end_date_details.seconds,
    },
    utcStartDate: data.utc_start_date,
    utcStartDateDetails: {
      year: data.utc_start_date_details.year,
      month: data.utc_start_date_details.year,
      day: data.utc_start_date_details.year,
      hour: data.utc_start_date_details.year,
      minutes: data.utc_start_date_details.year,
      seconds: data.utc_start_date_details.year,
    },
    utcEndDate: data.utc_end_date,
    categories: data.categories,
    tags: data.tags && data.tags.map((e) => serializeTag(e)),
  };
};

const serializeTag = (data: CalendarEventTagJson) => {
  return {
    id: data.id ? data.id : data.term_id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    urls: data.urls && {
      self: data.urls.self,
      collection: data.urls.collection,
    },
  };
};
