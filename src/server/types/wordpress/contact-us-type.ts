import { WordPressNavBoxJson } from "../wordpress-type";

export type WordPressContactUsPageJson = {
  header_title: string;
  header_description: string;
  main_banner: string;
  main_banner_mobile: string;
  ribbon_text: string;
  jotform_id: string;
  title: string;
  description: string;
  google_map_url: string;
  nav_box_1: WordPressNavBoxJson;
  contact_setting: {
    title: string;
    title_2: string;
    contact: {
      id: number;
      title: string;
      type: string;
      acf_fields: {
        phone_label: string;
        phone_number: string;
        admission_hotline_label: string;
        admission_hotline_number: string;
        email_label: string;
        email: string;
        address_name: string;
        address_label: string;
        address: string;
        google_map: boolean;
        google_map_url: string;
      };
    };
  };
};
