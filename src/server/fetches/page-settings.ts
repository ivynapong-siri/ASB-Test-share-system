import { serializePageSettings } from "../serializers/page-settings";
import { WordPressPageSettingJson } from "../types/wordpress-type";
import { fetchWordPressCustomAPI } from "../utils/wordpress-helper";

export async function fetchPageSettings({ locale }: { locale: string }) {
  let endpoint = "page-setting";
  if (locale) {
    endpoint += `?lang=${locale}`;
  }
  const response = await fetchWordPressCustomAPI<WordPressPageSettingJson>(endpoint);
  const pageSetting = response;
  if (!pageSetting) {
    throw new Error("Have Something Error In WordPress PageSettings fetchWordPressCustomAPI.");
  }
  const data = serializePageSettings(pageSetting);
  return data;
}
