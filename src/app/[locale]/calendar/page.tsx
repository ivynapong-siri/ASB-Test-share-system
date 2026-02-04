import CalendarDetail from "@/components/pages/calendar/CalendarDatail";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchCalendarPage } from "@/server/fetches/pages/calendar";
import { PageProps } from "@/server/models/model-types";
import { fetchWithLocaleFallback } from "@/server/utils/locale-fallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface CalendarPageProps {
  params: PageProps;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "calendar",
    title: "Calendar - American School Bangkok",
    description: "Calendar - XCL Education",
    useWordPressSEO: true,
    pageSlug: "calendar",
  });
}

export default async function page({ params, searchParams }: CalendarPageProps) {
  const { locale } = await params;
  const { q, tags } = await searchParams;

  try {
    const calendarData = await fetchWithLocaleFallback(fetchCalendarPage, { locale, q, tags });

    if (!calendarData) {
      redirect("/404");
    }

    const { data, events } = calendarData;

    return <CalendarDetail data={data} events={events} />;
  } catch (error) {
    redirect("/404");
  }
}
