import BookingSuccessSection from "@/components/pages/book-a-tour/thankyou/BookingSuccess";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchThankyouForBookingPage } from "@/server/fetches/pages/book-a-tour";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "book-a-tour/thankyou",
    title: "Book A Tour - Success - American School Bangkok",
    description: "Book A Tour - Success - XCL Education",
    useWordPressSEO: true,
    pageSlug: "book-a-tour-thank-you-page",
  });
}

export default async function Page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const thankyouPage = "book-a-tour-thank-you-page";

  try {
    const thankyouPageData = await fetchWithLocaleFallback(fetchThankyouForBookingPage, {
      slugThankyou: thankyouPage,
      locale,
    });

    if (!thankyouPageData) {
      redirect("/404");
    }
    return <BookingSuccessSection data={thankyouPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
