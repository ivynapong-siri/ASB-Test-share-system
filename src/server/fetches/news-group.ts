import { convertLocaleSlug } from "@/client/utils/helper";
import { serializeNewsGroup } from "../serializers/news-group-serializer";
import { WordPressNewsGroupJson } from "../types/wordpress-type";
import { fetchWordPressCustomAPI } from "../utils/wordpress-helper";

export async function fetchNewsGroup({
  category,
  news_type,
  limit,
  locale,
}: {
  news_type?: string;
  category?: string;
  limit?: number;
  locale: string;
}) {
  const queryParams = new URLSearchParams();
  if (news_type) queryParams.append("news_type", news_type);
  if (category) queryParams.append("category", category);
  if (limit) queryParams.append("limit", limit.toString());

  const convertLocale = convertLocaleSlug("news-grouped", locale);
  const endpoint = `${convertLocale}?${queryParams.toString()}`;

  const response = await fetchWordPressCustomAPI<WordPressNewsGroupJson>(endpoint, {
    tags: ["wordpress", "news-group"],
    revalidate: 3600, // 1 hour
  });
  if (!response) {
    throw new Error("The 'News' does not have an ACF object.");
  }

  const data = serializeNewsGroup(response);
  return data;
}

export async function fetchNewsGroupId({ newsId }: { newsId: string }) {
  const endpoint = `news-grouped?id${newsId}`;
  const response = await fetchWordPressCustomAPI<WordPressNewsGroupJson>(endpoint, {
    tags: ["wordpress", "news-group"],
    revalidate: 3600, // 1 hour
  });
  if (!response) {
    throw new Error("The 'News' does not have an ACF object.");
  }

  const data = serializeNewsGroup(response);
  return data;
}
