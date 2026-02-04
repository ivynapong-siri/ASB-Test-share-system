import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeCurriculumPage } from "@/server/serializers/pages/curriculum-serializer";

export async function fetchCurriculumPage({ slugCurriculum, locale }: { slugCurriculum: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugCurriculum, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "curriculum"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'Curriculum' page does not have an ACF object.");
  }
  const data = serializeCurriculumPage(page.acf as any);
  return data;
}
