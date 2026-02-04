import { WordPressSectionJson, WordPressSectionWithTabsJson, WordPressTuitionFeesJson } from "../types/wordpress-type";

import { isObject } from "../utils/helpers";
import { serializeCards } from "./card-serializer";
import { serializeFAQs } from "./faq-serializer";
import { serializeImage } from "./image-serializer";
import { serializeProfiles } from "./profile-serializer";
import { serializeTabs } from "./tab-serializer";
import { serializeTuitionAndFees } from "./tuition-and-fees/tuition-and-fees-serializer";

export type SectionJson = ReturnType<typeof serializeSection>;
export type SectionWithTabJson = ReturnType<typeof serializeSectionWithTab>;

export const serializeSection = (data: WordPressSectionJson) => {
  const cards =
    isObject(data.acf_fields) && Array.isArray(data.acf_fields.cards) ? serializeCards(data.acf_fields.cards) : null;
  const description = isObject(data.acf_fields) ? data.acf_fields.description : null;
  const buttonLabel = isObject(data.acf_fields) && data.acf_fields.button_label ? data.acf_fields.button_label : null;
  const viewMoreButtonLabel =
    isObject(data.acf_fields) && data.acf_fields.view_more_button_label ? data.acf_fields.view_more_button_label : null;
  const viewMoreButtonUrl =
    isObject(data.acf_fields) && data.acf_fields.view_more_button_url ? data.acf_fields.view_more_button_url : null;
  const buttonUrl = isObject(data.acf_fields) && data.acf_fields.button_url ? data.acf_fields.button_url : null;
  const ribbonText = isObject(data.acf_fields) ? data.acf_fields.ribbon_text : null;
  const title = isObject(data.acf_fields) ? data.acf_fields.title : null;
  const subtitle = isObject(data.acf_fields) ? data.acf_fields.subtitle : null;
  const header = isObject(data.acf_fields) ? data.acf_fields.header : null;
  const header2 = isObject(data.acf_fields) ? data.acf_fields.header_2 : null;
  const header3 = isObject(data.acf_fields) ? data.acf_fields.header_3 : null;
  const header4 = isObject(data.acf_fields) ? data.acf_fields.header_4 : null;
  const titleLine1 = isObject(data.acf_fields) ? data.acf_fields.title_line_1 : null;
  const titleLine2 = isObject(data.acf_fields) ? data.acf_fields.title_line_2 : null;
  const highlightText = isObject(data.acf_fields) ? data.acf_fields.highlight_text : null;
  const highlightText2 = isObject(data.acf_fields) ? data.acf_fields.highlight_text_1 : null;
  const image =
    isObject(data.acf_fields) && isObject(data.acf_fields.image) ? serializeImage(data.acf_fields.image) : null;
  const image2 =
    isObject(data.acf_fields) && isObject(data.acf_fields.image_2) ? serializeImage(data.acf_fields.image_2) : null;
  const imageMobile =
    isObject(data.acf_fields) && isObject(data.acf_fields.image_mobile)
      ? serializeImage(data.acf_fields.image_mobile)
      : null;
  const faqs = Array.isArray(data.acf_fields.faqs) ? serializeFAQs(data.acf_fields.faqs) : null;
  const profiles =
    isObject(data.acf_fields) && Array.isArray(data.acf_fields.profiles)
      ? serializeProfiles(data.acf_fields.profiles)
      : null;
  const tuitionAndFees =
    isObject(data.acf_fields) && data.acf_fields.tuition_and_fees
      ? serializeTuitionAndFees(data.acf_fields.tuition_and_fees as WordPressTuitionFeesJson)
      : null;
  const annualTuitionFees =
    isObject(data.acf_fields.tuition_and_fees) && data.acf_fields.tuition_and_fees
      ? serializeTuitionAndFees(data.acf_fields.tuition_and_fees as WordPressTuitionFeesJson)
      : null;
  const tuitionFeePerSemester =
    isObject(data.acf_fields.tuition_fee_per_semester) && data.acf_fields.tuition_fee_per_semester
      ? serializeTuitionAndFees(data.acf_fields.tuition_fee_per_semester as WordPressTuitionFeesJson)
      : null;

  return {
    breadcrumbs1: data.acf_fields.breadcrumbs_1,
    breadcrumbs2: data.acf_fields.breadcrumbs_2,
    breadcrumbs3: data.acf_fields.breadcrumbs_3,
    id: data.ID,
    slug: data.post_name,
    type: data.post_type,
    ribbonText,
    viewMoreButtonLabel,
    viewMoreButtonUrl,
    cards,
    description,
    buttonLabel,
    buttonUrl,
    image,
    image2,
    imageMobile,
    highlightText,
    highlightText2,
    title,
    subtitle,
    header,
    titleLine1,
    titleLine2,
    faqs,
    header2,
    header3,
    header4,
    profiles,
    tuitionAndFees,
    curriculumTuitionAndFees: {
      annualTuitionFees: annualTuitionFees,
      tuitionFeePerSemester: tuitionFeePerSemester,
    },
  };
};

export const serializeSectionWithTab = (data: WordPressSectionWithTabsJson) => {
  const { acf_fields: acfFields, ID, post_name, post_type } = data;

  return {
    id: ID,
    slug: post_name,
    type: post_type,
    breadcrumbs1: acfFields.breadcrumbs_1,
    breadcrumbs2: acfFields.breadcrumbs_2,
    breadcrumbs3: acfFields.breadcrumbs_3,
    ribbonText: acfFields?.ribbon_text ?? null,
    mainButtonUrl: acfFields?.main_button_url ?? null,
    mainButtonLabel: acfFields?.main_button_label ?? null,
    buttonLabelLeft: acfFields?.button_label_left ?? null,
    buttonUrlLeft: acfFields?.button_url_left ?? null,
    buttonLabelRight: acfFields?.button_label_right ?? null,
    buttonUrlRight: acfFields?.button_url_right ?? null,
    selectedTitle: acfFields.selected_title ?? null,
    description: acfFields?.description ?? null,
    tabs: Array.isArray(acfFields?.tabs) && acfFields.tabs.length ? serializeTabs(acfFields.tabs) : null,
    title: acfFields?.title?.length ? acfFields.title : null,
    tabsText: acfFields?.tabs_text ?? null,
    filterLabel: acfFields?.filter_label ?? null,
  };
};
