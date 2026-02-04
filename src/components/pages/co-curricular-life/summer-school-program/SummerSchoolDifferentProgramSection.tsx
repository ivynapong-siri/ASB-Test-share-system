import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import ContentImageSwitch from "@/components/shared/content-image-switch";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SummerSchoolDifferentProgramSectionProps {
  data: SectionJson;
}

const SummerSchoolDifferentProgramSection = ({ data }: SummerSchoolDifferentProgramSectionProps) => {
  return (
    <TitleDescriptionCenterContainer title={data.title ?? ""} description={data.description ?? ""}>
      <ContentImageSwitch cards={data.cards ?? []} />
    </TitleDescriptionCenterContainer>
  );
};

export default SummerSchoolDifferentProgramSection;
