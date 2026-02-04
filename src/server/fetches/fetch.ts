import { WordPressPage } from "../types/wordpress-type";
import { fetchWordPressAPI } from "../utils/wordpress-helper";

export async function fetchPages({
  slug,
  locale,
  next,
}: {
  slug: string;
  locale: string;
  next?: NextFetchRequestConfig;
}) {
  const endpoint = `pages?slug=${slug}&acf_format=standard&lang=${locale}`;
  const response = await fetchWordPressAPI<WordPressPage[]>(endpoint, next);
  return response;
}
