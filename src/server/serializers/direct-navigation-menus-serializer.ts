import { WordPressDirectNavigationItemJson, WordPressDirectNavigationMenusJson } from "../types/wordpress-type";

export type DirectNavigationMenusJson = ReturnType<typeof serializeDirectNavigationMenus>;

export const serializeDirectNavigationMenus = (data: WordPressDirectNavigationMenusJson) => {
  const result: { [key: string]: WordPressDirectNavigationItemJson[] } = {};

  data.navigations.forEach((navCategory) => {
    const [key, items] = Object.entries(navCategory)[0];
    result[key] = items.sort((a, b) => a.order - b.order);
  });

  return result;
};
