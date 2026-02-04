import {
  WordPressBannerNewsJson,
  WordPressModalDataJson,
  WordPressPageSettingButtonJson,
  WordPressPageSettingCustomLandingJson,
  WordPressPageSettingFooterSettingJson,
  WordPressPageSettingHeaderSettingJson,
  WordPressPageSettingJson,
  WordPressPageSettingMenuGroupJson,
  WordPressPageSettingMenuGroupsJson,
  WordPressPageSettingMenuJson,
} from "../types/wordpress-type";

export type PageSettingsJson = ReturnType<typeof serializePageSettings>;
export type HeaderSettingsJson = ReturnType<typeof serializeHeaderSettings>;
export type ContactSettingJson = ReturnType<typeof serializeContactSetting>;
export type FooterSettingsJson = ReturnType<typeof serializeFooterSettings>;
export type MenuGroupsJson = ReturnType<typeof serializeMenuGroups>;
export type MenuGroupJson = ReturnType<typeof serializeMenuGroup>;
export type MenuItemJson = ReturnType<typeof serializeMenuItem>;
export type CustomLandingJson = ReturnType<typeof serializeCustomLanding>;
export type NewsSharedSettingJson = ReturnType<typeof serializeNewsSharedSettings>

export const serializeHeaderSettings = (data: WordPressPageSettingHeaderSettingJson) => {
  return {
    searchButtonLabel: data.search_button_label,
    applyNowUrl: data.apply_now_url,
    contactUsButton: data.contact_us_button && serializeNavbarSettingButton(data.contact_us_button),
    bookATourButton: data.book_a_tour_button && serializeNavbarSettingButton(data.book_a_tour_button),
    applyNowButton: data.apply_now_button && serializeNavbarSettingButton(data.apply_now_button),
    calendarButton: data.calendar_button && serializeNavbarSettingButton(data.calendar_button),
    boardingButton: data.boarding_button && serializeNavbarSettingButton(data.boarding_button),
  };
};

export const serializeNavbarSettingButton = (data: WordPressPageSettingButtonJson) => {
  return {
    buttonLabel: data.button_label,
    buttonUrl: data.button_url,
  };
};

export const serializeMenuItem = (data: WordPressPageSettingMenuJson) => {
  return {
    id: data.id,
    title: data.acf_fields.title,
    url: data.acf_fields.url,
    order: Number(data.acf_fields.order),
  };
};

export const serializeMenuGroup = (data: WordPressPageSettingMenuGroupJson) => {
  return {
    title: data.title,
    menus: data.menus ? data.menus.map(serializeMenuItem) : [],
  };
};

export const serializeMenuGroups = (data: WordPressPageSettingMenuGroupsJson) => {
  return {
    aboutUs: serializeMenuGroup(data.about_us),
    admission: serializeMenuGroup(data.admission),
    academics: serializeMenuGroup(data.academics),
    studentSupport: serializeMenuGroup(data.student_support),
    coCurricularLife: serializeMenuGroup(data["co-curricular_life"]),
    ourCommunity: serializeMenuGroup(data.our_community),
  };
};

export const serializeContactSetting = (data: WordPressPageSettingFooterSettingJson["contact_setting"]) => {
  return {
    title: data.title ?? "",
    schoolContactTitle: data.school_contact_title,
    schoolContactPhoneNumber: data.school_contact_phone_number,
    admissionContactTitle: data.admission_contact_title,
    admissionContactPhoneNumber: data.school_contact_phone_number,
    contact: {
      id: data.contact.id,
      title: data.contact.title,
      type: data.contact.type,
      phoneLabel: data.contact.acf_fields.phone_label,
      phoneNumber: data.contact.acf_fields.phone_number,
      admissionHotlineLabel: data.contact.acf_fields.admission_hotline_label,
      admissionHotlineNumber: data.contact.acf_fields.admission_hotline_number,
      emailLabel: data.contact.acf_fields.email_label,
      email: data.contact.acf_fields.email,
      addressName: data.contact.acf_fields.address_name,
      address: data.contact.acf_fields.address,
      googleMap: data.contact.acf_fields.google_map,
      googleMapUrl: data.contact.acf_fields.google_map_url,
    },
  };
};

export const serializeFooterSettings = (data: WordPressPageSettingFooterSettingJson) => {
  const { contact_setting, social_network } = data;
  return {
    contactSetting: {
      title: contact_setting.title,
      schoolContactTitle: contact_setting.school_contact_title,
      schoolContactPhoneNumber: contact_setting.school_contact_phone_number,
      admissionContactTitle: contact_setting.admission_contact_title,
      admissionContactPhoneNumber: contact_setting.admission_contact_phone_number,
      contact: {
        id: contact_setting.contact.id,
        title: contact_setting.contact.title,
        type: contact_setting.contact.type,
        phoneLabel: contact_setting.contact.acf_fields.phone_label,
        phoneNumber: contact_setting.contact.acf_fields.phone_number,
        admissionHotlineLabel: contact_setting.contact.acf_fields.admission_hotline_label,
        admissionHotlineNumber: contact_setting.contact.acf_fields.admission_hotline_number,
        emailLabel: contact_setting.contact.acf_fields.email_label,
        email: contact_setting.contact.acf_fields.email,
        addressName: contact_setting.contact.acf_fields.address_name,
        address: contact_setting.contact.acf_fields.address,
        googleMap: contact_setting.contact.acf_fields.google_map,
        googleMapUrl: contact_setting.contact.acf_fields.google_map_url,
      },
    },
    socialNetwork: {
      facebookUrl: social_network.facebook_url,
      instagramUrl: social_network.instagram_url,
      youtubeUrl: social_network.youtube__url,
    },
  };
};

export const serializeCustomLanding = (data: WordPressPageSettingCustomLandingJson) => {
  return {
    label: data.label,
    showInMenu: data.show_custom_page,
  };
};

export const serializeNewsBanner = (data: WordPressBannerNewsJson) => {
  return {
    title: data.title,
    buttonLabel: data.button_label,
  };
};

export const serializeModalData = (data: WordPressModalDataJson) => {
  return {
    title: data.title,
    description: data.description,
    copyButtonLabel: data.copy_button_label,
    copyToClipboardLabel: data.copy_to_clipboard_label,
  };
};

export const serializeNewsSharedSettings = (data: WordPressPageSettingJson["page-setting"]["acf_fields"]) => {
  return {
    newsBannerSetting: serializeNewsBanner(data.shared_banner),
    modalDataSetting: serializeModalData(data.shared_modal_data),
  };
};

export const serializePageSettings = (data: WordPressPageSettingJson) => {
  const { "page-setting": pageSetting } = data;
  return {
    pageSetting: {
      id: pageSetting.id,
      title: pageSetting.title,
      headerSetting: serializeHeaderSettings(pageSetting.acf_fields.header_setting),
      footerSetting: serializeFooterSettings(pageSetting.acf_fields.footer_setting),
      menuGroups: serializeMenuGroups(pageSetting.acf_fields.menu_group),
      customLanding: serializeCustomLanding(pageSetting.acf_fields.custom_landing),
      newsSharedSetting: serializeNewsSharedSettings(pageSetting.acf_fields),
    },
  };
};
