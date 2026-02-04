import { WordPressPage } from "@/server/types/wordpress-type";
import { fetchWordPressAPI } from "@/server/utils/wordpress-helper";
import { serializeNews } from "@/server/serializers/pages/news-serializer";

export async function fetchNews({ slug, locale }: { slug: string; locale?: string }) {
  const isNumericId = /^\d+$/.test(slug);
  let response: WordPressPage;
  if (isNumericId) {
    let endpoint = `news/${slug}`;
    if (locale) {
      endpoint += `&lang=${locale}`;
    }
    response = await fetchWordPressAPI<WordPressPage>(endpoint, 
    //   {
    //   tags: ["wordpress", "news"],
    //   revalidate: 3600,
    // }
  );
  } else {
    let endpoint = `news?slug=${slug}`;
    if (locale) {
      endpoint += `&lang=${locale}`;
    }
    const results = await fetchWordPressAPI<WordPressPage[]>(endpoint, 
    //   {
    //   tags: ["wordpress", "news"],
    //   revalidate: 3600,
    // }
  );
    if (!results || results.length === 0) {
      throw new Error(`News not found for slug: ${slug}`);
    }
    response = results[0];
  }
  if (!response || !response.acf) {
    throw new Error("The 'News' does not have an ACF object.");
  }
  const data = serializeNews(response.acf as any);
  return data;
}
