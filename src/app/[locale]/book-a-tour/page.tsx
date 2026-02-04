import BookATourDetail from "@/components/pages/book-a-tour/BookATourDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchBookATourPage } from "@/server/fetches/pages/book-a-tour";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "book-a-tour",
    title: "Book A Tour - American School Bangkok",
    description: "Book A Tour - XCL Education",
    useWordPressSEO: true,
    pageSlug: "book-a-tour",
  });
}

export default async function Page(props: { params: PageProps }) {
  const { locale } = await props.params;
  const bookATourPage = "book-a-tour";

  try {
    const bookATourPageData = await fetchWithLocaleFallback(fetchBookATourPage, {
      slugBookATour: bookATourPage,
      locale,
    });

    if (!bookATourPageData) {
      redirect("/404");
    }

    return <BookATourDetail data={bookATourPageData} />;
  } catch (error) {
    redirect("/404");
  }
}
