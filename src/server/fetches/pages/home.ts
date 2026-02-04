import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeHome } from "../../serializers/pages/home-serializer";

export async function fetchHomePage({ locale }: { locale: string }) {
  const endpoint = convertLocaleSlug("home", locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "home"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;

  if (!page || !page.acf) {
    throw new Error("The 'Home' page does not have an ACF object.");
  }

  const data = serializeHome(page.acf as any);
  return data;
}
