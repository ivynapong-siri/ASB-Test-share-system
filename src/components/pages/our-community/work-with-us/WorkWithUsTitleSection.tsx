import VideoHeroSection from "@/components/shared/video-hero-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";

interface WorkWithUsTitleSectionProps {
  data: OurCommunityPageJson;
}

export default function WorkWithUsTitleSection({ data }: WorkWithUsTitleSectionProps) {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-[940px]"
    />
  );
}
