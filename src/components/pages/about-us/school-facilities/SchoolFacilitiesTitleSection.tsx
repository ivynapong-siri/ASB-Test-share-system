import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface SchoolFacilitiesTitleSectionProps {
  schoolFacilitiesData: AboutUsPageJson;
}

const SchoolFacilitiesTitleSection = ({ schoolFacilitiesData }: SchoolFacilitiesTitleSectionProps) => {
  return (
    <div className="relative">
      <VideoHeroSection
        imageSrc={schoolFacilitiesData.mainBanner}
        imageMobileSrc={schoolFacilitiesData.mainBannerMobile}
        titleText={schoolFacilitiesData.headerTitle}
        descriptionText={schoolFacilitiesData.headerDescription}
        descriptionClassName="max-w-4xl"
      />
    </div>
  );
};

export default SchoolFacilitiesTitleSection;
