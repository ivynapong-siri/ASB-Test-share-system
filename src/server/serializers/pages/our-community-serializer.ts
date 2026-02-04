import { WordPressSectionJson, WordPressSectionWithTabsJson } from "@/server/types/wordpress-type";
import {
  WordPressFilterByJson,
  WordPressLatestNewsFilterJson,
  WordPressOurCommunityPageJson,
} from "@/server/types/wordpress/our-community-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { serializeNavBox } from "../nav-box-serializer";

export type OurCommunityPageJson = ReturnType<typeof serializeOurCommunityPage>;
export type LatestNewsJson = ReturnType<typeof serializeLastNewsFilterData>;
export type NewsFilterByJson = ReturnType<typeof serializeFilterBy>;

export const serializeOurCommunityPage = (data: WordPressOurCommunityPageJson) => {
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
    ribbonText: data.ribbon_text ?? null,
    buttonUrl: data.button?.button_url ?? null,
    sections: data.section?.length > 0 ? data.section.map(serializeSectionData) : null,
    navBox1: data.nav_box_1 ? serializeNavBox(data.nav_box_1) : null,
    navBox2: data.nav_box_2 ? serializeNavBox(data.nav_box_2) : null,
    latestNews: data.latest_news ? serializeLastNewsFilterData(data.latest_news) : null,
    filterBy: data.filter_by ? data.filter_by.map((e) => serializeFilterBy(e)) : null,
    newsCardButtonLabel: data.detail_button && data.detail_button.button_label,
    newsCardButtonUrl: data.detail_button && data.detail_button.button_url,
    otherCarouselLabel: data.other_carousel_label,
  };
};

const serializeLastNewsFilterData = (data: WordPressLatestNewsFilterJson) => {
  const { all, article, event, news } = data.news_type_label;

  return {
    title: data.title,
    categoryLabel: data.category_label,
    filterLabel: data.filter_label,
    newsTypeLabel: {
      all: all,
      news: news,
      article: article,
      event: event,
    },
  };
};

const serializeFilterBy = (data: WordPressFilterByJson) => {
  return {
    id: data.term_id,
    title: data.name,
    slug: data.slug,
    termGroup: data.term_group,
    termTaxonomyId: data.term_taxonomy_id,
    taxonomy: data.taxonomy,
    description: data.description,
    parent: data.parent,
    count: data.count,
    filter: data.filter,
  };
};
