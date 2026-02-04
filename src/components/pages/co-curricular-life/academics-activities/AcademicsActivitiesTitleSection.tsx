import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface AcademicsActivitiesTitleSectionProps {
  data: CoCurricularLifeJson;
}

const AcademicsActivitiesTitleSection = ({ data }: AcademicsActivitiesTitleSectionProps) => {
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

export default AcademicsActivitiesTitleSection;
