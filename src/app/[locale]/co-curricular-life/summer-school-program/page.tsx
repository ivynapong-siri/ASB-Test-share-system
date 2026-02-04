import SummerSchoolProgramDetail from "@/components/pages/co-curricular-life/summer-school-program/SummerSchoolProgramDetail";
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
    path: "co-curricular-life/summer-school-program",
    title: "Co Curricular Life - Summer School Program - American School Bangkok",
    description: "Co Curricular Life - Summer School Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "summer-school-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const summerSchoolProgramSlug = "summer-school-programs";

  try {
    const summerSchoolProgramData = await fetchWithLocaleFallback(fetchCoCurricularLifePage, {
      slug: summerSchoolProgramSlug,
      locale,
    });

    if (!summerSchoolProgramData) {
      redirect("/404");
    }

    return <SummerSchoolProgramDetail data={summerSchoolProgramData} />;
  } catch (error) {
    redirect("/404");
  }
}
