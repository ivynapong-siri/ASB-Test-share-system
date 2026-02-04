import { serializeCalendar, serializeCalendarEvents } from "@/server/serializers/pages/calendar-serializer";

import { WordPressPostCalendarJson } from "@/server/types/wordpress/calendar-type";
import { fetchWordPressCustomAPI } from "@/server/utils/wordpress-helper";
import { fetchCalendarEventAPI } from "../calendar-event";

export async function fetchCalendarPage({ locale, q, tags }: { locale: string; q?: string; tags?: string }) {
  let endpoint = "calendar-page";
  if (locale) {
    endpoint += `?lang=${locale}`;
  }

  const [responseData, responseEvents] = await Promise.all([
    fetchWordPressCustomAPI<WordPressPostCalendarJson>(endpoint),
    fetchCalendarEventAPI({
      q,
      tags,
    }),
  ]);

  if (!responseData) {
    throw new Error("Have Something Error In WordPress Calendar fetchWordPressCustomAPI.");
  }
  const data = serializeCalendar(responseData);

  if (!responseEvents || !responseEvents.events) {
    throw new Error("The 'Calendar Events' data is not exit");
  }
  const events = serializeCalendarEvents(responseEvents.events as any);

  return { data: data, events: events };
}
