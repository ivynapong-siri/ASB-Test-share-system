import VideoHeroSection from "@/components/shared/video-hero-section";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";

interface ScholarshipTitleSectionProps {
  data: AdmissionPageJson;
}

const ScholarshipTitleSection = ({ data }: ScholarshipTitleSectionProps) => {
  const { headerTitle, headerDescription, buttonLabel, buttonUrl, mainBanner, mainBannerMobile } = data;

  return (
    <VideoHeroSection
      imageSrc={mainBanner}
      imageMobileSrc={mainBannerMobile}
      descriptionClassName="max-w-4xl"
      titleText={headerTitle}
      descriptionText={headerDescription}
      buttonLabel={buttonLabel}
      buttonUrl={buttonUrl}
      isHaveButton
    />
  );
};

export default ScholarshipTitleSection;
