import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeCoCurricularLife } from "@/server/serializers/pages/co-curricular-life-serializer";

export async function fetchCoCurricularLifePage({ slug, locale }: { slug: string; locale: string }) {
  const endpoint = convertLocaleSlug(slug, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "co-curricular-life"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'Co-Curricular Life' page does not have an ACF object.");
  }

  const data = serializeCoCurricularLife(page.acf as any);
  return data;
}
