import { WordPressIconJson } from "../types/wordpress-type";
import { isObject } from "../utils/helpers";
import { serializeImage } from "./image-serializer";

export type SectionIconJson = ReturnType<typeof serializeIcon>;

export const serializeIcons = (data: WordPressIconJson[]) => {
  return data.map((e) => serializeIcon(e));
};

export const serializeIcon = (data: WordPressIconJson) => {
  return {
    id: data.id,
    title: data.title,
    image: isObject(data.acf) ? serializeImage(data.acf.icon) : null,
  };
};
