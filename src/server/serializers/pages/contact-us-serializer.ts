import { WordPressContactUsPageJson } from "@/server/types/wordpress/contact-us-type";
import { serializeNavBox } from "../nav-box-serializer";

export type ContactUsPageJson = ReturnType<typeof serializeContactUsPage>;

export const serializeContactUsPage = (data: WordPressContactUsPageJson) => {
  return {
    mainBanner: data.main_banner,
    mainBannerMobile: data.main_banner_mobile,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    ribbonText: data.ribbon_text ?? null,
    jotformId: data.jotform_id ?? null,
    title: data.title ?? null,
    description: data.description ?? null,
    contactBoxTitle: data.contact_setting.title ?? null,
    contactBoxTitle2: data.contact_setting.title_2 ?? null,
    contactPhoneLabel: data.contact_setting.contact?.acf_fields.phone_label ?? null,
    contactPhoneNumber: data.contact_setting.contact?.acf_fields.phone_number ?? null,
    admissionHotlineLabel: data.contact_setting.contact?.acf_fields.admission_hotline_label ?? null,
    admissionHotlineNumber: data.contact_setting.contact?.acf_fields.admission_hotline_number ?? null,
    contactEmailLabel: data.contact_setting.contact?.acf_fields.email_label ?? null,
    contactEmail: data.contact_setting.contact?.acf_fields.email ?? null,
    addressLabel: data.contact_setting.contact?.acf_fields.address_label ?? null,
    contactAddress: data.contact_setting.contact?.acf_fields.address ?? null,
    googleMapUrl: data.contact_setting.contact?.acf_fields.google_map_url ?? null,
    navBox1: data.nav_box_1 ? serializeNavBox(data.nav_box_1) : null,
  };
};
