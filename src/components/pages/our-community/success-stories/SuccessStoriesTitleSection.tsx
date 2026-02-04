"use client";

import VideoHeroSection from "@/components/shared/video-hero-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";

interface SuccessStoriesTitleSectionProps {
  data: OurCommunityPageJson;
}

export default function SuccessStoriesTitleSection({ data }: SuccessStoriesTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={data.headerTitle}
      imageMobileSrc={data.mainBannerMobile}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-4xl"
      imageSrc={data.mainBanner}
      isHaveButton={true}
      buttonLabel={data.buttonLabel}
      buttonUrl={data.buttonUrl}
    />
  );
}
