import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface XCLEducationTitleSectionProps {
  titleData: AboutUsPageJson;
}

const XCLEducationTitleSection = ({ titleData }: XCLEducationTitleSectionProps) => {
  const { headerTitle, headerDescription, buttonLabel, buttonUrl, mainBanner } = titleData;

  return (
    <div className="relative">
      <VideoHeroSection
        imageSrc={mainBanner}
        descriptionClassName="max-w-6xl"
        titleText={headerTitle}
        descriptionText={headerDescription}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
        isHaveButton={Boolean(buttonUrl && buttonLabel)}
      />
    </div>
  );
};

export default XCLEducationTitleSection;
