import LifeAtASBDetails from "@/components/pages/co-curricular-life/life-at-asb/LifeAtASBDetail";
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
    path: "co-curricular-life/life-at-xcl-asb-sukhumvit",
    title: "Co Curricular Life - Life At Xcl Asb Sukhumvit - American School Bangkok",
    description: "Co Curricular Life - Life At Xcl Asb Sukhumvit - XCL Education",
    useWordPressSEO: true,
    pageSlug: "curricular-life-at-xclasb",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const lifeAtXCLASBSlug = "curricular-life-at-xclasb";

  const category = "news-field-trips";
  const limit = 3;

  const [lifeAtXCLASBData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: lifeAtXCLASBSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
  ]);

  if (!lifeAtXCLASBData) {
    redirect("/404");
  }

  return <LifeAtASBDetails data={lifeAtXCLASBData} newsGroupData={newsGroupData} />;
}
