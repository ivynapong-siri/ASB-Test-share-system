import AgeGuidelinesDetail from "@/components/pages/admission/age-guidelines-for-entry/AgeGuidelinesDetail";
import { fetchAdmissionPage } from "@/server/fetches/pages/admission";
import { PageProps } from "@/server/models/model-types";
import { redirect } from "next/navigation";

import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "admission/age-guidelines-for-entry",
    title: "Admission - Age Guidelines For Entry - American School Bangkok",
    description: "Admission - Age Guidelines For Entry - XCL Education",
    useWordPressSEO: true,
    pageSlug: "age-guidelines-for-entry",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const ageGuidelinesSlug = "age-guidelines-for-entry";

  try {
    const ageGuidelinesData = await fetchWithLocaleFallback(fetchAdmissionPage, { slug: ageGuidelinesSlug, locale });

    if (!ageGuidelinesData) {
      redirect("/404");
    }

    return <AgeGuidelinesDetail data={ageGuidelinesData} />;
  } catch (error) {
    redirect("/404");
  }
}
