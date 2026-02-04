import BentoImageCardWithIndexSection from "@/components/shared/bento-image-card-with-index-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface WorkWithUsPerksSectionProps {
  data: SectionJson;
}

export default function WorkWithUsPerksSection({ data }: WorkWithUsPerksSectionProps) {
  return <BentoImageCardWithIndexSection data={data} />;
}
