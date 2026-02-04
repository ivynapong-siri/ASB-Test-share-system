import {
  WordPressNavBoxJson,
  WordPressSectionJson,
  WordPressSectionWithTabsJson,
  WordPressTuitionAndFeesDataJson,
} from "../wordpress-type";

export type WordPressCurriculumPageJson = WordPressTuitionAndFeesDataJson & {
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
  ribbon_text: string;
  section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
  nav_box_1: WordPressNavBoxJson;
  jotform_id: string;
  breadcrumbs_1: string;
  breadcrumbs_2: string;
  breadcrumbs_3: string;
};
