import { WordPressThankyouPageJson } from "@/server/types/wordpress/thankyou-type";

export type ThankyouPageJson = ReturnType<typeof serializeThankyouPage>;

export const serializeThankyouPage = (data: WordPressThankyouPageJson) => {
  return {
    ribbonText: data.ribbon_text ?? null,
    mainBanner: data.main_image,
    mainBannerMobile: data.main_image_mobile,
    headerTitle: data.title,
    headerDescription: data.description,
    buttonLebel: data.button_label ?? null,
    buttonUrl: data.button_url ?? null,
  };
};
