import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";
import { serializeContactUsPage } from "@/server/serializers/pages/contact-us-serializer";
import { serializeThankyouPage } from "@/server/serializers/pages/thankyou-page-serializer";

export async function fetchContactUsPage({ slugContactUs, locale }: { slugContactUs: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugContactUs, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "contact-us"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'home' page does not have an ACF object.");
  }
  const data = serializeContactUsPage(page.acf as any);
  return data;
}

export async function fetchThankyouPage({ slugThankyou, locale }: { slugThankyou: string; locale: string }) {
  const endpoint = convertLocaleSlug(slugThankyou, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "contact-us"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'home' page does not have an ACF object.");
  }
  const data = serializeThankyouPage(page.acf as any);
  return data;
}
