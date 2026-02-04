import OurVoiceDetail from "@/components/pages/our-community/our-voices/OurVoiceDetail";
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
    path: "our-community/our-voices",
    title: "Our Community - Our Voices - American School Bangkok",
    description: "Our Community - Our Voices - XCL Education",
    useWordPressSEO: true,
    pageSlug: "our-voices",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;

  try {
    const ourVoiceSlug = "our-voices";
    const ourVoiceData = await fetchWithLocaleFallback(fetchOurCommunityPage, {
      slugOurCommunity: ourVoiceSlug,
      locale,
    });

    if (!ourVoiceData) {
      redirect("/404");
    }

    return <OurVoiceDetail data={ourVoiceData} />;
  } catch (error) {
    redirect("/404");
  }
}
