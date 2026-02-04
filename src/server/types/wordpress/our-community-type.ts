import { WordPressNavBoxJson, WordPressSectionJson, WordPressSectionWithTabsJson } from "../wordpress-type";

export type WordPressOurCommunityPageJson = {
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
  nav_box_2: WordPressNavBoxJson;
  latest_news: WordPressLatestNewsFilterJson;
  filter_by: WordPressFilterByJson[];
  detail_button?: {
    button_label?: string;
    button_url?: string;
  };
  other_carousel_label?: string;
  breadcrumbs_1: string;
  breadcrumbs_2: string;
};

export type WordPressLatestNewsFilterJson = {
  title: string;
  category_label: string;
  filter_label: string;
  news_type_label: {
    all: string;
    news: string;
    article: string;
    event: string;
  };
};

export type WordPressFilterByJson = {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
};
