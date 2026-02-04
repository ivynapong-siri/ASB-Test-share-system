import { serializeDirectNavigationMenus } from "../serializers/direct-navigation-menus-serializer";
import { WordPressDirectNavigationMenusJson } from "../types/wordpress-type";
import { fetchWordPressCustomAPI } from "../utils/wordpress-helper";

export async function fetchDirectNavigationMenus({ locale }: { locale: string }) {
  let endpoint = "dropdown-groups";
  if (locale) {
    endpoint += `?lang=${locale}`;
  }

  const response = await fetchWordPressCustomAPI<WordPressDirectNavigationMenusJson>(endpoint);

  const directNavigation = response;
  if (!directNavigation) {
    throw new Error("Have Something Error In WordPress DirectNavigationMenus fetchWordPressCustomAPI.");
  }
  const data = serializeDirectNavigationMenus(directNavigation);
  return data;
}
