import InformationSlideCarouselSection from "@/components/shared/information-slide-carousel-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AfterSchoolProgramInformationSlideSectionProps {
  data: SectionJson;
}

export default function AfterSchoolProgramInformationSlideSection({
  data,
}: AfterSchoolProgramInformationSlideSectionProps) {
  return (
    <InformationSlideCarouselSection
      title={data.title ?? ""}
      description={data.description ?? ""}
      slides={data.cards ?? []}
      className="py-0"
    />
  );
}
