import { WordPressSectionJson, WordPressSectionWithTabsJson } from "@/server/types/wordpress-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { WordPressAboutUsPageJson } from "@/server/types/wordpress/about-us-type";
import { isObject } from "@/server/utils/helpers";
import { serializeImage } from "../image-serializer";

export type AboutUsPageJson = ReturnType<typeof serializeAboutUsPage>;

export const serializeAboutUsPage = (data: WordPressAboutUsPageJson) => {
  const serializeSectionData = (section: WordPressSectionJson | WordPressSectionWithTabsJson) =>
    section.post_type === "section-with-tabs"
      ? serializeSectionWithTab(section as WordPressSectionWithTabsJson)
      : serializeSection(section as WordPressSectionJson);
  const image = isObject(data.image) ? serializeImage(data.image) : data.image;

  return {
    breadcrumbs1: data.breadcrumbs_1,
    breadcrumbs2: data.breadcrumbs_2,
    breadcrumbs3: data.breadcrumbs_3,
    mainBanner: data.main_banner,
    mainBannerMobile: data.main_banner_mobile,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    buttonLabel: data.button?.button_label ?? null,
    name: data.name ?? null,
    image: image,
    signatureImage: data.signature_image ?? null,
    firstParagraph: data.first_paragraph ?? null,
    contentParagraph: data.content_paragraph ?? null,
    lastParagraph: data.last_paragraph ?? null,
    position: data.position ?? null,
    ribbonText: data.ribbon_text ?? null,
    buttonUrl: data.button?.button_url ?? null,
    sections: data.section?.length > 0 ? data.section.map(serializeSectionData) : null,
  };
};
