import VideoHeroSection from "@/components/shared/video-hero-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";

interface ProjectBasedTitleSectionProps {
  titleData: CurriculumPageJson;
}

export default function ProjectBasedTitleSection({ titleData }: ProjectBasedTitleSectionProps) {
  return (
    <VideoHeroSection
      titleText={titleData.headerTitle}
      imageMobileSrc={titleData.mainBannerMobile}
      descriptionText={titleData.headerDescription}
      imageSrc={titleData.mainBanner}
      titleClassName="max-w-[940px]"
      descriptionClassName="max-w-4xl"
    />
  );
}
