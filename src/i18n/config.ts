import { Formats } from "next-intl";
import { DayPicker } from "react-day-picker";

export const defaultLocale = "en";
export const supportedLocales = ["en", "th", "zh-hans", "ja", "ko"];

export const i18nFormats: Record<string, Partial<Formats>> = {
  en: {
    dateTime: {
      medium: { dateStyle: "medium", timeStyle: "medium", hour12: true },
      dateOnly: { dateStyle: "medium" },
    },
    number: {
      price: { currency: "USD", currencyDisplay: "narrowSymbol", style: "currency" },
    },
  },
  th: {
    dateTime: {
      medium: { dateStyle: "medium", timeStyle: "medium", hour12: false },
      dateOnly: { dateStyle: "medium" },
    },
    number: {
      price: { currency: "THB", currencyDisplay: "narrowSymbol", style: "currency" },
    },
  },
};

export const calendarLocale: Record<string, Partial<React.ComponentProps<typeof DayPicker>>> = {
  en: {
    formatters: {
      formatCaption: (date: Date) => date.toLocaleString("en", { month: "long", year: "numeric" }),
      formatDay: (date: Date) => date.toLocaleString("en", { day: "numeric" }),
      formatWeekdayName: (date: Date) => date.toLocaleString("en", { weekday: "short" }),
    },
  },
  th: {
    formatters: {
      formatCaption: (date: Date) => date.toLocaleString("th", { month: "long", year: "numeric" }),
      formatDay: (date: Date) => date.toLocaleString("th", { day: "numeric" }),
      formatWeekdayName: (date: Date) => date.toLocaleString("th", { weekday: "short" }),
    },
  },
};
