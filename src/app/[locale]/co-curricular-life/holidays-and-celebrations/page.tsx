import HolidaysAndCelebrationsDetail from "@/components/pages/co-curricular-life/holidays-and-celebrations/HolidaysAndCelebrationsDetail";
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
    path: "co-curricular-life/holidays-and-celebrations",
    title: "Co Curricular Life - Holidays And Celebrations - American School Bangkok",
    description: "Co Curricular Life - Holidays And Celebrations - XCL Education",
    useWordPressSEO: true,
    pageSlug: "holidays-and-celebrations",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const holidaysAndCelebrationsSlug = "holidays-and-celebrations";
  const limit = 9;
  const category = "news-holidays-and-celebrations";
  const [holidaysAndCelebrationsData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: holidaysAndCelebrationsSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
  ]);

  if (!holidaysAndCelebrationsData) {
    redirect("/404");
  }

  return <HolidaysAndCelebrationsDetail data={holidaysAndCelebrationsData} newsGroupData={newsGroupData} />;
}
