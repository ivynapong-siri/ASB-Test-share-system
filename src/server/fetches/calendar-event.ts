import { WordPressAPIError, defaultFetchOptions } from "../utils/wordpress-helper";

import { WordPressCalendarEventsJson } from "../types/wordpress/calendar-type";

export async function fetchCalendarEventAPI({
  q,
  tags,
  next,
}: {
  q?: string;
  tags?: string;
  next?: NextFetchRequestConfig;
}): Promise<WordPressCalendarEventsJson> {
  const currentYear = new Date().getFullYear();
  const page = 1;
  const perPage = 20;

  const startDate = `01-01-${currentYear - 1}`;
  const endDate = `31-12-${currentYear + 1}`;

  let requestUrl = `https://dcb9450325.nxcli.io/wp-json/tribe/events/v1/events?page=${page}&per_page=${perPage}&start_date=${startDate}&end_date=${endDate}`;

  if (q) {
    requestUrl += `&search=${q}`;
  }
  if (tags) {
    requestUrl += ` &tags=${tags}`;
  }

  const response = await fetch(requestUrl, { ...defaultFetchOptions, ...next });
  if (!response.ok) {
    throw new WordPressAPIError(`WordPress API request failed: ${response.statusText}`, response.status, requestUrl);
  }
  return response.json();
}
