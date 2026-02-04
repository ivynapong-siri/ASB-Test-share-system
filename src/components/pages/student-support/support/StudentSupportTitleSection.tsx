import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import VideoHeroSection from "../../../shared/video-hero-section";

interface StudentSupportTitleSectionProps {
  data: StudentSupportJson;
}

const StudentSupportTitleSection = ({ data }: StudentSupportTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-2xl"
    />
  );
};

export default StudentSupportTitleSection;
