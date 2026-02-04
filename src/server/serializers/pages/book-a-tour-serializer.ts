import { WordPressBookATourPageJson } from "@/server/types/wordpress/book-a-tour-type";

export type BookATourPageJson = ReturnType<typeof serializeBookATourPage>;

export const serializeBookATourPage = (data: WordPressBookATourPageJson) => {
  return {
    mainBanner: data.main_banner,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    ribbonText: data.ribbon_text ?? null,
    jotformId: data.jotform_id ?? null,
    mainBannerMobile: data.main_banner_mobile,
    title: data.title ?? null,
    description: data.description ?? null,
  };
};
