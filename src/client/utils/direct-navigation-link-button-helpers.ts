export function mapPathToDirectNavigationTitle(pathname: string): string {
  const directNavigationTitles = new Map<string, string>([
    ["about-us", "About Us"],
    ["admission", "Admissions"],
    ["home", "Home"],
    ["academics-and-curriculum", "Academics and Curriculum"],
    ["student-support", "Student Support"],
    ["co-curricular-life", "Co-Curricular Life"],
    ["our-community", "Our Community"],
    ["curriculum", "Academics and Curriculum"],
  ]);

  return directNavigationTitles.get(pathname) || "Home";
}

export function getDirectNavigationDisplay(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const key =
    segments.length == 3
      ? segments.slice(2).join("/")
      : segments.length > 1
        ? segments.slice(1).join("/")
        : segments[0];

  const displays = new Map<string, string>([
    ["about-us", "About Us"],
    ["admission", "Admissions"],
    ["xcl-asb-story", "The XCL ASB Story"],
    ["head-of-school", "Head of School's Welcome"],
    ["vision-and-mission", "Vision & Mission"],
    ["history", "History of XCL ASB Sukhumvit"],
    ["our-team", "Our Team"],
    ["school-facilities", "School Facilities"],
    ["xcl-education", "XCL Education"],
    ["admission-and-process", "Admissions and Process"],
    ["tuition-and-fees", "Tuition & Fees"],
    ["scholarship", "Scholarship"],
    ["admission-key-dates", "Admissions Key Dates"],
    ["after-school-program", "After School Program"],
    ["summer-school-program", "Summer School Program"],
    ["faq", "FAQ"],
    ["apply-now", "Apply Now"],
    ["sports", "Sports"],
    ["student-support", "Our Student Support"],
    ["university-preparation", "University Preparation"],
    ["school-bus-service", "School Bus Service"],
    ["co-curricular-life", "Co-Curricular Life"],
    ["life-at-xcl-asb-sukhumvit", "Life At XCL ASB Sukhumvit"],
    ["field-trips", "Field Trips"],
    ["safety-and-security", "Safety And Security"],
    ["school-uniform", "School Uniform"],
    ["pastoral-care", "Pastoral Care"],
    ["performing-and-fine-arts", "Performance and Fine Arts"],
    ["community-outreach-program", "Community Outreach Programs"],
    ["holidays-and-celebrations", "Holidays and Celebrations"],
    ["academics-activities", "Academics Activities"],
    ["our-voice", "Our Voice"],
    ["academics-and-curriculum", "Academics and Curriculum"],
    ["our-community", "Our Community"],
    ["news", "News"],
    ["detail", "Detail"],
    ["american-curriculum", "American Curriculum"],
    ["early-years-program", "Early Years Program"],
    ["elementary-program", "Elementary program"],
    ["english-language-learner-program", "English Language Learner (ELL) Program"],
    ["high-school-program", "High School Program"],
    ["middle-school-program", "Middle School Program"],
    ["project-based-learning-activities", "Project-Based Learning Activities"],
    ["the-xcl-asb-sukhumvit-family", "The XCL ASB Sukhumvit Family"],
    ["parent-involvement", "Parent Involvement"],
    ["success-stories", "Success stories"],
    ["work-with-us", "Work With Us"],
    ["our-voices", "Our Voices"],
    ["advanced-placement", "Advanced Placement (AP)"],
    ["age-guidelines-for-entry", "Age Guidelines for Entry"],
  ]);

  return displays.get(key) || "Home";
}
