import VideoHeroSection from "@/components/shared/video-hero-section";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";

interface AdmissionAndProcessTitleSectionProps {
  data: AdmissionPageJson;
}

const AdmissionAndProcessTitleSection = ({ data }: AdmissionAndProcessTitleSectionProps) => {
  const { headerTitle, headerDescription, mainBanner, buttonLabel, buttonUrl, mainBannerMobile } = data;

  return (
    <VideoHeroSection
      titleText={headerTitle}
      imageMobileSrc={mainBannerMobile}
      descriptionText={headerDescription}
      imageSrc={mainBanner}
      titleClassName="max-w-6xl"
      descriptionClassName="max-w-5xl"
      isHaveButton={true}
      buttonLabel={buttonLabel}
      buttonUrl={buttonUrl}
    />
  );
};

export default AdmissionAndProcessTitleSection;
