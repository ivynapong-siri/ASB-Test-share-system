import {
  serializeAdmissionPage,
  serializeApplicationPortalPage,
  serializeApplicationSuccessPage,
} from "@/server/serializers/pages/admission-serializer";

import { convertLocaleSlug } from "@/client/utils/helper";
import { fetchPages } from "../fetch";

export async function fetchAdmissionPage({ slug, locale }: { slug: string; locale: string }) {
  const endpoint = convertLocaleSlug(slug, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "admission"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'admission' page does not have an ACF object.");
  }

  const data = serializeAdmissionPage(page.acf as any);
  return data;
}

export async function fetchApplicationPortalPage({
  slugApplicationPortal,
  locale,
}: {
  slugApplicationPortal: string;
  locale: string;
}) {
  const endpoint = convertLocaleSlug(slugApplicationPortal, locale);

  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    next: {
      tags: ["wordpress", "admission", "application-portal"],
      revalidate: 3600, // 1 hour
    },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'application portal' page does not have any object.");
  }

  const data = serializeApplicationPortalPage(page.acf as any);
  return data;
}

export async function fetchApplicationSuccessPage({
  slugAdmissionApplySuccess,
  locale,
}: {
  slugAdmissionApplySuccess: string;
  locale: string;
}) {
  const endpoint = convertLocaleSlug(slugAdmissionApplySuccess, locale);
  const response = await fetchPages({
    slug: endpoint,
    locale: locale,
    // next: {
    //   tags: ["wordpress", "admission", "admission-apply-success"],
    //   revalidate: 3600, // 1 hour
    // },
  });
  const [page] = response;
  if (!page || !page.acf) {
    throw new Error("The 'application success' page does not have any object.");
  }

  const data = serializeApplicationSuccessPage(page.acf as any);
  return data;
}
