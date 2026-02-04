import ParentInvolvementDetail from "@/components/pages/our-community/parent-involvement/ParentInvolvementDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchOurCommunityPage } from "@/server/fetches/pages/our-community";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "our-community/parent-involvement",
    title: "Our Community - Parent Involvement - American School Bangkok",
    description: "Our Community - Parent Involvement - XCL Education",
    useWordPressSEO: true,
    pageSlug: "parent-involvement",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const parentInvolvementSlug = "parent-involvement";

  try {
    const parentInvolvementData = await fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: parentInvolvementSlug,
      locale,
    });

    if (!parentInvolvementData) {
      redirect("/404");
    }

    return <ParentInvolvementDetail data={parentInvolvementData} />;
  } catch (error) {
    redirect("/404");
  }
}
