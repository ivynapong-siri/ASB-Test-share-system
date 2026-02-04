import { WordPressSectionJson, WordPressSectionWithTabsJson } from "@/server/types/wordpress-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { WordPressCoCurricularLifePageJson } from "@/server/types/wordpress/co-curricular-life-type";
import { serializeNavBox } from "../nav-box-serializer";

export type CoCurricularLifeJson = ReturnType<typeof serializeCoCurricularLife>;

export const serializeCoCurricularLife = (data: WordPressCoCurricularLifePageJson) => {
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
    name: data.name ?? null,
    image: data.image ?? null,
    lastParagraph: data.last_paragraph ?? null,
    ribbonText: data.ribbon_text ?? null,
    buttonUrl: data.button?.button_url ?? null,
    sections: data.section?.length > 0 ? data.section.map(serializeSectionData) : null,
    navBox1: data.nav_box_1 ? serializeNavBox(data.nav_box_1) : null,
    newsCardButtonLabel: data.detail_button && data.detail_button.button_label,
    newsCardButtonUrl: data.detail_button && data.detail_button.button_url,
    otherCarouselLabel: data.other_carousel_label,
  };
};
