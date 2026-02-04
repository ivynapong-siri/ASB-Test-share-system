import AfterSchoolProgramDetail from "@/components/pages/co-curricular-life/after-school-program/AfterSchoolProgramDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchCoCurricularLifePage } from "@/server/fetches/pages/co-curricular-life";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 1800; // 30 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "co-curricular-life/after-school-program",
    title: "Co Curricular Life - After School Program - American School Bangkok",
    description: "Co Curricular Life - After School Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "after-school-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const afterSchoolProgramsSlug = "after-school-programs";

  const limit = 6;
  const category = "news-after-school-program";

  const [afterSchoolProgramsData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: afterSchoolProgramsSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
  ]);

  if (!afterSchoolProgramsData) {
    redirect("/404");
  }

  return <AfterSchoolProgramDetail data={afterSchoolProgramsData} newsGroupData={newsGroupData} />;
}
