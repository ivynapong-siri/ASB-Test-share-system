import ApplicationSuccessDetail from "@/components/pages/admission/apply-now/ApplicationSuccessDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchApplicationSuccessPage } from "@/server/fetches/pages/admission";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "landing/boarding/thankyou",
    title: "Landing - Boarding - Success - American School Bangkok",
    description: "Landing - Boarding - Success - XCL Education",
    useWordPressSEO: true,
    pageSlug: "admission-apply-success",
  });
}

export default async function Success(props: { params: PageProps }) {
  const { locale } = await props.params;
  const slug = "admission-apply-success";

  try {
    const applicationSuccessData = await fetchWithLocaleFallback(fetchApplicationSuccessPage, {
      slugAdmissionApplySuccess: slug,
      locale,
    });

    return <ApplicationSuccessDetail data={applicationSuccessData} />;
  } catch (error) {
    redirect("/404");
  }
}
