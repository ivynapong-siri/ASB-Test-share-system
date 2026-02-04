import VideoHeroSection from "@/components/shared/video-hero-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";

interface SchoolUniformTitleSectionProps {
  data: StudentSupportJson;
}

export default function SchoolUniformTitleSection({ data }: SchoolUniformTitleSectionProps) {
  return (
    <VideoHeroSection
      descriptionClassName="max-w-4xl"
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
    />
  );
}
