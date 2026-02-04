import {
  WordPressAdditionalRemarksJson,
  WordPressPaymentMethodsJson,
  WordPressRegistrationFeeJson,
  WordPressSchoolDevelopmentFundJson,
  WordPressSectionJson,
  WordPressSectionWithTabsJson,
  WordPressSiblingDiscountPoliciesJson,
  WordPressSimpleTuitionAndFeesJson,
  WordPressTuitionFeesJson,
} from "@/server/types/wordpress-type";
import {
  WordPressAdmissionPageJson,
  WordPressApplicationPortalPageJson,
} from "@/server/types/wordpress/admission-type";
import { serializeSection, serializeSectionWithTab } from "../section-serializer";

import { WordPressThankyouPageJson } from "@/server/types/wordpress/thankyou-type";
import { isObject } from "@/server/utils/helpers";
import { serializeAdmissionKeyDateSection } from "../admission-key-date-serializer";
import { serializeFAQs } from "../faq-serializer";
import { serializeImage } from "../image-serializer";
import { serializeNavBox } from "../nav-box-serializer";
import { serializeAdditionalRemark } from "../tuition-and-fees/additional-remark-serializer";
import { serializePaymentMethod } from "../tuition-and-fees/payment-methods-serializer";
import { serializeRegistrationFee } from "../tuition-and-fees/registration-fee-serializer";
import { serializeSchoolDevelopmentFund } from "../tuition-and-fees/shcool-development-fund-serializer";
import { serializeSiblingDiscountPolicies } from "../tuition-and-fees/sibling-discount-policies-serializer";
import { serializeSimpleTuitionAndFees } from "../tuition-and-fees/simple-tuition-and-fees-serializer";
import { serializeTuitionAndFees } from "../tuition-and-fees/tuition-and-fees-serializer";

export type AdmissionPageJson = ReturnType<typeof serializeAdmissionPage>;
export type TuitionAndFeesDataJson = ReturnType<typeof serializeAdmissionPage>["tuitionAndFees"];
export type ApplicationPortalPageJson = ReturnType<typeof serializeApplicationPortalPage>;
export type ApplicationSuccessPageJson = ReturnType<typeof serializeApplicationSuccessPage>;

export const serializeAdmissionPage = (data: WordPressAdmissionPageJson) => {
  const faqs = Array.isArray(data.faqs) ? serializeFAQs(data.faqs) : null;
  const serializeSectionData = (section: WordPressSectionJson | WordPressSectionWithTabsJson) =>
    section.post_type === "section-with-tabs"
      ? serializeSectionWithTab(section as WordPressSectionWithTabsJson)
      : serializeSection(section as WordPressSectionJson);
  const tuitionAndFees =
    isObject(data.tuition_and_fees) && data.tuition_and_fees
      ? serializeTuitionAndFees(data.tuition_and_fees as WordPressTuitionFeesJson)
      : null;
  const applicationFees =
    isObject(data.application_fees) && data.application_fees
      ? serializeSimpleTuitionAndFees(data.application_fees as WordPressSimpleTuitionAndFeesJson)
      : null;
  const refundableDeposit =
    isObject(data.refundable_deposit) && data.refundable_deposit
      ? serializeSimpleTuitionAndFees(data.refundable_deposit as WordPressSimpleTuitionAndFeesJson)
      : null;
  const registrationFee =
    isObject(data.registration_fee) && data.registration_fee
      ? serializeRegistrationFee(data.registration_fee as WordPressRegistrationFeeJson)
      : null;
  const schoolDevelopmentFund =
    isObject(data.school_development_fund) && data.school_development_fund
      ? serializeSchoolDevelopmentFund(data.school_development_fund as WordPressSchoolDevelopmentFundJson)
      : null;
  const ellFees =
    isObject(data.ell_fees) && data.ell_fees
      ? serializeSimpleTuitionAndFees(data.ell_fees as WordPressSimpleTuitionAndFeesJson)
      : null;
  const siblingDiscountPolicies =
    isObject(data.sibling_discount_policies) && data.sibling_discount_policies
      ? serializeSiblingDiscountPolicies(data.sibling_discount_policies as WordPressSiblingDiscountPoliciesJson)
      : null;
  const additionalRemarks =
    isObject(data.remark) && data.remark
      ? serializeAdditionalRemark(data.remark as WordPressAdditionalRemarksJson)
      : null;
  const paymentMethods =
    isObject(data.payment_methods) && data.payment_methods
      ? serializePaymentMethod(data.payment_methods as WordPressPaymentMethodsJson)
      : null;
  const admissionKeyDate =
    data.early_years &&
    data.elementary &&
    data.middle_school &&
    data.high_school &&
    serializeAdmissionKeyDateSection(data);

  return {
    mainBanner: data.main_banner,
    mainBannerMobile: data.main_banner_mobile,
    breadcrumbs1: data.breadcrumbs_1,
    breadcrumbs2: data.breadcrumbs_2,
    headerTitle: data.header_title,
    headerDescription: data.header_description,
    buttonLabel: data.button?.button_label ?? null,
    name: data.name ?? null,
    image: data.image ?? null,
    signatureImage: data.signature_image ?? null,
    description: data.description ?? null,
    position: data.position ?? null,
    ribbonText: data.ribbon_text ?? null,
    buttonUrl: data.button?.button_url ?? null,
    sections: data.section && data.section.length > 0 ? data.section.map(serializeSectionData) : null,
    title: data.title,
    searchButtonLabel: data.search_button_label,
    searchFieldLabel: data.search_field_label,
    admissionKeyDate,
    tuitionAndFees: {
      tuitionAndFees: tuitionAndFees,
      applicationFees: applicationFees,
      refundableDeposit: refundableDeposit,
      registrationFee: registrationFee,
      schoolDevelopmentFund: schoolDevelopmentFund,
      ellFees: ellFees,
      siblingDiscountPolicies: siblingDiscountPolicies,
      additionalRemarks: additionalRemarks,
      paymentMethods: paymentMethods,
    },
    faqs,
    navBox1: data.nav_box_1 ? serializeNavBox(data.nav_box_1) : null,
    navBox2: data.nav_box_2 ? serializeNavBox(data.nav_box_2) : null,
    ageGuidelinesTable: data.age_guidelines_table ?? null,
    ageGuidelinesTitle: data.age_guidelines_title ?? null,
    appFeesTable: data.application_fees_table ?? null,
    applicationFeeslinesTitle:
      data.application_fees && data.application_fees.title ? data.application_fees.title : null,
    applicationFeeslinesDescription:
      data.application_fees && data.application_fees.description ? data.application_fees.description : null,
  };
};

export const serializeApplicationPortalPage = (data: WordPressApplicationPortalPageJson) => {
  const image = isObject(data.image) ? serializeImage(data.image) : null;
  return {
    ribbonText: data.ribbon_text ?? null,
    title1: data.title_1 ?? null,
    title2: data.title_2 ?? null,
    description: data.description,
    image,
    buttonLabel: data.button_label ?? null,
    buttonUrl: data.button_url ?? null,
    instructions: [
      {
        title: data.instructions_1,
        description: data.instruction_desc_1,
      },
      {
        title: data.instructions_2,
        description: data.instruction_desc_2,
      },
      {
        title: data.instructions_3,
        description: data.instruction_desc_3,
      },
    ],
    instructionEnd: data.instruction_end ?? null,
  };
};

export const serializeApplicationSuccessPage = (data: WordPressThankyouPageJson) => {
  const image = isObject(data.main_image) ? serializeImage(data.main_image) : null;
  const imageMobile = isObject(data.main_image_mobile) ? serializeImage(data.main_image_mobile) : null;
  return {
    ribbonText: data.ribbon_text ?? null,
    title: data.title,
    description: data.description,
    buttonLabel: data.button_label ?? null,
    buttonUrl: data.button_url ?? null,
    image,
    imageMobile,
  };
};
