import FieldTripsDetails from "@/components/pages/co-curricular-life/field-trip/FieldTripsDetail";
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
    path: "co-curricular-life/field-trips",
    title: "Co Curricular Life - Field Trips - American School Bangkok",
    description: "Co Curricular Life - Field Trips - XCL Education",
    useWordPressSEO: true,
    pageSlug: "field-trips",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const fieldTripsSlug = "field-trips";
  const limit = 6;
  const category = "news-field-trips";

  const [fieldTripsData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: fieldTripsSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
  ]);

  if (!fieldTripsData || !newsGroupData) {
    redirect("/404");
  }
  return <FieldTripsDetails data={fieldTripsData} newsGroupData={newsGroupData} />;
}
