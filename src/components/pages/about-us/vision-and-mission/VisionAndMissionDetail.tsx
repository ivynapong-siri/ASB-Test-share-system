"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import AchieveStriveBelongSection from "@/components/shared/achieve-strive-belong-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";
import VisionAndMissionOurCareValueSection from "./VisionAndMissionOurCareValueSection";
import VisionAndMissionOurFoundationSection from "./VisionAndMissionOurFoundationSection";
import VisionAndMissionOurMagicalSection from "./VisionAndMissionOurMagicalSection";
import VisionAndMissionOurMissionSection from "./VisionAndMissionOurMissionSection";
import VisionAndMissionTitleSection from "./VisionAndMissionTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface VisionAndMissionProps {
  visionAndMissionData: AboutUsPageJson;
}

const VisionAndMissionDetail = ({ visionAndMissionData }: VisionAndMissionProps) => {
  const { sections } = visionAndMissionData;
  const [ourMissionSection, ourFoundationSection, ourCareValueSection, ourMagicalSection, achieveStriveBelongData] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: visionAndMissionData, sectionData: ourMissionSection });

  const [hoveredId, setHoveredId] = useState<number>(ourMagicalSection?.cards?.[0]?.id ?? 0);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <VisionAndMissionTitleSection visionAndMissionData={visionAndMissionData} />
      <VisionAndMissionOurMissionSection data={ourMissionSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <VisionAndMissionOurFoundationSection data={ourFoundationSection} />
      </LazySection>

      <LazySection>
        <VisionAndMissionOurCareValueSection data={ourCareValueSection} />
      </LazySection>

      <LazySection>
        <VisionAndMissionOurMagicalSection hoveredId={hoveredId} setHoveredId={setHoveredId} data={ourMagicalSection} />
      </LazySection>

      <LazySection>
        <AchieveStriveBelongSection
          imageSrc={achieveStriveBelongData.image?.imageUrl ?? "/mock-image.jpg"}
          imageSrc2={achieveStriveBelongData.image2?.imageUrl ?? "/mock-image.jpg"}
          achieves={achieveStriveBelongData.title ?? ""}
          highlightText={achieveStriveBelongData.highlightText ?? ""}
          description={achieveStriveBelongData.titleLine1 ?? ""}
        />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="vision-and-mission"
          carouselName="visionAndMission"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default VisionAndMissionDetail;
