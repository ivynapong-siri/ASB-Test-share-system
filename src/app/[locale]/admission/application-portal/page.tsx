import ApplicationPortalDetail from "@/components/pages/admission/application-portal/ApplicationPortalDetail";
import { fetchApplicationPortalPage } from "@/server/fetches/pages/admission";
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
    path: "admission/application-portal",
    title: "Admission - Application Portal - American School Bangkok",
    description: "Admission - Application Portal - XCL Education",
    useWordPressSEO: true,
    pageSlug: "application-portal",
  });
}

export default async function ApplicationPortal(props: { params: PageProps }) {
  const { locale } = await props.params;
  const applicationPortalSlug = "application-portal";

  try {
    const applicationPortalData = await fetchWithLocaleFallback(fetchApplicationPortalPage, {
      slugApplicationPortal: applicationPortalSlug,
      locale,
    });

    if (!applicationPortalData) {
      redirect("/404");
    }

    return <ApplicationPortalDetail data={applicationPortalData} />;
  } catch (error) {
    redirect("/404");
  }
}
