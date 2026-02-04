import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeBookATourPage } from "@/server/serializers/pages/book-a-tour-serializer";
import { serializeThankyouPage } from "@/server/serializers/pages/thankyou-page-serializer";

export async function fetchBookATourPage({ slugBookATour, locale }: { slugBookATour: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugBookATour, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "book-a-tour"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'home' page does not have an ACF object.");
  }
  const data = serializeBookATourPage(page.acf as any);
  return data;
}

export async function fetchThankyouForBookingPage({ slugThankyou, locale }: { slugThankyou: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugThankyou, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    next: {
      tags: ["wordpress", "book-a-tour"],
      revalidate: 3600, // 1 hour
    },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'thank' page does not have an ACF object.");
  }
  const data = serializeThankyouPage(page.acf as any);
  return data;
}
