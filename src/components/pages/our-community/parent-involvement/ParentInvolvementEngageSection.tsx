import BentoImageCardWithIndexSection from "@/components/shared/bento-image-card-with-index-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ParentInvolvementEngageSectionProps {
  data: SectionJson;
}

export default function ParentInvolvementEngageSection({ data }: ParentInvolvementEngageSectionProps) {
  return <BentoImageCardWithIndexSection data={data} requiredVector={false} />;
}
