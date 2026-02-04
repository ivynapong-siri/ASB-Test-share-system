"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import ParentInvolvementEngageSection from "./ParentInvolvementEngageSection";
import ParentInvolvementIntroSection from "./ParentInvolvementIntroSection";
import ParentInvolvementTitleSection from "./ParentInvolvementTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface ParentInvolvementDetailProps {
  data: OurCommunityPageJson;
}

export default function ParentInvolvementDetail({ data }: ParentInvolvementDetailProps) {
  const { sections } = data;
  const [introSection, engageSection] = sections as [SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ParentInvolvementTitleSection data={data} />
      <ParentInvolvementIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <ParentInvolvementEngageSection data={engageSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          carouselName="parent-involvement"
          buttonName="parentInvolvement"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
