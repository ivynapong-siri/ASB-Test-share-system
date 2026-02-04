import VideoHeroSection from "@/components/shared/video-hero-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";

interface AdvancedPlacementTitleSectionProps {
  titleData: CurriculumPageJson;
}

export default function AdvancedPlacementTitleSection({ titleData }: AdvancedPlacementTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={titleData.headerTitle}
      imageMobileSrc={titleData.mainBannerMobile}
      titleClassName="max-w-4xl"
      descriptionText={titleData.headerDescription}
      descriptionClassName="max-w-4xl"
      imageSrc={titleData.mainBanner}
    />
  );
}
