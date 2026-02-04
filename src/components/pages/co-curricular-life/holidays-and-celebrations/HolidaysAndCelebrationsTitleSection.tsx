import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface HolidaysAndCelebrationsTitleSectionProps {
  data: CoCurricularLifeJson;
}

const HolidaysAndCelebrationsTitleSection = ({ data }: HolidaysAndCelebrationsTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-[940px]"
      titleClassName="max-w-[940px]"
    />
  );
};

export default HolidaysAndCelebrationsTitleSection;
