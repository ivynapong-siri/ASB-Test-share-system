import { WordPressSharedSectionJson, WordPressSharedSectionsJson } from "../types/wordpress-type";
import { serializeCards } from "./card-serializer";

export type SharedSectionsJson = ReturnType<typeof serializeSharedSections>;
export type SharedSectionJson = ReturnType<typeof serializeSharedSection>;

export const serializeSharedSections = (data: WordPressSharedSectionsJson) => {
  const serializedSections: Record<string, any[]> = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      serializedSections[key] = data[key].map(serializeSharedSection);
    }
  }
  return serializedSections;
};

export const serializeSharedSection = (data: WordPressSharedSectionJson) => {
  return {
    id: data.id,
    title: data.title,
    cards: Array.isArray(data.acf.cards) && data.acf.cards.length ? serializeCards(data.acf.cards) : null,
    link: data.link,
  };
};
