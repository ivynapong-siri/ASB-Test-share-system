import { serializeSharedSections } from "../serializers/shared-section-serializer";
import { WordPressSharedSectionsJson } from "../types/wordpress-type";
import { fetchWordPressCustomAPI } from "../utils/wordpress-helper";

export async function fetchSharedSections({ locale }: { locale?: string }) {
  let endpoint = "shared-sections";
  if (locale) {
    endpoint += `?lang=${locale}`;
  }
  const response = await fetchWordPressCustomAPI<WordPressSharedSectionsJson>(endpoint);
  const sharedSections = response;

  if (!sharedSections) {
    throw new Error("Have Something Error In WordPress SharedSections fetchWordPressCustomAPI.");
  }
  const data = serializeSharedSections(sharedSections);
  return data;
}
