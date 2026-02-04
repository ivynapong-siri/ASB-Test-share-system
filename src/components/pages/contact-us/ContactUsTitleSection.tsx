import VideoHeroSection from "@/components/shared/video-hero-section";
import { ContactUsPageJson } from "@/server/serializers/pages/contact-us-serializer";

interface ContactUsTitleSectionProps {
  data: ContactUsPageJson;
}

const ContactUsTitleSection = ({ data }: ContactUsTitleSectionProps) => {
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

export default ContactUsTitleSection;
