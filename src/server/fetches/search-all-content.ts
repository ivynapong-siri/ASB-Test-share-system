export async function searchAllContent(query: string) {
  const slugs = [
    "about-us",
    "head-of-schools-welcome",
    "vision-and-mission",
    "history-of-xcl",
    "our-team",
    "school-facilities",
    "xcl-education",
    "admission-and-process",
    "tuition-and-fees",
    "scholarship",
    "admission-key-dates",
    "application-portal",
    "faq",
    "admission-apply-success",
    "student-support",
    "safety-and-security",
    "school-bus-service",
    "school-uniform",
    "pastoral-care",
    "university-preparation",
    "curricular-life-at-xclasb",
    "academics-activities",
    "sports",
    "performing-and-fine-arts",
    "field-trips",
    "holidays-and-celebrations",
    "community-outreach-program",
    "after-school-programs",
    "summer-school-programs",
    "american-curriculum",
    "early-years-program",
    "elementary-program",
    "middle-school-program",
    "high-school-program",
    "english-language-learner-program",
    "project-based-learning-activities",
    "advanced-placement",
    "the-xcl-asb-sukhumvit-family",
    "our-voices",
    "parent-involvement",
    "success-stories",
    "work-with-us",
    "community-news",
    "home",
    "contact-us",
    "book-a-tour",
    "calendar",
    "age-guidelines-for-entry",
  ];

  const customWordPress = ["news-grouped", "landing-pages"];

  const sections = [
    {
      title: "No Slug Title",
      slugs: ["home", "contact-us", "book-a-tour", "calendar"],
    },
    {
      title: "About Us",
      slugs: [
        "about-us",
        "head-of-schools-welcome",
        "vision-and-mission",
        "history-of-xcl",
        "our-team",
        "school-facilities",
        "xcl-education",
      ],
    },
    {
      title: "Admission",
      slugs: [
        "admission-and-process",
        "age-guidelines-for-entry",
        "tuition-and-fees",
        "scholarship",
        "admission-key-dates",
        "application-portal",
        "faq",
        "admission-apply-success",
      ],
    },
    {
      title: "Student Support",
      slugs: [
        "student-support",
        "safety-and-security",
        "school-bus-service",
        "school-uniform",
        "pastoral-care",
        "university-preparation",
      ],
    },
    {
      title: "Co-Curricular Life",
      slugs: [
        "curricular-life-at-xclasb",
        "academics-activities",
        "sports",
        "performing-and-fine-arts",
        "field-trips",
        "holidays-and-celebrations",
        "community-outreach-program",
        "after-school-programs",
        "summer-school-programs",
      ],
    },
    {
      title: "Curriculum",
      slugs: [
        "american-curriculum",
        "early-years-program",
        "elementary-program",
        "middle-school-program",
        "high-school-program",
        "english-language-learner-program",
        "project-based-learning-activities",
        "advanced-placement",
      ],
    },
    {
      title: "Our Community",
      slugs: [
        "the-xcl-asb-sukhumvit-family",
        "our-voices",
        "parent-involvement",
        "success-stories",
        "work-with-us",
        "community-news",
      ],
    },
    { title: "Landing", slugs: ["landing-pages"] },
  ];

  const pageRequests = slugs.map((slug) =>
    fetch(`https://dcb9450325.nxcli.io/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`, {
      next: {
        tags: ["wordpress", "search"],
        revalidate: 3600, // 1 hour for search
      },
    }).then((res) => res.json())
  );

  const customRequests = customWordPress.map((e) =>
    fetch(`https://dcb9450325.nxcli.io/wp-json/custom/v1/${e}`, {
      next: {
        tags: ["wordpress", "search"],
        revalidate: 3600, // 1 hour for search
      },
    }).then((res) => res.json())
  );

  const kebabCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const titleCase = (str: string) => str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const results = await Promise.all([...pageRequests, ...customRequests]);

  const flat = results.flatMap((res) => {
    // If it's an array (standard WP pages or landing-pages), return as is
    if (Array.isArray(res)) return res;

    // If it's an object (like "news-grouped"), flatten its values
    return Object.entries(res).flatMap(([groupTitle, items]) => {
      return (items as any[]).map((item) => ({
        ...item,
        _groupTitle: groupTitle, // preserve group info if needed for badge or section
        _isNewsGroup: true,
      }));
    });
  });

  const normalized = flat.map((item) => {
    const rawTitle = item.title?.rendered || item.title || "";
    const isCustomLandingPage = typeof item.title === "string" && item.content;
    const isNewsGroupItem = item._isNewsGroup === true;

    // Clean title
    let cleanedTitle = rawTitle;
    if (!isNewsGroupItem && isCustomLandingPage) {
      cleanedTitle = rawTitle.split(":").slice(1).join(":").trim() || rawTitle;
      if (cleanedTitle === rawTitle && rawTitle.includes(":")) {
        cleanedTitle = rawTitle.split(":").slice(1).join(":").trim();
      }
    } else {
      cleanedTitle = rawTitle.replace(/^.*?:\s*\d+\s*/, "") || rawTitle;
    }

    // Badge
    const customBadge = isCustomLandingPage ? rawTitle.split(":")[1]?.trim() || "Landing" : null;

    const description = isCustomLandingPage
      ? item.content
          ?.replace(/<[^>]*>/g, "")
          .trim()
          .slice(0, 200)
      : item.acf?.header_description ||
        item.acf?.description ||
        item.excerpt?.rendered
          ?.replace(/<[^>]*>/g, "")
          .trim()
          .slice(0, 200) ||
        "";

    const itemSlug = item.slug || item.link || "";

    // Special handling for news-grouped items
    if (isNewsGroupItem) {
      const sectionTitle = item._groupTitle || "Uncategorized";
      return {
        title: cleanedTitle,
        description,
        slug: `our-community/news/detail/${item.id}`,
        badge: sectionTitle,
      };
    }

    // Handle normal WordPress and custom landing-pages
    const matchedSection = sections.find((section) => section.slugs.includes(itemSlug));
    const sectionTitle = matchedSection?.title || "No Slug Title";
    const isNoSlug = sectionTitle === "No Slug Title";

    // Special cases to remap certain slugs
    const slugOverrides: Record<string, string> = {
      // About Us
      "about-us": "xcl-asb-story",

      // Co-Curricular Life
      "curricular-life-at-xclasb": "life-at-xcl-asb-sukhumvit",
      "after-school-programs": "after-school-program",
      "summer-school-programs": "summer-school-program",

      // Curriculum
      "advanced-placement": "high-school-program/advanced-placement",

      // Our Community
      "community-news": "news",
    };

    const remappedSlug = slugOverrides[itemSlug] || itemSlug;

    let pathSlug: string;
    if (isNoSlug) {
      pathSlug = remappedSlug;
    } else {
      pathSlug = `${kebabCase(sectionTitle)}/${remappedSlug}`;
    }

    const href = isCustomLandingPage ? `landing/${itemSlug}` : pathSlug;

    return {
      title: cleanedTitle,
      description,
      slug: href,
      badge: isCustomLandingPage ? titleCase(customBadge) : isNoSlug ? titleCase(itemSlug) : sectionTitle,
    };
  });

  return normalized.filter((item) => (item.title + item.description).toLowerCase().includes(query.toLowerCase()));
}
