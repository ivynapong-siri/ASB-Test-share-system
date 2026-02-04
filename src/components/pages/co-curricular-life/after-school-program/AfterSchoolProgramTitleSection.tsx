import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface AfterSchoolProgramTitleSectionProps {
  data: CoCurricularLifeJson;
}

export default function AfterSchoolProgramTitleSection({ data }: AfterSchoolProgramTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={data.headerTitle}
      imageMobileSrc={data.mainBannerMobile}
      titleClassName="max-w-xl xl:max-w-3xl"
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-4xl"
      imageSrc={data.mainBanner}
    />
  );
}
