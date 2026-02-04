import VideoHeroSection from "@/components/shared/video-hero-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";

interface SafetyAndSecurityTitleSectionProps {
  data: StudentSupportJson;
}

export default function SafetyAndSecurityTitleSection({ data }: SafetyAndSecurityTitleSectionProps) {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionClassName="max-w-[610px]"
      descriptionText={data.headerDescription}
    />
  );
}
