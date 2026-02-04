import { serializeLandingDetail, serializeLandingList } from "../serializers/custom-landing-serializer";

import { WordPressLandingDetailJson } from "../types/wordpress-type";
import { fetchWordPressCustomAPI } from "../utils/wordpress-helper";

export async function fetchLandingList({ locale }: { locale?: string } = {}) {
  let endpoint = `landing-pages?lite=1`;
  if (locale) {
    endpoint += `&lang=${locale}`;
  }
  const response = await fetchWordPressCustomAPI<WordPressLandingDetailJson[]>(endpoint, {
    tags: ["wordpress", "custom-landing"],
    revalidate: 3600, // 1 hour
  });

  if (!response) {
    throw new Error("No any custom landing page found.");
  }

  const data = serializeLandingList(response);
  return data;
}

export async function fetchLandingDetail({ slug, locale }: { slug: string; locale?: string }) {
  let endpoint = `landing-pages?slug=${slug}&lite=1`;
  if (locale) {
    endpoint += `&lang=${locale}`;
  }
  const response = await fetchWordPressCustomAPI<WordPressLandingDetailJson[]>(endpoint, {
    tags: ["wordpress", "custom-landing"],
    revalidate: 3600, // 1 hour
  });

  if (!response[0]) {
    throw new Error("No landing page detail found.");
  }

  const data = serializeLandingDetail(response[0]);
  return data;
}
