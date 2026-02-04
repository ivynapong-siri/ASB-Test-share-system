import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeStudentSupportPage } from "@/server/serializers/pages/student-support-serializer";

export async function fetchStudentSupportPage({ slug, locale }: { slug: string; locale: string }) {
  const endpoint = convertLocaleSlug(slug, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale,
    // next: {
    //   tags: ["wordpress", "student-support"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'Student Support' page does not have an ACF object.");
  }

  const data = serializeStudentSupportPage(page.acf as any);
  return data;
}
