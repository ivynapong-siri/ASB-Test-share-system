import { HomeJson } from "@/server/serializers/pages/home-serializer";
import VideoHeroSection from "../../shared/video-hero-section";

interface HomeTitleProps {
  titleData: HomeJson;
}

const HomeTitleSection = ({ titleData }: HomeTitleProps) => {
  return (
    <VideoHeroSection
      titleText={titleData.mainName1}
      descriptionText={titleData.mainName2}
      videoSource={titleData.heroBannerHomePage}
      buttonLabel={titleData.buttonLabel}
      buttonUrl={titleData.buttonUrl}
      highlightText={titleData.highlightText}
      imageMobileSrc={titleData.homeBannerBackgroundMobile}
      isHome
      isHaveButton
      isHaveHighlight
    />
  );
};

export default HomeTitleSection;
