import ContactUsDetail from "@/components/pages/contact-us/ContactUsDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchContactUsPage } from "@/server/fetches/pages/contact-us";
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
    path: "contact-us",
    title: "Contact Us - American School Bangkok",
    description: "Contact Us - XCL Education",
    useWordPressSEO: true,
    pageSlug: "contact-us",
  });
}

export default async function Page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const contactUsPage = "contact-us";

  try {
    const contactUsPageData = await fetchWithLocaleFallback(fetchContactUsPage, {
      slugContactUs: contactUsPage,
      locale,
    });

    if (!contactUsPageData) {
      redirect("/404");
    }

    return <ContactUsDetail data={contactUsPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
