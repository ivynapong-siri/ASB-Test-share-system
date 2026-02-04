import { WordPressCardJson } from "../types/wordpress-type";
import { isObject } from "../utils/helpers";
import { serializeImage } from "./image-serializer";

export type SectionCardJson = ReturnType<typeof serializeCard>;

export const serializeCards = (data: WordPressCardJson[]) => {
  return data.map((card) => serializeCard(card));
};

export const serializeCard = (data: WordPressCardJson) => {
  return {
    id: data.ID,
    newsId: data.acf_fields.news_id ? data.acf_fields.news_id : null,
    title: data.acf_fields.title,
    description: data.acf_fields.description,
    descriptionMobile: data.acf_fields.description_mobile,
    badge: data.acf_fields.badge,
    subject: data.acf_fields.subject,
    type: data.post_type,
    buttonLabel: data.acf_fields.button_label,
    buttonUrl: data.acf_fields.button_url,
    ribbonText: data.acf_fields.ribbon_text,
    richTextDescription: data.acf_fields.rich_text_description ?? "",
    subtitle: data.acf_fields.subtitle,
    from: data.acf_fields.from,
    to: data.acf_fields.to,
    date: data.post_date,
    image: isObject(data.acf_fields.image) ? serializeImage(data.acf_fields.image) : null,
    image2: isObject(data.acf_fields.image_2) ? serializeImage(data.acf_fields.image_2) : null,
    imageMobile: isObject(data.acf_fields.image_mobile) ? serializeImage(data.acf_fields.image_mobile) : null,
    category: data.acf_fields.catg,
  };
};
