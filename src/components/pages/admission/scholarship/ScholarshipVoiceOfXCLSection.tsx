import InformationCarouselSection from "@/components/shared/information-carousel-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ScholarshipVoiceOfXCLSectionProps {
  data: SectionJson;
}

const ScholarshipVoiceOfXCLSection = ({ data }: ScholarshipVoiceOfXCLSectionProps) => {
  return (
    <InformationCarouselSection
      descriptionClassname="font-sans text-[1.25rem]/[1.625rem] lg:text-[1.75rem]/[2rem] font-semibold"
      data={data}
    />
  );
};

export default ScholarshipVoiceOfXCLSection;
