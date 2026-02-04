"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SuccessStoriesIntroSection from "./SuccessStoriesIntroSection";
import SuccessStoriesSlideSection from "./SuccessStoriesSlideSection";
import SuccessStoriesTitleSection from "./SuccessStoriesTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface SuccessStoriesDetailProps {
  data: OurCommunityPageJson;
}

export default function SuccessStoriesDetail({ data }: SuccessStoriesDetailProps) {
  const { sections, navBox1 } = data;
  const [introSection, celebratingSection] = sections as [SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SuccessStoriesTitleSection data={data} />
      <SuccessStoriesIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <SuccessStoriesSlideSection data={celebratingSection} navBox={navBox1} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="success-stories"
          carouselName="successStories"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
