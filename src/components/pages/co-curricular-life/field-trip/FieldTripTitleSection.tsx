import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface FieldTripsTitleSectionProps {
  data: CoCurricularLifeJson;
}

const FieldTripsTitleSection = ({ data }: FieldTripsTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      descriptionClassName="max-w-4xl"
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
    />
  );
};

export default FieldTripsTitleSection;
