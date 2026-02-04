import TuitionAndFeesDetails from "@/components/pages/admission/tuition-and-fees/TuitionAndFeesDetails";
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
    path: "admission/tuition-and-fees",
    title: "Admission - Tuition And Fees - American School Bangkok",
    description: "Admission - Tuition And Fees - XCL Education",
    useWordPressSEO: true,
    pageSlug: "tuition-and-fees",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const tuitionAndFeeSlug = "tuition-and-fees";

  try {
    const tuitionAndFeeData = await fetchWithLocaleFallback(fetchAdmissionPage, { slug: tuitionAndFeeSlug, locale });

    if (!tuitionAndFeeData) {
      redirect("/404");
    }

    return <TuitionAndFeesDetails data={tuitionAndFeeData} />;
  } catch (error) {
    redirect("/404");
  }
}
