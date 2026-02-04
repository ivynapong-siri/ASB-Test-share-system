import ContactUsSuccessSection from "@/components/pages/contact-us/thankyou/ContactUsSuccess";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchThankyouPage } from "@/server/fetches/pages/contact-us";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "contact-us/thankyou",
    title: "Contact Us - Success - American School Bangkok",
    description: "Contact Us - Success - XCL Education",
    useWordPressSEO: true,
    pageSlug: "contact-us-thank-you-page",
  });
}

export default async function Page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const slug = "contact-us-thank-you-page";

  try {
    const thankyouPageData = await fetchWithLocaleFallback(fetchThankyouPage, { slugThankyou: slug, locale });

    return <ContactUsSuccessSection data={thankyouPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
