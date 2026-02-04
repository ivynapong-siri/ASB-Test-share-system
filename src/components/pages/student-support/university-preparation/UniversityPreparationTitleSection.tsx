import VideoHeroSection from "@/components/shared/video-hero-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";

interface UniversityPreparationTitleSectionProps {
  data: StudentSupportJson;
}

const UniversityPreparationTitleSection = ({ data }: UniversityPreparationTitleSectionProps) => {
  return (
    <VideoHeroSection
      descriptionClassName="max-w-4xl"
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      imageSrc={data.mainBanner}
      descriptionText={data.headerDescription}
    />
  );
};

export default UniversityPreparationTitleSection;
