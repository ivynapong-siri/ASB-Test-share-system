import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import ContentImageSwitch from "@/components/shared/content-image-switch";
import { SectionJson } from "@/server/serializers/section-serializer";

interface PerformingFineArtProps {
  data: SectionJson;
}

export default function PerformingFineArtSection({ data }: PerformingFineArtProps) {
  return (
    <TitleDescriptionCenterContainer
      title={data.title ?? ""}
      description={data.description ?? ""}
      descriptionClassName="text-neutral-300 font-normal"
      className="mt-8"
    >
      <ContentImageSwitch className="mt-8" cards={data.cards ?? []} />
    </TitleDescriptionCenterContainer>
  );
}
