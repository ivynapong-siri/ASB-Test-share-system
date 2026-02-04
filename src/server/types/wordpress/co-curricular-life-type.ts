import { WordPressNavBoxJson, WordPressSectionJson, WordPressSectionWithTabsJson } from "../wordpress-type";

export type WordPressCoCurricularLifePageJson = {
  header_title: string;
  header_description: string;
  button: {
    button_label: string;
    button_url: string;
  };
  main_banner: string;
  main_banner_mobile: string;
  image: string;
  name: string;
  last_paragraph: string;
  ribbon_text: string;
  section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
  nav_box_1: WordPressNavBoxJson;
  detail_button: { button_label: string; button_url: string };
  other_carousel_label: string;
  breadcrumbs_1: string;
  breadcrumbs_2: string;
};
