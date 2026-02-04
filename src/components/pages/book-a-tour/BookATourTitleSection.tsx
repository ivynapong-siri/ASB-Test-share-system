import VideoHeroSection from "@/components/shared/video-hero-section";
import { BookATourPageJson } from "@/server/serializers/pages/book-a-tour-serializer";

interface BookATourTitleSectionProps {
  data: BookATourPageJson;
}
const BookATourTitleSection = ({ data }: BookATourTitleSectionProps) => {
  const { headerTitle, headerDescription, mainBanner, mainBannerMobile } = data;

  return (
    <VideoHeroSection
      titleText={headerTitle}
      descriptionText={headerDescription}
      imageSrc={mainBanner}
      imageMobileSrc={mainBannerMobile}
      titleClassName="max-w-3xl"
      descriptionClassName="max-w-5xl"
    />
  );
};

export default BookATourTitleSection;
