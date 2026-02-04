import VideoHeroSection from "@/components/shared/video-hero-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";

interface HeadOfSchoolTitleSectionProps {
  data: AboutUsPageJson;
}

const HeadOfSchoolTitleSection = ({ data }: HeadOfSchoolTitleSectionProps) => {
  return (
    <VideoHeroSection
      titleText={data.headerTitle}
      descriptionText={data.headerDescription}
      imageSrc={data.mainBanner}
      imageClassName="[object-position:50%_50%] md:[object-position:85%_50%] lg:[object-position:80%_50%] xl:[object-position:100%_50%]"
      imageMobileSrc={data.mainBannerMobile}
      titleClassName="xl:px-[200px] 2xl:px-[20%] text-wrap break-words"
      descriptionClassName="lg:px-50 2xl:px-[20%]"
    />
  );
};

export default HeadOfSchoolTitleSection;
