import { convertKeyPoints } from "@/client/utils/helper";

import KeyPointsSection from "@/components/shared/key-points-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SafetyAndSecurityKeyPointSectionProps {
  data: SectionJson;
}

export default function SafetyAndSecurityKeyPointSection({ data }: SafetyAndSecurityKeyPointSectionProps) {
  const keyPoints = convertKeyPoints(data.cards ?? []);

  return <KeyPointsSection data={keyPoints} mainData={data} />;
}
