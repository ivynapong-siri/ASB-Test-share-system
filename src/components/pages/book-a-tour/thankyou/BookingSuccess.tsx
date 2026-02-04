"use client";

import VideoHeroSection from "@/components/shared/video-hero-section";
import { ThankyouPageJson } from "@/server/serializers/pages/thankyou-page-serializer";

interface BookingSuccessSectionProps {
  data: ThankyouPageJson;
}
const BookingSuccessSection = ({ data }: BookingSuccessSectionProps) => {
  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <VideoHeroSection
        titleText={data.headerTitle}
        imageMobileSrc={data.mainBannerMobile}
        descriptionText={data.headerDescription}
        imageSrc={data.mainBanner}
        titleClassName="max-w-8xl"
        descriptionClassName="max-w-5xl"
        isHaveButton={true}
        buttonLabel={data.buttonLebel}
        buttonUrl={data.buttonUrl}
      />
    </div>
  );
};

export default BookingSuccessSection;
