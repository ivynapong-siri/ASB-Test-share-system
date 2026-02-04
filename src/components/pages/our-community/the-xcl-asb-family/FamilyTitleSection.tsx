"use client";

import VideoHeroSection from "@/components/shared/video-hero-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";

interface FamilyTitleSectionProps {
  data: OurCommunityPageJson;
}

const FamilyTitleSection = ({ data }: FamilyTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      descriptionClassName="max-w-4xl"
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      isHaveButton={true}
      buttonLabel={data.buttonLabel}
      buttonUrl={data.buttonUrl}
    />
  );
};
export default FamilyTitleSection;
