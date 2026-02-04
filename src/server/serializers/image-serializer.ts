import { WordPressImageJson } from "../types/wordpress-type";

export type SectionCardImageJson = ReturnType<typeof serializeImage>;

export const serializeImages = (data: WordPressImageJson[]) => {
  return data.map((image) => serializeImage(image));
};

export const serializeImage = (data: WordPressImageJson) => {
  return {
    id: data.ID,
    title: data.title,
    filename: data.filename,
    filesize: data.filesize,
    type: data.type,
    fileType: data.mime_type,
    imageLink: data.link,
    imageUrl: data.url,
    width: data.width,
    height: data.height,
    imageMediumUrl: data.sizes.medium,
    imageMediumLargeUrl: data.sizes.medium_large,
  };
};
