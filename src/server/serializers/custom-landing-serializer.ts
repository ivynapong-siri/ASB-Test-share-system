import { WordPressLandingDetailJson } from "../types/wordpress-type";

export type LandingDetailJson = ReturnType<typeof serializeLandingDetail>;
export type LandingListJson = ReturnType<typeof serializeLandingList>;

export const serializeLandingList = (data: WordPressLandingDetailJson[]) => {
  return data.map(serializeLandingDetail);
};

export const serializeLandingDetail = (data: WordPressLandingDetailJson) => {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    url: data.link,
    content: data.content ?? null,
  };
};
