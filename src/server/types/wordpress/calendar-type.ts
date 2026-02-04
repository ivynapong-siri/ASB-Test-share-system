export type WordPressPostCalendarJson = {
  acf: {
    title: string;
    tags_legend_title: string;
    description: string;
    today_title: string;
    search: {
      placeholder: string;
      button: {
        button_label: string;
        button_url: string;
      };
      filter_label: string;
      filter_all_label: string;
    };
    tags: CalendarEventTagJson[];
    tags_color: WordPressTagsColorJson;
    nav_boxes: WordPressCalendarNavBoxJson[];
  };
};

export type WordPressTagsColorJson = {
  function: string;
  holiday: string;
  exams: string;
  open_to_public: string;
  off: string;
};

export type WordPressCalendarNavBoxJson = {
  title: string;
  subtitle: string;
  button: {
    button_label: string;
    button_url: string;
  };
};

export type WordPressCalendarEventsJson = {
  events: WordPressCalendarEventJson[];
};

export type WordPressCalendarEventJson = {
  title: string;
  description: string;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  utc_start_date: string;
  utc_start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  utc_end_date: string;
  categories: string[];
  tags: CalendarEventTagJson[];
};

export type CalendarEventTagJson = {
  term_id?: number;
  name: string;
  slug: string;
  description: string;
  id?: number;
  urls?: {
    self: string;
    collection: string;
  };
};
