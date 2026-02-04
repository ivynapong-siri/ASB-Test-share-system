import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { WordPressPostHomeJson } from "@/server/types/wordpress/home-type";

export type HomeJson = ReturnType<typeof serializeHome>;

export const serializeHome = (data: WordPressPostHomeJson) => {
  return {
    mainHomeBackground: data.main_home_background,
    mainName1: data.main_name_1,
    mainName2: data.main_name_2,
    highlightText: data.highlight_text,
    heroBannerHomePage: data.hero_banner_homepage,
    homeBannerBackgroundMobile: data.home_banner_background_mobile,
    buttonLabel: data.button_label,
    buttonUrl: data.button_url,
    section: data.section.map((section) =>
      section.post_type === "section-with-tabs" ? serializeSectionWithTab(section as any) : serializeSection(section)
    ),
  };
};
