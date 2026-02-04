import {
  WordPressNewsGroupDetailJson,
  WordPressNewsGroupGalleriesJson,
  WordPressNewsGroupGalleriesMetaDataJson,
  WordPressNewsGroupJson,
  WordPressSectionJson,
} from "@/server/types/wordpress-type";

import { isObject } from "../utils/helpers";
import { serializeImage } from "./image-serializer";
import { serializeHashtag } from "./pages/news-serializer";
import { serializeSection } from "./section-serializer";

export type NewsGroupJson = ReturnType<typeof serializeNewsGroup>;
export type NewsGroupDetailJson = ReturnType<typeof serializeNewsGroupDetail>;
export type GalleriesJson = ReturnType<typeof serializeGalleries>;
export type NewsGroupMetaDataJson = ReturnType<typeof serializeNewsGroupMetaData>;

export const serializeNewsGroup = (data: WordPressNewsGroupJson) => {
  return {
    news: data.News && data.News.map((e) => serializeNewsGroupDetail(e)),
    article: data.Article && data.Article.map((e) => serializeNewsGroupDetail(e)),
    event: data.Event && data.Event.map((e) => serializeNewsGroupDetail(e)),
    unCategorized: data.uncategorized && data.uncategorized.map((e) => serializeNewsGroupDetail(e)),
  };
};

export const serializeNewsGroupDetail = (data: WordPressNewsGroupDetailJson) => {
  const { acf_fields } = data;
  const image = isObject(acf_fields) && isObject(acf_fields.image) ? serializeImage(acf_fields.image) : null;
  const image2 = isObject(acf_fields) && isObject(acf_fields.image_2) ? serializeImage(acf_fields.image_2) : null;

  return {
    id: data.id,
    mainTitle: data.title,
    slug: data.slug,
    breadcrumbs1: acf_fields.breadcrumbs_1,
    breadcrumbs2: acf_fields.breadcrumbs_2,
    ribbonText: acf_fields.ribbon_text,
    badge: acf_fields.badge,
    title: acf_fields.title,
    image: image,
    image2: image2,
    date: acf_fields.date,
    sections:
      acf_fields.section && acf_fields.section.length > 0
        ? acf_fields.section.map((e) => serializeSection(e as WordPressSectionJson))
        : null,
    hashtags: acf_fields.hashtags && acf_fields.hashtags.map((e) => serializeHashtag(e)),
    newsType: acf_fields.news_type,
    description: acf_fields.description,
    descriptionMobile: acf_fields.description_mobile,
    galleries: acf_fields.galleries && acf_fields.galleries.map((e) => serializeGalleries(e)),
    newsFilter: acf_fields.news_filter,
    subcategory: acf_fields.subcategory,
  };
};

export const serializeGalleries = (data: WordPressNewsGroupGalleriesJson) => {
  const { attachment, metadata } = data;

  return {
    attachment: {
      id: attachment.ID,
      postAuthor: attachment.post_author,
      postDate: attachment.post_date,
      postDateGMT: attachment.post_date_gmt,
      postContent: attachment.post_content,
      postTitle: attachment.post_title,
      postExcerpt: attachment.post_excerpt,
      postStatus: attachment.post_status,
      commentStatus: attachment.comment_status,
      pingStatus: attachment.ping_status,
      postName: attachment.post_name,
      toPing: attachment.to_ping,
      pinged: attachment.pinged,
      postModified: attachment.post_modified,
      postModifiedGMT: attachment.post_modified_gmt,
      postContentFiltered: attachment.post_content_filtered,
      postParent: attachment.post_parent,
      menuOrder: attachment.menu_order,
      postType: attachment.post_type,
      postMimeType: attachment.post_mime_type,
      commentCount: attachment.comment_count,
      filter: attachment.filter,
    },
    metadata: {
      full: metadata.full && serializeNewsGroupMetaData(metadata.full),
      medium: metadata.medium && serializeNewsGroupMetaData(metadata.medium),
      large: metadata.large && serializeNewsGroupMetaData(metadata.large),
      thumbnail: metadata.thumbnail && serializeNewsGroupMetaData(metadata.thumbnail),
      mediumLarge: metadata.medium_large && serializeNewsGroupMetaData(metadata.medium_large),
      "1536x1536": metadata["1536x1536"] && serializeNewsGroupMetaData(metadata["1536x1536"]),
      "2048x2048": metadata["2048x2048"] && serializeNewsGroupMetaData(metadata["2048x2048"]),
      tenwebOptimizerMobile:
        metadata.tenweb_optimizer_mobile && serializeNewsGroupMetaData(metadata.tenweb_optimizer_mobile),
      tenwebOptimizerTablet:
        metadata.tenweb_optimizer_tablet && serializeNewsGroupMetaData(metadata.tenweb_optimizer_tablet),
    },
  };
};

export const serializeNewsGroupMetaData = (data: WordPressNewsGroupGalleriesMetaDataJson) => {
  return {
    file: data.file,
    width: data.width,
    height: data.height,
    mimeType: data.mime_type,
    fileSize: data.file_size,
    fileUrl: data.file_url,
  };
};
