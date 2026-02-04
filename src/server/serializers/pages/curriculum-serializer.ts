import { WordPressSectionJson, WordPressSectionWithTabsJson } from "@/server/types/wordpress-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { WordPressCurriculumPageJson } from "@/server/types/wordpress/curriculum-type";
import { serializeNavBox } from "../nav-box-serializer";

export type CurriculumPageJson = ReturnType<typeof serializeCurriculumPage>;

export const serializeCurriculumPage = (data: WordPressCurriculumPageJson) => {
  const serializeSectionData = (section: WordPressSectionJson | WordPressSectionWithTabsJson) =>
    section.post_type === "section-with-tabs"
      ? serializeSectionWithTab(section as WordPressSectionWithTabsJson)
      : serializeSection(section as WordPressSectionJson);

  return {
    mainBanner: data.main_banner,
    breadcrumbs1: data.breadcrumbs_1,
    breadcrumbs2: data.breadcrumbs_2,
    breadcrumbs3: data.breadcrumbs_3,
    mainBannerMobile: data.main_banner_mobile,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    buttonLabel: data.button?.button_label ?? null,
    name: data.name ?? null,
    image: data.image ?? null,
    ribbonText: data.ribbon_text ?? null,
    buttonUrl: data.button?.button_url ?? null,
    sections: data.section?.length > 0 ? data.section.map(serializeSectionData) : null,
    navBox1: data.nav_box_1 ? serializeNavBox(data.nav_box_1) : null,
    jotFormId: data.jotform_id ?? null,
  };
};
