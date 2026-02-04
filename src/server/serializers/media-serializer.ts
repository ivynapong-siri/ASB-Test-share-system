import { Media } from "../models/model-types";

export type MediaJson = ReturnType<typeof serializeRawMedia>;

export function serializeMedias(data: Media[]) {
  return data.map((e) => serializeRawMedia(e));
}

export function serializeRawMedia(media: Media) {
  return {
    id: media.id,
    contentType: media.contentType,
    fileName: media.fileName,
    filePathName: `/${media.filePath}/${media.fileName}`,
  };
}
