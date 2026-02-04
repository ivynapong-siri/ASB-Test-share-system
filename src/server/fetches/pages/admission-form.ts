import { JOTFORMDataPageJson, serializeJOTFORM } from "@/server/serializers/jotform-serializer";

import { ASB_XCL_FORM_ID } from "@/server/constants/constants";
import { JOTFORMJson } from "@/server/types/jotform-type";

export default async function fetchFormQuestionsByPage() {
  const API_KEY = process.env.JOT_FORM_KEY;

  try {
    const res = await fetch(`https://api.jotform.com/form/${ASB_XCL_FORM_ID}/questions?apiKey=${API_KEY}`, {
      // next: {
      //   tags: ["wordpress", "admission-form"],
      //   revalidate: 3600, // 1 hour
      // },
    });
    const json = await res.json();

    const questions = Object.values(json.content)
      .map((q: any) => serializeJOTFORM(q as JOTFORMJson)) // serializeJOTFORM(q as JOTFORMJson)
      .sort((a, b) => Number(a.order) - Number(b.order));

    const pages: any[][] = [];
    let currentPage: any[] = [];

    for (const q of questions) {
      if (q.type === "control_pagebreak") {
        pages.push(currentPage);
        currentPage = [];
      } else {
        currentPage.push(q);
      }
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    console.log("First pages: ", pages[0]);

    const pagesWithSections: JOTFORMDataPageJson[][] = pages.map((pageQuestions) => {
      const sections: { title: string | null; questions: any[] }[] = [];
      let currentSection: { title: string | null; questions: any[] } = {
        title: null,
        questions: [],
      };

      for (const q of pageQuestions) {
        if (q.type === "control_head") {
          if (currentSection.questions.length > 0) {
            sections.push(currentSection);
          }
          currentSection = {
            title: q.label || null,
            questions: [],
          };
        } else {
          currentSection.questions.push(q);
        }
      }

      if (currentSection.questions.length > 0) {
        sections.push(currentSection);
      }

      return sections;
    });

    const filteredPagesWithSections = pagesWithSections.filter((page) => page.length > 0);

    return {
      groupedQuestions: filteredPagesWithSections,
      totalPages: filteredPagesWithSections.length,
    };
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
}
