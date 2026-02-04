import HomeDetails from "@/components/pages/home/HomeDetails";
import { Metadata } from "next";
import { PageProps } from "@/server/models/model-types";
import { fetchHomePage } from "@/server/fetches/pages/home";
import { fetchIcon } from "@/server/fetches/icon";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { generateSEOMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const revalidate = 300; // 5 minutes for better performance
export const dynamic = "force-static";
// export const fetchCache = "force-cache";
export const runtime = "nodejs";

export async function generateMetadata(props: { params: PageProps }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "home",
    title: "Home - American School Bangkok",
    description: "Welcome to American School Bangkok - An XCL Education School",
    useWordPressSEO: true,
    pageSlug: "home",
  });
}

export default async function page(props: { params: PageProps }) {
  const { locale } = await props.params;

  try {
    // Fetch with automatic fallback to English if locale-specific content doesn't exist
    const [homeData, iconData] = await Promise.all([fetchWithLocaleFallback(fetchHomePage, { locale }), fetchIcon()]);

    if (!homeData) {
      redirect("/404");
    }

    return <HomeDetails homeData={homeData} iconData={iconData} />;
  } catch (error) {
    redirect("/404");
  }
}
