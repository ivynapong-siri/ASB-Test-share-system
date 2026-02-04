import {
  WordPressAdmissionKeyDateAcfJson,
  WordPressFAQJson,
  WordPressImageJson,
  WordPressNavBoxJson,
  WordPressSectionJson,
  WordPressSectionWithTabsJson,
  WordPressTuitionAndFeesDataJson,
} from "../wordpress-type";

export type WordPressAdmissionPageJson = WordPressTuitionAndFeesDataJson &
  WordPressAdmissionKeyDateAcfJson & {
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
    position: string;
    description: string;
    signature_image: string;
    ribbon_text: string;
    title: string;
    faqs: WordPressFAQJson;
    nav_box_2: WordPressNavBoxJson;
    nav_box_1: WordPressNavBoxJson;
    section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
    breadcrumbs_1: string;
    breadcrumbs_2: string;
    age_guidelines_title?: string;
    application_fees?: { title?: string; description?: string };
    age_guidelines_table?: any[];
    application_fees_table?: any[];
  };

export type WordPressApplicationPortalPageJson = {
  title_1: string;
  title_2: string;
  description: string;
  ribbon_text: string;
  button_label: string;
  button_url: string;
  image: WordPressImageJson;
  instructions_1: string;
  instructions_2: string;
  instructions_3: string;
  instruction_desc_1: string;
  instruction_desc_2: string;
  instruction_desc_3: string;
  instruction_end: string;
};
