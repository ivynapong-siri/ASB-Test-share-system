import ApplyNowSection from "@/components/shared/apply-now-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface EnglishLanguageLearnerProgramApplySectionProps {
  data: SectionJson;
}

export default function EnglishLanguageLearnerProgramApplySection({
  data,
}: EnglishLanguageLearnerProgramApplySectionProps) {
  return <ApplyNowSection data={data} />;
}
