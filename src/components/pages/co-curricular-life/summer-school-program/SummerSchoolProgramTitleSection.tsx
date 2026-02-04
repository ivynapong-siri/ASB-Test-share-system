import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface SummerSchoolProgramTitleSectionProps {
  data: CoCurricularLifeJson;
}
const SummerSchoolProgramTitleSection = ({ data }: SummerSchoolProgramTitleSectionProps) => {
  return (
    <VideoHeroSection
      titleText={data.headerTitle}
      imageMobileSrc={data.mainBannerMobile}
      descriptionText={data.headerDescription}
      imageSrc={data.mainBanner}
      titleClassName="max-w-3xl"
      descriptionClassName="max-w-5xl"
    />
  );
};

export default SummerSchoolProgramTitleSection;
