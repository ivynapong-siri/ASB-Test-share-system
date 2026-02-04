import ApplyNowSection from "@/components/shared/apply-now-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProjectBasedApplySectionProps {
  data: SectionJson;
}

export default function ProjectBasedApplySection({ data }: ProjectBasedApplySectionProps) {
  return <ApplyNowSection data={data} />;
}
