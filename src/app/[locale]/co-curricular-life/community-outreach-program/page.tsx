import CommunityOutreachProgramDetail from "@/components/pages/co-curricular-life/community-outreach-program/CommunityOutreachProgramDetail";
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
    path: "co-curricular-life/community-outreach-program",
    title: "Co Curricular Life - Community Outreach Program - American School Bangkok",
    description: "Co Curricular Life - Community Outreach Program - XCL Education",
    useWordPressSEO: true,
    pageSlug: "community-outreach-program",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const communityOutreachProgramSlug = "community-outreach-program";

  const limit = 6;
  const category = "news-community-outreach-program";

  const [communityOutreachProgramData, newsGroupData] = await Promise.all([
    fetchWithLocaleFallback(fetchCoCurricularLifePage, { slug: communityOutreachProgramSlug, locale }),
    fetchWithLocaleFallback(fetchNewsGroup, { category, limit, locale }),
  ]);
  if (!communityOutreachProgramData) {
    redirect("/404");
  }

  return <CommunityOutreachProgramDetail data={communityOutreachProgramData} newsGroupData={newsGroupData} />;
}
