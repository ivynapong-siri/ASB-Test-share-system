"use client";

import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface XCLASBStoryTitleProps {
  titleData: AboutUsPageJson;
}

const XCLASBStoryTitleSection = ({ titleData }: XCLASBStoryTitleProps) => {
  const { headerTitle, headerDescription, buttonLabel, buttonUrl, mainBanner, mainBannerMobile } = titleData;

  return (
    <VideoHeroSection
      titleText={headerTitle}
      descriptionText={headerDescription}
      buttonLabel={buttonLabel}
      buttonUrl={buttonUrl}
      isHaveButton={Boolean(buttonUrl && buttonLabel)}
      imageSrc={mainBanner}
      imageMobileSrc={mainBannerMobile}
      titleClassName="text-[60px] lg:text-[96px] lg:px-[20%] xl:px-0 text-wrap text-center break-words leading-tight"
      descriptionClassName="md:px-10 lg:px-30 xl:px-[25%] 2xl:px-[30%]"
    />
  );
};

export default XCLASBStoryTitleSection;
