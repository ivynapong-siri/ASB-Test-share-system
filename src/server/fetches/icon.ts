import { serializeIcons } from "../serializers/icon-serializer";
import { WordPressIconJson } from "../types/wordpress-type";
import { fetchWordPressAPI } from "../utils/wordpress-helper";

export async function fetchIcon() {
  const endpoint = "icon";
  const response = await fetchWordPressAPI<WordPressIconJson[]>(endpoint, {
    tags: ["wordpress", "icon"],
    revalidate: 3600, // 1 hour
  });

  const [page] = response;
  if (!page) {
    throw new Error("The 'icon' page does not have an ACF object.");
  }

  const data = serializeIcons(response as any);
  return data;
}
