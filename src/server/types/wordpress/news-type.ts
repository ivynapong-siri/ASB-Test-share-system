import { WordPressImageJson, WordPressNewsGroupGalleriesJson, WordPressNewsHashtags } from "../wordpress-type";

export type WordPressNewsJson = {
  header_title: string;
  header_description: string;
  button: {
    button_label: string;
    button_url: string;
  };
  breadcrumbs_1: string;
  breadcrumbs_2: string;
  breadcrumbs_3: string;
  ribbon_text: string;
  badge: string;
  title: string;
  description: string;
  image: WordPressImageJson;
  image_2: WordPressImageJson;
  date: string;
  hashtags: WordPressNewsHashtags[];
  galleries: WordPressNewsGroupGalleriesJson[];
  subcategory: string;
  elementor_link: string;
  news_type: string;
  shared_banner?: {
    title: string;
    button_label: string;
  };
  shared_modal_data?: {
    title: string;
    description: string;
    copy_button_label?: string;
    copy_to_clipboard_label?: string;
  };
};
