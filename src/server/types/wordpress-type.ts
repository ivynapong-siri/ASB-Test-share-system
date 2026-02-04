export type WordPressYoastSEO = {
  title: string;
  description: string;
  robots: {
    index: string;
    follow: string;
    "max-snippet": string;
    "max-image-preview": string;
    "max-video-preview": string;
  };
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description?: string;
  og_url: string;
  og_site_name: string;
  og_image?: string;
  article_modified_time: string;
  twitter_card: string;
  twitter_title?: string;
  twitter_description?: string;
  focuskw?: string;
  meta_keywords?: string;
  schema: {
    "@context": string;
    "@graph": Array<{
      "@type": string;
      "@id": string;
      url?: string;
      name?: string | null;
      isPartOf?: { "@id": string };
      datePublished?: string;
      dateModified?: string;
      breadcrumb?: { "@id": string };
      description?: string | null;
      inLanguage?: string;
      potentialAction?: Array<{
        "@type": string;
        target: string[];
      }>;
    }>;
  };
};

export type WordPressPage = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  type: string;
  link: string;
  acf: Record<string, any>;
  yoast_head_json?: WordPressYoastSEO;
};

export type WordPressAnnouncementJson = {
  id: number;
  title: string;
  description: string;
  button_label: string;
  button_url: string;
};

export type WordPressIconJson = {
  id: string;
  title: string;
  acf: { icon: WordPressImageJson };
};

export type WordPressDirectNavigationItemJson = {
  title: string;
  url: string;
  order: number;
};

export type WordPressDirectNavigationNavigationCategoryJson = {
  [category: string]: WordPressDirectNavigationItemJson[];
};

export type WordPressDirectNavigationMenusJson = {
  navigations: WordPressDirectNavigationNavigationCategoryJson[];
};

export type WordPressFilterNewsJson = {
  NEWS: WordPressCardJson[];
};

export type WordPressSharedSectionJson = {
  id: string;
  title: string;
  acf: {
    cards: WordPressCardJson[];
  };
  link: string;
};

export type WordPressSharedSectionsJson = {
  [key: string]: WordPressSharedSectionJson[];
};

export type WordPressImageJson = {
  ID: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  mime_type: string;
  alt: string;
  type: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    medium: string;
    medium_large: string;
    large: string;
    "1536x1536": string;
    "2048x2048": string;
    tenweb_optimizer_mobile: string;
    tenweb_optimizer_tablet: string;
  };
};

export type WordPressAdmissionKeyDateCardsJson = {
  acf_fields: {
    id: number;
    title: string;
    badge: string;
    description: string;
    from: string;
    to: string;
    grade: string;
  };
};

export type WordPressAdmissionKeyDateJson = {
  early_years: { title: string; admissions: WordPressAdmissionKeyDateCardsJson[] };
  elementary: { title: string; admissions: WordPressAdmissionKeyDateCardsJson[] };
  middle_school: { title: string; admissions: WordPressAdmissionKeyDateCardsJson[] };
  high_school: { title: string; admissions: WordPressAdmissionKeyDateCardsJson[] };
};

export type WordPressAdmissionKeyDateAcfJson = WordPressAdmissionKeyDateJson & {
  search_button_label: string;
  search_field_label: string;
  ribbon_text: string;
  title: string;
};

export type WordPressTuitionAndFeesDataJson = {
  tuition_and_fees: WordPressTuitionFeesJson;
  application_fees: WordPressSimpleTuitionAndFeesJson;
  refundable_deposit: WordPressSimpleTuitionAndFeesJson;
  registration_fee: WordPressRegistrationFeeJson;
  school_development_fund: WordPressSchoolDevelopmentFundJson;
  ell_fees: WordPressSimpleTuitionAndFeesJson;
  sibling_discount_policies: WordPressSiblingDiscountPoliciesJson;
  remark: WordPressAdditionalRemarksJson;
  payment_methods: WordPressPaymentMethodsJson;
  tuition_fee_per_semester: WordPressTuitionFeesJson;
};

export type WordPressTuitionFeesJson = {
  ID: number;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_status: string;
  post_modified: string;
  acf_fields: {
    title: string;
    subtitle: string;
    description: string;
    currency_label: string;
    early_years: {
      division: string;
      grade_group_1: string;
      grade_group_1_semester: string;
      grade_group_1_annual: string;
      grade_group_2: string;
      grade_group_2_semester: string;
      grade_group_2_annual: string;
      grade_group_3: string;
      grade_group_3_semester: string;
      grade_group_3_annual: string;
      grade_group_4: string;
      grade_group_4_semester: string;
      grade_group_4_annual: string;
    };
    elementary: {
      division: string;
      grade_group_1: string;
      grade_group_1_semester: string;
      grade_group_1_annual: string;
    };
    middle_school: {
      division: string;
      grade_group_1: string;
      grade_group_1_semester: string;
      grade_group_1_annual: string;
    };
    high_school: {
      division: string;
      grade_group_1: string;
      grade_group_1_semester: string;
      grade_group_1_annual: string;
    };
    table_settings: {
      pages: {
        admission_and_process: {
          table_header_1: string;
          table_header_2: string;
          table_header_3: string;
        };
        tuition_and_fees: {
          table_header_1: string;
          table_header_2: string;
          table_header_3: string;
          table_header_4: string;
        };
      };
    };
  };
};

export type WordPressSimpleTuitionAndFeesJson = {
  title: string;
  description: string;
};

export type WordPressTuitionAndFeesTableRow = {
  amount: string;
  description: string;
};

export type WordPressRegistrationFeeJson = WordPressSimpleTuitionAndFeesJson & {
  table: {
    table_label: string;
    header: {
      header_1: string;
      header_2: string;
    };
    row_1: WordPressTuitionAndFeesTableRow;
    row_2: WordPressTuitionAndFeesTableRow;
    row_3: WordPressTuitionAndFeesTableRow;
  };
};

export type WordPressSchoolDevelopmentFundJson = WordPressSimpleTuitionAndFeesJson & {
  table: {
    table_label: string;
    header: {
      header_1: string;
      header_2: string;
    };
    row_1: WordPressTuitionAndFeesTableRow;
    row_2: WordPressTuitionAndFeesTableRow;
    row_3: WordPressTuitionAndFeesTableRow;
    row_4: WordPressTuitionAndFeesTableRow;
  };
};

export type WordPressSiblingDiscountPoliciesJson = WordPressSimpleTuitionAndFeesJson & {
  table: {
    table_label: string;
    header: {
      header_1: string;
      header_2: string;
      header_3: string;
    };
    row_1: {
      discount_1: string;
      discount_2: string;
      discount_3: string;
    };
  };
};

export type WordPressAdditionalRemarksJson = WordPressSimpleTuitionAndFeesJson & {
  additional_remarks: WordPressSimpleTuitionAndFeesJson;
  learning_support_fees: WordPressSimpleTuitionAndFeesJson;
  school_fee_refund_policy: WordPressSimpleTuitionAndFeesJson;
};

export type WordPressPaymentMethodsJson = WordPressSimpleTuitionAndFeesJson & {
  cheque: WordPressSimpleTuitionAndFeesJson;
  credit_card: WordPressSimpleTuitionAndFeesJson;
  bank_transfer: WordPressSimpleTuitionAndFeesJson;
};

export type WordPressFAQJson = {
  ID: number;
  post_date: string;
  post_content: string;
  post_title: string;
  post_status: string;
  post_name: string;
  post_modified: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  filter: string;
  acf_fields: {
    question: string;
    answer: string;
  };
};

export type WordPressCardJson = {
  ID: number;
  post_author: string;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_status: string;
  post_modified: string;
  guid: string;
  acf_fields: {
    news_id: number | false;
    title: string;
    description: string;
    description_mobile: string;
    badge: string;
    subject: string;
    subtitle: string;
    rich_text_description?: string;
    button_label: string;
    button_url: string;
    ribbon_text: string;
    from: string;
    to: string;
    image: WordPressImageJson;
    image_2: WordPressImageJson;
    image_mobile: WordPressImageJson;
    catg: string;
  };
};

export type WordPressSectionJson = {
  ID: number;
  post_author: string;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_modified: string;
  guid: string;
  acf_fields: {
    breadcrumbs_1: string;
    breadcrumbs_2: string;
    breadcrumbs_3: string;
    cards: WordPressCardJson[] | false;
    profiles: WordPressTabProfile[] | false;
    image: WordPressImageJson | false;
    image_2: WordPressImageJson | false;
    image_mobile: WordPressImageJson | false;
    faqs: WordPressFAQJson[] | false;
    description: string;
    button_label: string;
    view_more_button_label: string;
    view_more_button_url: string;
    button_url: string;
    ribbon_text: string;
    icon: WordPressImageJson[];
    title: string;
    subtitle: string;
    header: string;
    title_line_1: string;
    title_line_2: string;
    header_4: string;
    header_2: string;
    header_3: string;
    highlight_text: string;
    highlight_text_1: string;
    tuition_and_fees: WordPressTuitionFeesJson | false;
    tuition_fee_per_semester: WordPressTuitionFeesJson | false;
  };
};

export type WordPressSectionWithTabsJson = {
  ID: number;
  post_author: string;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_modified: string;
  guid: string;
  acf_fields: {
    breadcrumbs_1: string;
    breadcrumbs_2: string;
    breadcrumbs_3: string;
    title: string;
    ribbon_text: string;
    description: string;
    tabs: WordPressTabJson[] | false;
    main_button_url: string;
    main_button_label: string;
    button_label_left: string;
    button_url_left: string;
    button_label_right: string;
    button_url_right: string;
    selected_title: string;
    tabs_text: string;
    filter_label: string;
  };
};

export type WordPressTabJson = {
  ID: number;
  post_author: string;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_modified: string;
  guid: string;
  acf_fields: {
    title: string;
    description: string;
    tab_cards: WordPressCardJson[] | false;
    tab_profiles: WordPressTabProfile[] | false;
    tab_admissions: WordPressTabAdmissionsJson[] | false;
    tab_events: WordPressCardJson[] | false;
    tab_faqs: WordPressFAQJson[] | false;
    tabs: WordPressCardJson[] | false;
  };
};

export type WordPressTabAdmissionsJson = {
  ID: number;
  post_author: string;
  post_date: string;
  post_title: string;
  post_name: string;
  post_type: string;
  post_modified: string;
  guid: string;
  acf_fields: {
    title: string;
    description: string;
    badge: string;
    from: string;
    to: string;
  };
};

export type WordPressTabProfile = {
  ID: number;
  guid: string;
  menu_order: number;
  post_type: string;
  acf_fields: {
    firstName: string;
    middleName?: string;
    lastName: string;
    imageUrl: string;
    profileType: string;
    badgeLabel: string;
    position: string;
    nationality: string;
    nationalityFlagUrl: string;
    experience: string;
    quote: string;
    quoteAuthor: string;
    qualifications: string;
    about: string;
    buttonLabel: string;
    buttonUrl: string;
  };
};

export type WordPressPageSettingHeaderSettingJson = {
  search_button_label: string;
  apply_now_url: string;
  contact_us_button: WordPressPageSettingButtonJson;
  book_a_tour_button: WordPressPageSettingButtonJson;
  apply_now_button: WordPressPageSettingButtonJson;
  calendar_button: WordPressPageSettingButtonJson;
  boarding_button: WordPressPageSettingButtonJson;
};

export type WordPressPageSettingButtonJson = { button_label: string; button_url: string };

export type WordPressPageSettingFooterSettingJson = {
  contact_setting: {
    title: string;
    school_contact_title: string;
    school_contact_phone_number: string;
    admission_contact_title: string;
    admission_contact_phone_number: string;
    contact: {
      id: number;
      title: string;
      type: string;
      acf_fields: {
        phone_label: string;
        phone_number: string;
        admission_hotline_label: string;
        admission_hotline_number: string;
        email_label: string;
        email: string;
        address_name: string;
        address: string;
        google_map: boolean;
        google_map_url: string;
      };
    };
  };
  social_network: {
    facebook_url: string;
    instagram_url: string;
    youtube__url: string;
  };
};

export type WordPressPageSettingMenuJson = {
  id: number;
  title: string;
  type: string;
  acf_fields: {
    title: string;
    url: string;
    order: string;
  };
};

export type WordPressPageSettingMenuGroupJson = {
  title: string;
  menus: WordPressPageSettingMenuJson[];
};

export type WordPressPageSettingMenuGroupsJson = {
  about_us: WordPressPageSettingMenuGroupJson;
  admission: WordPressPageSettingMenuGroupJson;
  academics: WordPressPageSettingMenuGroupJson;
  student_support: WordPressPageSettingMenuGroupJson;
  "co-curricular_life": WordPressPageSettingMenuGroupJson;
  our_community: WordPressPageSettingMenuGroupJson;
};

export type WordPressPageSettingCustomLandingJson = {
  label: string;
  show_custom_page: boolean;
};

export type WordPressBannerNewsJson = {
  title: string;
  button_label: string;
};

export type WordPressModalDataJson = {
  title: string;
  description: string;
  copy_button_label: string;
  copy_to_clipboard_label: string;
};

export type WordPressPageSettingJson = {
  "page-setting": {
    id: number;
    title: string;
    acf_fields: {
      header_setting: WordPressPageSettingHeaderSettingJson;
      footer_setting: WordPressPageSettingFooterSettingJson;
      menu_group: WordPressPageSettingMenuGroupsJson;
      custom_landing: WordPressPageSettingCustomLandingJson;
      shared_banner: WordPressBannerNewsJson;
      shared_modal_data: WordPressModalDataJson;
    };
  };
};

export type WordPressNavBoxJson = {
  title: string;
  subtitle: string;
  button_label: string;
  button_url: string;
};

export type WordPressNewsGroupJson = {
  News: WordPressNewsGroupDetailJson[];
  Article: WordPressNewsGroupDetailJson[];
  Event: WordPressNewsGroupDetailJson[];
  uncategorized: WordPressNewsGroupDetailJson[];
};

export type WordPressNewsGroupDetailJson = {
  id: number;
  title: string;
  slug: string;
  acf_fields: {
    breadcrumbs_1: string;
    breadcrumbs_2: string;
    ribbon_text: string;
    badge: string;
    title: string;
    image: WordPressImageJson;
    date: string;
    section: (WordPressSectionJson | WordPressSectionWithTabsJson)[];
    image_2: WordPressImageJson;
    hashtags: WordPressNewsHashtags[];
    news_type: string;
    news_filter: string;
    description: string;
    description_mobile: string;
    galleries: WordPressNewsGroupGalleriesJson[];
    subcategory: string;
  };
};

export type WordPressNewsGroupGalleriesJson = {
  attachment: {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
  };
  metadata: {
    full: WordPressNewsGroupGalleriesMetaDataJson;
    medium: WordPressNewsGroupGalleriesMetaDataJson;
    large: WordPressNewsGroupGalleriesMetaDataJson;
    thumbnail: WordPressNewsGroupGalleriesMetaDataJson;
    medium_large: WordPressNewsGroupGalleriesMetaDataJson;
    "1536x1536": WordPressNewsGroupGalleriesMetaDataJson;
    "2048x2048": WordPressNewsGroupGalleriesMetaDataJson;
    tenweb_optimizer_mobile: WordPressNewsGroupGalleriesMetaDataJson;
    tenweb_optimizer_tablet: WordPressNewsGroupGalleriesMetaDataJson;
  };
};

export type WordPressNewsGroupGalleriesMetaDataJson = {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  file_size: number;
  file_url: string;
};

export type WordPressNewsHashtags = {
  id: number;
  title: string;
  type: string;
  acf_fields: {
    title: string;
    order: string;
    url: string;
  };
};

export type WordPressLandingDetailJson = {
  id: number;
  title: string;
  slug: string;
  link: string;
  content?: string;
};
