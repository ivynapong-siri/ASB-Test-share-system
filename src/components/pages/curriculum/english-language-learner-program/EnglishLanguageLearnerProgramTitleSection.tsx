import VideoHeroSection from "@/components/shared/video-hero-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";

interface EnglishLanguageLearnerProgramTitleSectionProps {
  titleData: CurriculumPageJson;
}

export default function EnglishLanguageLearnerProgramTitleSection({
  titleData,
}: EnglishLanguageLearnerProgramTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={titleData.headerTitle}
      imageMobileSrc={titleData.mainBannerMobile}
      imageSrc={titleData.mainBanner}
      descriptionText={titleData.headerDescription}
      titleClassName="max-w-4xl"
      descriptionClassName="max-w-4xl"
      isHaveButton
      buttonLabel={titleData.buttonLabel}
      buttonUrl={titleData.buttonUrl}
    />
  );
}
