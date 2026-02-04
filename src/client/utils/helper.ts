import { BreadcrumbProps, TuitionFees } from "@/server/models/model-types";
import { CustomLandingJson, MenuGroupsJson } from "@/server/serializers/page-settings";
import { GalleriesJson, NewsGroupDetailJson } from "@/server/serializers/news-group-serializer";
import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { AdditionalRemarkJson } from "@/server/serializers/tuition-and-fees/additional-remark-serializer";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { KeyPoint } from "@/components/shared/key-points-section";
import { LandingListJson } from "@/server/serializers/custom-landing-serializer";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { PaymentMethodsJson } from "@/server/serializers/tuition-and-fees/payment-methods-serializer";
import { RegistrationFeeJson } from "@/server/serializers/tuition-and-fees/registration-fee-serializer";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SiblingDiscountPoliciesJson } from "@/server/serializers/tuition-and-fees/sibling-discount-policies-serializer";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { TuitionAndFeesJson } from "@/server/serializers/tuition-and-fees/tuition-and-fees-serializer";

export function htmlToPlainText(html: string): string {
  if (!html) return "";
  // Replace <br> tags with newline
  let text = html.replace(/<br\s*\/?>/gi, "\n");

  // Optionally, remove any other HTML tags
  text = text.replace(/<[^>]+>/g, "");

  return text;
}

export function getBreadcrumbs({
  pageData,
  sectionData,
}: {
  pageData:
    | AboutUsPageJson
    | AdmissionPageJson
    | CoCurricularLifeJson
    | CurriculumPageJson
    | OurCommunityPageJson
    | StudentSupportJson;
  sectionData: SectionJson | SectionWithTabJson;
}): BreadcrumbProps {
  const breadcrumb1 = (pageData as any)?.breadcrumbs1 ?? (sectionData as any)?.breadcrumbs1 ?? null;
  const breadcrumb2 = (pageData as any)?.breadcrumbs2 ?? (sectionData as any)?.breadcrumbs2 ?? null;
  const breadcrumb3 = (pageData as any)?.breadcrumbs3 ?? (sectionData as any)?.breadcrumbs3 ?? null;

  return { breadcrumb1, breadcrumb2, breadcrumb3 };
}

export function isSectionProfileJson(data: SectionCardJson | SectionProfileJson): data is SectionProfileJson {
  return "firstName" in data && "lastName" in data;
}

export function getImageUrl(data: SectionCardJson | SectionProfileJson, isMobile: boolean): string {
  if (isSectionProfileJson(data)) {
    return data.imageUrl ?? "/mock-image.jpg";
  } else {
    return (
      (isMobile ? data.imageMobile?.imageUrl : data.image?.imageMediumLargeUrl) ||
      data.image?.imageUrl ||
      "/mock-image.jpg"
    );
  }
}

export function splitIntoColumns<T>(items: T[] | null, columns = 2): T[][] {
  if (!items) return [];
  const result: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    result[index % columns].push(item);
  });
  return result;
}

export function getLinkDirection(index: number, length: number): "left" | "right" | undefined {
  if (index === length - 1 || length === 0) return undefined;
  return index % 2 === 0 ? "right" : "left";
}

export function mapTuitionFeesTable(tuitionData: TuitionAndFeesJson) {
  const { table } = tuitionData;
  const { tableHeader1, tableHeader2, tableHeader3, tableHeader4 } = table.tableSettings.pages.tuitionAndFees;

  const divisions = ["earlyYears", "elementary", "middleSchool", "highSchool"] as const;

  const makeEntry = (
    division: string,
    group: { name: string; semester: string; annual: string },
    type: "annual" | "semester"
  ): Record<string, string> => {
    const entry: Record<string, string> = {
      [tableHeader1 || "Division"]: division,
      [tableHeader2 || "Grades"]: group.name,
    };

    if (type === "semester") {
      entry[tableHeader3 || "Tuition Per Semester"] = group.semester;
    } else if (type === "annual") {
      entry[tableHeader4 || "Annual Tuition"] = group.annual;
    }

    return entry;
  };

  const mapTable = (type: "annual" | "semester"): Record<string, string>[] => {
    const tableRows: Record<string, string>[] = [];

    divisions.forEach((divisionKey) => {
      const divisionData = table[divisionKey];
      if (!divisionData) return;

      if (divisionKey === "earlyYears") {
        // Narrow the type explicitly
        const earlyYears = divisionData as {
          division: string;
          gradeGroup1: { name: string; semester: string; annual: string };
          gradeGroup2: { name: string; semester: string; annual: string };
          gradeGroup3: { name: string; semester: string; annual: string };
          gradeGroup4: { name: string; semester: string; annual: string };
        };

        [earlyYears.gradeGroup1, earlyYears.gradeGroup2, earlyYears.gradeGroup3, earlyYears.gradeGroup4].forEach(
          (group) => {
            if (group) tableRows.push(makeEntry(earlyYears.division, group, type));
          }
        );
      } else {
        // For other divisions, only gradeGroup1 exists
        const other = divisionData as {
          division: string;
          gradeGroup1: { name: string; semester: string; annual: string };
        };
        if (other.gradeGroup1) tableRows.push(makeEntry(other.division, other.gradeGroup1, type));
      }
    });

    return tableRows;
  };

  return {
    headers: {
      division: tableHeader1 || "Division",
      grades: tableHeader2 || "Grades",
      semester: tableHeader3 || "Tuition Per Semester",
      annual: tableHeader4 || "Annual Tuition",
    },
    annual: {
      table: mapTable("annual"),
    },
    semester: {
      table: mapTable("semester"),
    },
  };
}

export function listConvert(lists: string): { headText: string; description: string }[] {
  return lists
    .split("\n")
    .map((raw) => {
      if (!raw.trim()) return null;

      const noNumber = raw.replace(/^\d+\.?\s*/, "").trim();

      // Find colon (supports English :, Japanese ：)
      let colonIndex = noNumber.indexOf(":");
      if (colonIndex === -1) colonIndex = noNumber.indexOf("：");

      let head = "";
      let desc = "";

      if (colonIndex !== -1) {
        head = noNumber.substring(0, colonIndex).trim();
        desc = noNumber.substring(colonIndex + 1).trim();
      } else {
        const firstSpace = noNumber.indexOf(" ");
        if (firstSpace !== -1) {
          head = noNumber.substring(0, firstSpace).trim();
          desc = noNumber.substring(firstSpace).trim();
        } else {
          head = noNumber;
          desc = "";
        }
      }

      return {
        headText: head + ":",
        description: desc,
      };
    })
    .filter((i): i is { headText: string; description: string } => i !== null);
}

export function transformMenuGroupsToSidebarData(
  menuGroups: MenuGroupsJson,
  opts?: {
    customLanding?: CustomLandingJson;
    customLandingList?: LandingListJson;
  }
) {
  // menu groups
  const groups = Object.entries(menuGroups).map(([_, section], index) => ({
    id: (index + 1).toString(),
    title: section.title,
    sub: (section.menus || [])
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((menu) => ({
        label: menu.title,
        href: menu.url,
      })),
  }));

  // custom landing pages
  if (opts?.customLanding?.showInMenu && opts.customLandingList?.length) {
    groups.push({
      id: "customLanding",
      title: opts.customLanding.label,
      sub: opts.customLandingList.map((item) => ({
        label: item.title,
        href: `/landing/${item.slug}`,
      })),
    });
  }

  return groups;
}

export function formatHeaderTable(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(\d+)/g, " $1")
    .replace(/\s+/g, " ")
    .trim();
}

export function reorderData<T>(data: T[], order: number[]): T[] {
  return order.map((index) => data[index]);
}

type HighlightParts = {
  before: string;
  highlight: string;
  after: string;
};

export function cutWithHighlight(header: string, highlightText: string, isChinese: boolean): HighlightParts {
  if (isChinese) {
    const firstSpace = header.indexOf(" ");

    if (firstSpace === -1) {
      // fallback if no space exists
      return {
        before: header,
        highlight: "",
        after: "",
      };
    }

    const beforeLine = header.slice(0, firstSpace);
    const afterLine = header.slice(firstSpace + 1);

    const index = afterLine.indexOf(highlightText);

    if (index === -1) {
      return {
        before: beforeLine,
        highlight: "",
        after: afterLine,
      };
    }

    const afterBefore = afterLine.slice(0, index);
    const afterAfter = afterLine.slice(index + highlightText.length);

    return {
      before: beforeLine,
      highlight: highlightText,
      after: afterBefore + afterAfter,
    };
  }

  // Default (non-Chinese)
  const index = header.indexOf(highlightText);

  if (index === -1) {
    return {
      before: header,
      highlight: "",
      after: "",
    };
  }

  return {
    before: header.slice(0, index),
    highlight: highlightText,
    after: header.slice(index + highlightText.length),
  };
}

export function formatPhoneForTel(input: string): string {
  const digitsOnly = input.replace(/[^\d]/g, "");
  let normalized = digitsOnly;
  if (normalized.startsWith("66")) {
    normalized = normalized.replace(/^660/, "66");
    return `+${normalized}`;
  }
  if (normalized.startsWith("0")) {
    return `+66${normalized.slice(1)}`;
  }
  return `+${normalized}`;
}

export function convertKeyPoints(cards: SectionCardJson[]) {
  const result =
    (cards?.map((card) => ({
      title: card.title,
      description: card.description,
      imageSrc: card.image2?.imageUrl,
    })) as KeyPoint[]) ?? [];
  return result;
}

export function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
}

export function convertLocaleSlug(slug: string, locale: string) {
  return locale === "en" ? slug : `${slug}-${locale}`;
}

export function formatCalendarDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const transformPaymentMethodToQA = (data: PaymentMethodsJson | null, id: number): TuitionFees | null => {
  if (!data) return null;

  const extractBullet = (data: { title: string | null; description: string }) => {
    const cleanDescription = data.description.replace(/<\/?p>/gi, "").trim();

    const bulletMatches = data.description.match(/<li.*?>(.*?)<\/li>/gi);
    const breakMatches = data.description.match(/<br\s*\/?>/gi);

    let bullets: string[] = [];

    if (bulletMatches) {
      bullets = bulletMatches
        .map((item) => {
          const cleanedItem = item.replace(/<\/?li>/gi, "").trim();
          return cleanedItem;
        })
        .filter(Boolean);
    }

    if (breakMatches && !bulletMatches) {
      bullets = cleanDescription
        .split(/<br\s*\/?>/)
        .map((line) => line.trim())
        .filter(Boolean);
    }

    if (!bulletMatches && !breakMatches) {
      bullets = cleanDescription
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    }

    return { cleanDescription, bullets };
  };

  const bulletsCheque =
    extractBullet(data.cheque).bullets.length === 0
      ? [extractBullet(data.cheque).cleanDescription]
      : extractBullet(data.cheque).bullets;
  const bulletsCreditCard =
    extractBullet(data.creditCard).bullets.length === 0
      ? [extractBullet(data.creditCard).cleanDescription]
      : extractBullet(data.creditCard).bullets;
  const bulletsBankTransfer =
    extractBullet(data.bankTransfer).bullets.length === 0
      ? [extractBullet(data.bankTransfer).cleanDescription]
      : extractBullet(data.bankTransfer).bullets;

  return {
    id,
    question: data.title,
    type: "bullet",
    answer: {
      sections: [
        {
          title: data.cheque.title,
          data: bulletsCheque,
        },
        {
          title: data.creditCard.title,
          data: bulletsCreditCard,
        },
        {
          title: data.bankTransfer.title,
          data: bulletsBankTransfer,
        },
      ],
    },
  };
};

export const transformSimpleTuitionAndFeesToQA = (
  data: { title: string; description: string } | null,
  id: number
): TuitionFees | null => {
  if (!data) return null;

  return {
    id,
    question: data.title,
    type: "string",
    answer: stripHtml(data.description),
  };
};

const extractBullet = (data: { title: string | null; description: string }) => {
  const splitHtml = data.description.split(/<p>•|•/i);
  const rawDescription = splitHtml[0].trim();

  const cleanDescription = rawDescription.replace(/<\/?p>/gi, "").trim();

  const bulletMatches = data.description.match(/•\s*.*?(?=<br\s*\/?>|\n|<\/p>|$)/gi);
  const bullets = bulletMatches ? bulletMatches.map((item) => item.replace(/•\s*/, "").trim()).filter(Boolean) : [];

  return { cleanDescription, bullets };
};

export const transformBulletTuitionAndFeesToQA = (
  data: { title: string; description: string } | null,
  id: number
): TuitionFees | null => {
  if (!data) return null;

  const { bullets, cleanDescription } = extractBullet(data);

  return {
    id,
    question: data.title,
    type: "bullet",
    answer: {
      description: cleanDescription,
      sections: [
        {
          data: bullets,
        },
      ],
    },
  };
};

export const transformTableTuitionAndFeesToQA = (data: RegistrationFeeJson, id: number): TuitionFees | null => {
  if (!data || !data.table || !data.table.row) return null;

  const { header, row } = data.table;
  const { tableHeader1, tableHeader2 } = header;

  const rows = Object.values(row)
    .filter(Boolean)
    .map((r) => ({
      [tableHeader1 || ""]: r.amount,
      [tableHeader2 || ""]: r.description,
    }));

  return {
    id,
    question: data.title || "Registration Fee",
    type: "table",
    answer: {
      description: data.description ?? undefined,
      data: rows,
    },
  };
};

export const transformSiblingDiscountPoliciesToQA = (
  data: SiblingDiscountPoliciesJson | null,
  id: number
): TuitionFees => {
  if (!data) {
    return {
      id,
      question: "",
      type: "table",
      requireMiddleTable: true,
      answer: {
        header: "",
        data: [],
      },
    };
  }

  const { header1, header2, header3 } = data.table.header;
  return {
    id,
    question: data.title || "Sibling Discount Policies",
    type: "table",
    requireMiddleTable: true,
    answer: {
      header: data.table.tableLabel || "Sibling Discount Policy",
      data: [
        {
          [header1]: data.table.row.row1 || "",
          [header2]: data.table.row.row2 || "",
          [header3]: data.table.row.row3 || "",
        },
      ],
    },
  };
};

export const transformAdditionalRemarksToQA = (data: AdditionalRemarkJson | null, id: number): TuitionFees | null => {
  if (!data) return null;

  const extractBullet = (data: { title: string | null; description: string }) => {
    const cleanDescription = data.description.replace(/<\/?p>/gi, "").trim();
    const bulletMatches = data.description.match(/<li.*?>(.*?)<\/li>/gi);
    const breakMatches = data.description.match(/<br\s*\/?>/gi);

    let bullets: string[] = [];

    if (bulletMatches) {
      bullets = bulletMatches
        .map((item) => {
          const cleanedItem = item.replace(/<\/?li[^>]*>/gi, "").trim();
          return `${cleanedItem}`;
        })
        .filter(Boolean);
    } else if (breakMatches) {
      bullets = cleanDescription
        .split(/<br\s*\/?>/)
        .map((line) => `${line.trim()}`)
        .filter(Boolean);
    } else {
      bullets = cleanDescription
        .split("\n")
        .map((line) => `${line.trim()}`)
        .filter(Boolean);
    }

    return { cleanDescription, bullets };
  };

  const bulletsAdditionalRemark =
    extractBullet(data.additionalRemark).bullets.length === 0
      ? [`${extractBullet(data.additionalRemark).cleanDescription}`]
      : extractBullet(data.additionalRemark).bullets;

  const bulletsLearningSupportFees =
    extractBullet(data.learningSupportFees).bullets.length === 0
      ? [`${extractBullet(data.learningSupportFees).cleanDescription}`]
      : extractBullet(data.learningSupportFees).bullets;

  const bulletsRefundPolicy =
    extractBullet(data.schoolFeeRefundPolicy).bullets.length === 0
      ? [`${extractBullet(data.schoolFeeRefundPolicy).cleanDescription}`]
      : extractBullet(data.schoolFeeRefundPolicy).bullets;

  return {
    id,
    question: data.title,
    type: "bullet",
    answer: {
      sections: [
        {
          title: data.additionalRemark.title,
          data: bulletsAdditionalRemark,
        },
        {
          title: data.learningSupportFees.title,
          data: bulletsLearningSupportFees,
        },
        {
          title: data.schoolFeeRefundPolicy.title,
          data: bulletsRefundPolicy,
        },
      ],
    },
  };
};

const stripHtml = (html: string): string => {
  return html
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li>/gi, "• ")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

export function extractHtmlTextLines(html: string): string[] {
  const cleaned = html
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, "\n")
    .trim();

  return cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

type QAFormattedTuitionAndFees = {
  id: number;
  question: string;
  type: "table";
  answer: {
    header: string;
    description: string;
    mergeKey: string;
    data: Record<string, string>[];
  };
};

export const transformTuitionAndFeesToQA = (
  tuitionData: TuitionAndFeesJson | null,
  id: number = 1
): QAFormattedTuitionAndFees | null => {
  if (!tuitionData) {
    return null;
  }

  const { title, description, table } = tuitionData;

  const { tableHeader1, tableHeader2, tableHeader3, tableHeader4 } = table.tableSettings.pages.tuitionAndFees;

  const makeEntry = (division: string, group: { name: string; semester: string; annual: string }) => ({
    [tableHeader1 || "Division"]: division,
    [tableHeader2 || "Grades"]: group.name,
    [tableHeader3 || "Tuition / Semester"]: group.semester,
    [tableHeader4 || "Annual Tuition"]: group.annual,
  });

  const data: Record<string, string>[] = [];

  if (table.earlyYears) {
    const { division, gradeGroup1, gradeGroup2, gradeGroup3, gradeGroup4 } = table.earlyYears;
    data.push(
      makeEntry(division, gradeGroup1),
      makeEntry(division, gradeGroup2),
      makeEntry(division, gradeGroup3),
      makeEntry(division, gradeGroup4)
    );
  }

  if (table.elementary) {
    data.push(makeEntry(table.elementary.division, table.elementary.gradeGroup1));
  }

  if (table.middleSchool) {
    data.push(makeEntry(table.middleSchool.division, table.middleSchool.gradeGroup1));
  }

  if (table.highSchool) {
    data.push(makeEntry(table.highSchool.division, table.highSchool.gradeGroup1));
  }

  return {
    id,
    question: title ?? "Tuition Fee",
    type: "table",
    answer: {
      header: table.tableSettings.pages.tuitionAndFees.tableHeader4 ?? "",
      description: description ?? "",
      mergeKey: tableHeader1 || "Division",
      data,
    },
  };
};

export function getMinNewsCardJsonLoop<T extends NewsGroupDetailJson>({
  cards,
  minLoopCard = 6,
}: {
  cards: T[];
  minLoopCard?: number;
}): T[] {
  if (cards.length > 0 && cards.length < minLoopCard) {
    const original = [...cards];
    while (cards.length < minLoopCard) {
      cards = [...cards, ...original];
    }
    cards = cards.slice(0, minLoopCard);
  }
  return cards;
}

export function getMinDuplicateCardJsonLoop<T extends SectionCardJson>({
  cards,
  minLoopCard = 14,
}: {
  cards: T[];
  minLoopCard?: number;
}) {
  if (cards.length >= minLoopCard) return cards;

  let result: T[] = [];

  while (result.length < minLoopCard) {
    result.push(...cards);
  }

  return result;
}

export function getMinSectionCardJsonLoop<T extends SectionCardJson | GalleriesJson>({
  cards,
  minLoopCard = 14,
}: {
  cards: T[];
  minLoopCard?: number;
}): T[] {
  if (cards.length >= minLoopCard) return cards;

  const result: T[] = [];
  let i = 0;

  while (result.length < minLoopCard) {
    result.push(cards[i % cards.length]);
    i++;
  }

  return result;
}

export function getGearCards({
  cards,
  minCardForLoop = 6,
  image,
  requiredCardImage = true,
}: {
  cards: SectionCardJson[];
  minCardForLoop?: number;
  image: string;
  requiredCardImage?: boolean;
}) {
  const result: SectionCardJson[] = [];

  if (cards.length >= minCardForLoop) {
    return cards.map((card, index) => ({
      id: `${card.id}-${index}`,
      title: card.title,
      subtitle: card.description,
      image: requiredCardImage ? (card.image2?.imageUrl ?? image) : (image ?? card.image2?.imageUrl),
    }));
  }

  while (result.length < minCardForLoop) {
    result.push(...cards);
  }

  return result.map((card, index) => ({
    id: `${card.id}-${index}`,
    title: card.title,
    subtitle: card.description,
    image: requiredCardImage ? (card.image2?.imageUrl ?? image) : (image ?? card.image2?.imageUrl),
  }));
}

export function useIsSafari() {
  if (typeof window === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function duplicateCardIndexId(cards: SectionCardJson[]) {
  const dupCards = [...cards, ...cards];

  return dupCards.map((card, index) => ({
    ...card,
    subId: index,
  }));
}

interface AgeGuideLineProps {
  acfData: any[];
  fallbackId: number;
  title: string;
}

export const transformAgeGuidelinesFromACF = ({ acfData, fallbackId = 0, title }: AgeGuideLineProps): TuitionFees => {
  return {
    id: fallbackId,
    question: title,
    type: "table",
    requireHeader: true,
    requireMiddleTable: true,
    answer: {
      data: acfData.map((item) => ({
        "Range of DOB": item.dob || "",
        Age: item.age || "",
        American: item.american || "",
        British: item.british || "",
        Thai: item.thai || "",
        Chinese: item.chinese || "",
        Korean: item.korean || "",
      })),
    },
  };
};

export const transformAgeGuidelinesToAppFees = ({ acfData, fallbackId = 0, title }: AgeGuideLineProps): TuitionFees => {
  return {
    id: fallbackId,
    question: title,
    type: "table",
    requireHeader: true,
    requireMiddleTable: true,
    answer: {
      data: acfData.map((item) => ({
        "Range of DOB": item.dob || "",
        Age: item.age || "",
        American: item.american || "",
        British: item.british || "",
        Thai: item.thai || "",
        Chinese: item.chinese || "",
        Korean: item.korean || "",
      })),
    },
  };
};
