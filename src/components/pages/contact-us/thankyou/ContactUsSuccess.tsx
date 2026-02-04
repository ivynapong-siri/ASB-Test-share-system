"use client";

import VideoHeroSection from "@/components/shared/video-hero-section";
import { ThankyouPageJson } from "@/server/serializers/pages/thankyou-page-serializer";

interface SuccessTitleSectionProps {
  data: ThankyouPageJson;
}

const ContactUsSuccessSection = ({ data }: SuccessTitleSectionProps) => {
  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <VideoHeroSection
        titleText={data.headerTitle}
        imageMobileSrc={data.mainBannerMobile}
        descriptionText={data.headerDescription}
        imageSrc={data.mainBanner}
        titleClassName="max-w-3xl"
        descriptionClassName="max-w-5xl"
        isHaveButton={true}
        buttonLabel={data.buttonLebel}
        buttonUrl={data.buttonUrl}
      />
    </div>
  );
};

export default ContactUsSuccessSection;
