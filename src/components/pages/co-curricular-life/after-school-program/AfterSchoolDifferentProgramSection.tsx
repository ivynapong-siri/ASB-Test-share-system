import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import ContentImageSwitch from "@/components/shared/content-image-switch";
import { SectionJson } from "@/server/serializers/section-serializer";

interface DifferentProgramSectionProps {
  data: SectionJson;
}

export default function AfterSchoolDifferentProgramSection({ data }: DifferentProgramSectionProps) {
  return (
    <TitleDescriptionCenterContainer title={data.title ?? ""} description={data.description ?? ""} className="mt-8">
      <ContentImageSwitch className="mt-8" cards={data.cards ?? []} />
    </TitleDescriptionCenterContainer>
  );
}
