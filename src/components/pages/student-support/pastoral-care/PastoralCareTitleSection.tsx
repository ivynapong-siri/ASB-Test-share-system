import VideoHeroSection from "@/components/shared/video-hero-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";

interface PastoralCareTitleSectionProps {
  data: StudentSupportJson;
}

export default function PastoralCareTitleSection({ data }: PastoralCareTitleSectionProps) {
  return (
    <VideoHeroSection
      descriptionClassName="max-w-4xl"
      titleText={data.headerTitle}
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      descriptionText={data.headerDescription}
    />
  );
}
