import { WordPressNewsHashtags } from "@/server/types/wordpress-type";
import { WordPressNewsJson } from "@/server/types/wordpress/news-type";
import { isObject } from "@/server/utils/helpers";
import { serializeImage } from "../image-serializer";
import { serializeGalleries } from "../news-group-serializer";

export type NewsJson = ReturnType<typeof serializeNews>;
export type HashtagJson = ReturnType<typeof serializeHashtag>;

export const serializeNews = (data: WordPressNewsJson) => {
  const image = isObject(data.image) ? serializeImage(data.image) : null;
  const image2 = isObject(data.image_2) ? serializeImage(data.image_2) : null;

  return {
    breadcrumbs1: data.breadcrumbs_1,
    breadcrumbs2: data.breadcrumbs_2,
    breadcrumbs3: data.breadcrumbs_3,
    title: data.title,
    description: data.description,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    buttonLabel: data.button?.button_label ?? null,
    date: data.date,
    image,
    image2,
    hashtags: data.hashtags.length > 0 ? data.hashtags.map(serializeHashtag) : null,
    ribbonText: data.ribbon_text ?? null,
    badge: data.badge,
    galleries: data.galleries && data.galleries.map((e) => serializeGalleries(e)),
    subcategory: data.subcategory,
    elementorLink: data.elementor_link ?? null,
    newsType: data.news_type,
    sharedBannerTitle: data.shared_banner?.title ?? null,
    sharedBannerButtonLabel: data.shared_banner?.button_label ?? null,
    sharedModalTitle: data.shared_modal_data?.title ?? null,
    sharedModalDescription: data.shared_modal_data?.description ?? null,
    copyButtonLabel: data.shared_modal_data?.copy_button_label ?? null,
    copyToClipBoardLabel: data.shared_modal_data?.copy_to_clipboard_label ?? null,
  };
};

export const serializeHashtag = (data: WordPressNewsHashtags) => {
  return {
    id: data.id,
    title: data.title,
    type: data.type,
    order: data.acf_fields.order,
    url: data.acf_fields.url,
  };
};
