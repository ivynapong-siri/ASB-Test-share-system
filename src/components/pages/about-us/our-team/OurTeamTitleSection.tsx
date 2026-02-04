import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface OurTeamTitleSectionProps {
  data: AboutUsPageJson;
}

const OurTeamTitleSection = ({ data }: OurTeamTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-4xl"
    />
  );
};

export default OurTeamTitleSection;
