import { WordPressSectionJson, WordPressSectionWithTabsJson } from "@/server/types/wordpress-type";
import {
  WordPressBusRouteRowJson,
  WordPressSchoolBusRouteJson,
  WordPressStudentSupportJson,
} from "@/server/types/wordpress/student-support-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

export type StudentSupportJson = ReturnType<typeof serializeStudentSupportPage>;
export type SchoolBusRouteJson = ReturnType<typeof serializeSchoolBusRoute>;
export type BusRouteRowJson = ReturnType<typeof serializeBusRouteRow>;

export const serializeStudentSupportPage = (data: WordPressStudentSupportJson) => {
  const serializeSectionData = (section: WordPressSectionJson | WordPressSectionWithTabsJson) =>
    section.post_type === "section-with-tabs"
      ? serializeSectionWithTab(section as WordPressSectionWithTabsJson)
      : serializeSection(section as WordPressSectionJson);

  return {
    mainBanner: data.main_banner,
    breadcrumbs1: data.breadcrumbs_1,
    breadcrumbs2: data.breadcrumbs_2,
    mainBannerMobile: data.main_banner_mobile,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    buttonLabel: data.button?.button_label ?? null,
    sections: data.section && data.section.length > 0 ? data.section.map(serializeSectionData) : null,
    schoolBusRoute: data.school_bus_route ? serializeSchoolBusRoute(data.school_bus_route) : null,
  };
};

export const serializeSchoolBusRoute = (data: WordPressSchoolBusRouteJson) => {
  return {
    ribbonText: data.ribbon_text ?? null,
    title: data.title ?? null,
    description: data.description ?? null,
    table: data.table
      ? {
          header: data.table.header ? serializeHeaderBusRouteRow(data.table.header) : null,
          row1: data.table.row_1 ? serializeBusRouteRow(data.table.row_1) : null,
          row2: data.table.row_2 ? serializeBusRouteRow(data.table.row_2) : null,
          row3: data.table.row_3 ? serializeBusRouteRow(data.table.row_3) : null,
          row4: data.table.row_4 ? serializeBusRouteRow(data.table.row_4) : null,
          row5: data.table.row_5 ? serializeBusRouteRow(data.table.row_5) : null,
          row6: data.table.row_6 ? serializeBusRouteRow(data.table.row_6) : null,
          row7: data.table.row_7 ? serializeBusRouteRow(data.table.row_7) : null,
          row8: data.table.row_8 ? serializeBusRouteRow(data.table.row_8) : null,
        }
      : null,
  };
};

export const serializeBusRouteRow = (data: WordPressBusRouteRowJson) => {
  return {
    busNumber: data.bus_number ?? null,
    region1: data.region_1 ?? null,
    region2: data.region_2 ?? null,
  };
};

export const serializeHeaderBusRouteRow = (data: WordPressSchoolBusRouteJson["table"]["header"]) => {
  return {
    header1: data.header_1 ?? null,
    header2: data.header_2 ?? null,
    header3: data.header_3 ?? null,
  };
};
