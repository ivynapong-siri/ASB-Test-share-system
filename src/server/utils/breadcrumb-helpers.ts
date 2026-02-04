export function mapPathToBreadcrumb(pathname: string): string {
  const breadcrumbPaths = new Map<string, string>([
    ["about-us", "About Us"],
    ["admission", "Admission"],
    ["xcl-asb-story", "the XCL ASB STORY"],
    ["head-of-school", "Head of School's Welcome"],
    ["vision-and-mission", "Vision & Mission"],
    ["history", "History of XCL ASB Sukhumvit"],
    ["our-team", "Our Team"],
    ["school-facilities", "School Facilities"],
    ["xcl-education", "XCL Education"],
    ["admission-and-process", "Admission and Process"],
    ["tuition-and-fees", "Tuition & Fees"],
    ["scholarship", "Scholarship"],
    ["pastoral-care", "Pastoral Care"],
    ["after-school-program", "After School Program"],
    ["summer-school-program", "Summer School Program"],
    ["admission-key-dates", "Admission Key Dates"],
    ["university-preparation", "University Preparation"],
    ["faq", "FAQ"],
    ["sports", "Sports"],
    ["apply-now", "Apply Now"],
    ["co-curricular-life", "Co-Curricular Life"],
    ["field-trips", "Field trips"],
  ]);

  return breadcrumbPaths.get(pathname) || "Home";
}
