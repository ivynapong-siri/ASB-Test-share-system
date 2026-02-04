import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import VideoHeroSection from "./video-hero-section";

interface ASBTitleSectionProps {
  data: CurriculumPageJson;
  descriptionClassName?: string;
}

const ASBTitleSection = ({ data, descriptionClassName }: ASBTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      descriptionClassName={descriptionClassName}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
    />
  );
};

export default ASBTitleSection;
