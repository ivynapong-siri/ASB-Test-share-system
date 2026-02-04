import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeOurCommunityPage } from "@/server/serializers/pages/our-community-serializer";

export async function fetchOurCommunityPage({
  slugOurCommunity,
  locale,
}: {
  slugOurCommunity: string;
  locale: string;
}) {
  const endpoint = convertLocaleSlug(slugOurCommunity, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "our-community"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'Our Community' page does not have an ACF object.");
  }
  const data = serializeOurCommunityPage(page.acf as any);
  return data;
}
