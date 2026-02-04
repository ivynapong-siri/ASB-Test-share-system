import PerformingDetails from "@/components/pages/co-curricular-life/performing-and-fine-arts/PerformingDetail";
import { fetchNewsGroup } from "@/server/fetches/news-group";
import { fetchCoCurricularLifePage } from "@/server/fetches/pages/co-curricular-life";
import { PageProps } from "@/server/models/model-types";
import { redirect } from "next/navigation";

import { generateSEOMetadata } from "@/lib/seo";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";

export const revalidate = 1800; // 30 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "co-curricular-life/performing-and-fine-arts",
    title: "Co Curricular Life - Performing And Fine Arts - American School Bangkok",
    description: "Co Curricular Life - Performing And Fine Arts - XCL Education",
    useWordPressSEO: true,
    pageSlug: "performing-and-fine-arts",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const performingAndFineArtsSlug = "performing-and-fine-arts";
  const limit = 6;
  const category = "news-performing-and-fine-arts";
  const [performingAndFineArtsData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: performingAndFineArtsSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { limit, category, locale }),
  ]);

  if (!performingAndFineArtsData) {
    redirect("/404");
  }

  return <PerformingDetails data={performingAndFineArtsData} newsGroupData={newsGroupData} />;
}
