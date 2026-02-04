import VideoHeroSection from "@/components/shared/video-hero-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";

interface ProgramTitleSectionProps {
  data: CurriculumPageJson;
}

export default function ProgramTitleSection({ data }: ProgramTitleSectionProps) {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-[940px]"
      isHaveButton={true}
      buttonLabel={data.buttonLabel}
      buttonUrl={data.buttonUrl}
    />
  );
}
