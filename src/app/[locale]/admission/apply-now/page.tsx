import JotformApplicationForm from "@/components/pages/admission/apply-now/JotformApplicaitonForm";

import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "admission/apply-now",
    title: "Admission - Apply Now - American School Bangkok",
    description: "Admission - Apply Now - XCL Education",
    useWordPressSEO: false,
  });
}

export default async function Apply() {
  // const jotFormData = await fetchFormQuestionsByPage();
  // return <AdmissionApplicationDetail data={jotFormData.groupedQuestions} />;

  return <JotformApplicationForm />;
}
