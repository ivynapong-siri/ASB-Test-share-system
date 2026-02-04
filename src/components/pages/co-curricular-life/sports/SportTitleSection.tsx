import VideoHeroSection from "@/components/shared/video-hero-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";

interface SportTitleSectionProps {
  data: CoCurricularLifeJson;
}

export default function SportTitleSection({ data }: SportTitleSectionProps) {
  return (
    <VideoHeroSection
      imageSrc={data.mainBanner}
      imageMobileSrc={data.mainBannerMobile}
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      descriptionClassName="max-w-4xl mt-8"
    />
  );
}
