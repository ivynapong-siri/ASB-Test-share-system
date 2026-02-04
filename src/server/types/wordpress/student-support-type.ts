import { WordPressSectionJson, WordPressSectionWithTabsJson } from "../wordpress-type";

export type WordPressSchoolBusRouteJson = {
  ribbon_text: string;
  title: string;
  description: string;
  table: {
    header: {
      header_1: string;
      header_2: string;
      header_3: string;
    };
    row_1: WordPressBusRouteRowJson;
    row_2: WordPressBusRouteRowJson;
    row_3: WordPressBusRouteRowJson;
    row_4: WordPressBusRouteRowJson;
    row_5: WordPressBusRouteRowJson;
    row_6: WordPressBusRouteRowJson;
    row_7: WordPressBusRouteRowJson;
    row_8: WordPressBusRouteRowJson;
  };
};

export type WordPressBusRouteRowJson = {
  bus_number: string;
  region_1: string;
  region_2: string;
};

export type WordPressStudentSupportJson = {
  header_title: string;
  header_description: string;
  button: {
    button_label: string;
    button_url: string;
  };
  main_banner: string;
  main_banner_mobile: string;
  school_bus_route: WordPressSchoolBusRouteJson | null;
  section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
  breadcrumbs_1: string;
  breadcrumbs_2: string;
};
