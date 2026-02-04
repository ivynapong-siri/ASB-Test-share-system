import FaqDetails from "@/components/pages/admission/faq/FaqDetails";
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
    path: "admission/faq",
    title: "Admission - Faq - American School Bangkok",
    description: "Admission - Faq - XCL Education",
    useWordPressSEO: true,
    pageSlug: "faq",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const faqSlug = "faq";

  try {
    const faqData = await fetchWithLocaleFallback(fetchAdmissionPage, { slug: faqSlug, locale });

    if (!faqData) {
      redirect("/404");
    }

    return <FaqDetails data={faqData} />;
  } catch (error) {
    redirect("/404");
  }
}
