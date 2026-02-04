import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface VisionAndMissionTitleSectionProps {
  visionAndMissionData: AboutUsPageJson;
}

const VisionAndMissionTitleSection = ({ visionAndMissionData }: VisionAndMissionTitleSectionProps) => {
  return (
    <div className="relative">
      <VideoHeroSection
        imageSrc={visionAndMissionData.mainBanner}
        imageMobileSrc={visionAndMissionData.mainBannerMobile}
        titleText={visionAndMissionData.headerTitle}
        descriptionText={visionAndMissionData.headerDescription}
        descriptionClassName="max-w-4xl"
      />
    </div>
  );
};

export default VisionAndMissionTitleSection;
