import VideoHeroSection from "@/components/shared/video-hero-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";

interface SchoolBusServiceTitleSectionProps {
  data: StudentSupportJson;
}

const SchoolBusServiceTitleSection = ({ data }: SchoolBusServiceTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-[940px]"
    />
  );
};

export default SchoolBusServiceTitleSection;
