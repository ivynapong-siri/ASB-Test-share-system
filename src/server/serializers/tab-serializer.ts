import { WordPressTabJson } from "../types/wordpress-type";
import { serializeCards } from "./card-serializer";
import { serializeFAQs } from "./faq-serializer";
import { serializeProfiles } from "./profile-serializer";
import { serializeTabAdmissions } from "./tab-admissions-serializer";

export type SectionTabJson = ReturnType<typeof serializeTab>;

export const serializeTabs = (data: WordPressTabJson[]) => {
  return data.map(serializeTab);
};

export const serializeTab = (data: WordPressTabJson) => {
  const { tab_cards, tab_profiles, tab_admissions, tab_events, tab_faqs, tabs } = data.acf_fields;
  let cards = null;
  if (Array.isArray(tab_cards) && tab_cards.length) {
    cards = serializeCards(tab_cards);
  } else if (Array.isArray(tabs) && tabs.length) {
    cards = serializeCards(tabs);
  } else if (Array.isArray(tab_profiles) && tab_profiles.length) {
    cards = serializeProfiles(tab_profiles);
  } else if (Array.isArray(tab_admissions) && tab_admissions.length) {
    cards = serializeTabAdmissions(tab_admissions);
  } else if (Array.isArray(tab_events) && tab_events.length) {
    cards = serializeCards(tab_events);
  } else if (Array.isArray(tab_faqs) && tab_faqs.length) {
    cards = serializeFAQs(tab_faqs);
  }

  return {
    id: data.ID,
    title: data.acf_fields.title,
    description: data.acf_fields.description,
    cards,
  };
};
