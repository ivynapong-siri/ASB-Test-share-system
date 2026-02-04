import { WordPressImageJson, WordPressSectionJson, WordPressSectionWithTabsJson } from "../wordpress-type";

export type WordPressAboutUsPageJson = {
  header_title: string;
  header_description: string;
  button: {
    button_label: string;
    button_url: string;
  };
  main_banner: string;
  main_banner_mobile: string;
  image: string | WordPressImageJson | false;
  name: string;
  position: string;
  first_paragraph: string;
  content_paragraph: string;
  last_paragraph: string;
  signature_image: string;
  ribbon_text: string;
  section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
  breadcrumbs_1: string;
  breadcrumbs_2: string;
  breadcrumbs_3: string;
};
