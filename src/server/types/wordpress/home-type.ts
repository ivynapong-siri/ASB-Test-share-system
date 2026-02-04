import { WordPressSectionJson } from "../wordpress-type";

export type WordPressPostHomeJson = {
  main_home_background: string;
  section: WordPressSectionJson[];
  main_name_1: string;
  main_name_2: string;
  highlight_text: string;
  button_label: string;
  button_url: string;
  hero_banner_homepage: string;
  home_banner_background_mobile: string;
};
