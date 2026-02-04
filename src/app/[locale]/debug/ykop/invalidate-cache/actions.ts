"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// Supported locales
const LOCALES = ["en", "ja", "ko", "th", "zh-hans"];

// All base paths (no locale prefix)
const BASE_PATHS = [
  "/home",

  "/about-us/xcl-asb-story",
  "/about-us/history",
  "/about-us/xcl-education",
  "/about-us/head-of-school",
  "/about-us/vision-and-mission",
  "/about-us/our-team",
  "/about-us/school-facilities",

  "/admission/admission-and-process",
  "/admission/age-guidelines-for-entry",
  "/admission/admission-key-dates",
  "/admission/tuition-and-fees",
  "/admission/scholarship",
  "/admission/application-portal",
  "/admission/faq",
  "/admission/apply-now",
  "/admission/apply-now/thankyou",

  "/curriculum/american-curriculum",
  "/curriculum/early-years-program",
  "/curriculum/elementary-program",
  "/curriculum/middle-school-program",
  "/curriculum/high-school-program",
  "/curriculum/english-language-learner-program",
  "/curriculum/project-based-learning-activities",
  "/curriculum/high-school-program/advanced-placement",

  "/student-support",
  "/student-support/safety-and-security",
  "/student-support/university-preparation",
  "/student-support/school-uniform",
  "/student-support/school-bus-service",
  "/student-support/pastoral-care",

  "/co-curricular-life/life-at-xcl-asb-sukhumvit",
  "/co-curricular-life/academics-activities",
  "/co-curricular-life/sports",
  "/co-curricular-life/field-trips",
  "/co-curricular-life/performing-and-fine-arts",
  "/co-curricular-life/holidays-and-celebrations",
  "/co-curricular-life/community-outreach-program",
  "/co-curricular-life/after-school-program",
  "/co-curricular-life/summer-school-program",

  "/our-community/the-xcl-asb-sukhumvit-family",
  "/our-community/news",
  "/our-community/our-voices",
  "/our-community/parent-involvement",
  "/our-community/success-stories",
  "/our-community/work-with-us",

  "/contact-us",
  "/contact-us/thankyou",
  "/calendar",
  "/book-a-tour",
  "/book-a-tour/thankyou",
  "/privacy-policy",
  "/landing/boarding/thankyou",
];

// Generate localized paths
const PATHS_TO_REVALIDATE = LOCALES.flatMap((locale) => BASE_PATHS.map((path) => `/${locale}${path}`));

// Server Action to invalidate cache
export async function invalidateCache() {
  try {
    // Invalidate WordPress cache
    revalidateTag("wordpress");

    // Invalidate all localized pages
    for (const path of PATHS_TO_REVALIDATE) {
      revalidatePath(path);
    }

    return {
      success: true,
      message: "Cache invalidated successfully",
      totalPages: PATHS_TO_REVALIDATE.length,
    };
  } catch (error) {
    console.error("Error invalidating cache:", error);
    return {
      success: false,
      message: String(error),
      totalPages: 0,
    };
  }
}
