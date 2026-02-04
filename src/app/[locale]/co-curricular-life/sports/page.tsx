import SportDetail from "@/components/pages/co-curricular-life/sports/SportDetail";
import { fetchCoCurricularLifePage } from "@/server/fetches/pages/co-curricular-life";
import { PageProps } from "@/server/models/model-types";
import { redirect } from "next/navigation";

import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";

export const revalidate = 1800; // 30 minutes
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "co-curricular-life/sports",
    title: "Co Curricular Life - Sports - American School Bangkok",
    description: "Co Curricular Life - Sports - XCL Education",
    useWordPressSEO: true,
    pageSlug: "sports",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const sportsSlug = "sports";

  try {
    const sportsData = await fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: sportsSlug, locale });

    if (!sportsData) {
      redirect("/404");
    }

    return <SportDetail data={sportsData} />;
  } catch (error) {
    redirect("/404");
  }
}
