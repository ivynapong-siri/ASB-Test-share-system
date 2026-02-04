import { LandingDetail } from "@/components/pages/landing/[slug]/LandingDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchLandingDetail } from "@/server/fetches/custom-landing";
import { fetchWordPressSEO } from "@/server/fetches/seo";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

type LandingDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: LandingDetailProps): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const landingData = await fetchWithLocaleFallback(fetchLandingDetail, { slug, locale });
    const seoData = await fetchWithLocaleFallback(({ slug, locale }) => fetchWordPressSEO(slug, locale), {
      slug,
      locale,
    });

    const title = seoData?.title || landingData.title || "American School Bangkok";
    const description =
      seoData?.description || landingData.content || "Discover American School Bangkok - An XCL Education School";

    return await generateSEOMetadata({
      locale,
      path: `landing/${slug}`,
      title,
      description,
    });
  } catch (error) {
    return await generateSEOMetadata({
      locale,
      path: `landing/${slug}`,
      title: "American School Bangkok",
      description: "Discover American School Bangkok - An XCL Education School",
    });
  }
}

export default async function LandingDetailPage({ params }: LandingDetailProps) {
  const { slug, locale } = await params;

  try {
    const contactUsPageData = await fetchWithLocaleFallback(fetchLandingDetail, { slug, locale });

    return <LandingDetail data={contactUsPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
