"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import OurVoiceFilterSection from "./OurVoiceFilterSection";
import OurVoiceTitleSection from "./OurVoiceTitle";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface OurVoiceDetailProps {
  data: OurCommunityPageJson;
}

const OurVoiceDetail = ({ data }: OurVoiceDetailProps) => {
  const { sections } = data;
  const [filterSection] = sections as [SectionWithTabJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: filterSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <OurVoiceTitleSection data={data} />
      <OurVoiceFilterSection data={filterSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="our-community-voice"
          carouselName="ourCommunityVoice"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default OurVoiceDetail;
