import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface HistoryTitleSectionProps {
  historyData: AboutUsPageJson;
}

const HistoryTitleSection = ({ historyData }: HistoryTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={historyData.mainBanner}
      imageMobileSrc={historyData.mainBannerMobile}
      descriptionClassName="max-w-3xl"
      titleClassName="xl:max-w-4xl"
      titleText={historyData.headerTitle}
      descriptionText={historyData.headerDescription}
    />
  );
};

export default HistoryTitleSection;
