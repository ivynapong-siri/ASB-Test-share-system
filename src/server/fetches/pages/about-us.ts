import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeAboutUsPage } from "@/server/serializers/pages/about-us-serializer";

export async function fetchAboutUsPage({ slugAboutUs, locale }: { slugAboutUs: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugAboutUs, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "about-us"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;

  if (!page || !page.acf) {
    throw new Error("The 'About Us' page does not have an ACF object.");
  }

  const data = serializeAboutUsPage(page.acf as any);
  return data;
}
