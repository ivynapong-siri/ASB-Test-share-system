import VideoHeroSection from "@/components/shared/video-hero-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";

interface ParentInvolvementTitleSectionProps {
  data: OurCommunityPageJson;
}

export default function ParentInvolvementTitleSection({ data }: ParentInvolvementTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={data.headerTitle}
      imageMobileSrc={data.mainBannerMobile}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-5xl"
      imageSrc={data.mainBanner}
    />
  );
}
