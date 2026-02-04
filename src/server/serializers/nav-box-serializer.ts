import { WordPressNavBoxJson } from "../types/wordpress-type";

export type NavBoxJson = ReturnType<typeof serializeNavBox>;

export const serializeNavBox = (data: WordPressNavBoxJson) => {
  return {
    title: data.title,
    subtitle: data.subtitle,
    buttonLabel: data.button_label,
    buttonUrl: data.button_url,
  };
};
