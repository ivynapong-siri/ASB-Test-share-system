import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface CommunityOutreachProgramTitleSectionProps {
  data: CoCurricularLifeJson;
}

const CommunityOutreachProgramTitleSection = ({ data }: CommunityOutreachProgramTitleSectionProps) => {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-[940px]"
      titleClassName="max-w-[940px] text-center max-sm:max-w-72 max-sm:text-5xl text-center"
    />
  );
};

export default CommunityOutreachProgramTitleSection;
