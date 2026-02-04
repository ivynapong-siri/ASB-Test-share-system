"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SportEmotionalGrowthSection from "./SportEmotionalGrowthSection";
import SportIntroSection from "./SportIntroSection";
import SportLatestEventSection from "./SportLatestEventSection";
import SportSlideBackgroundImageSection from "./SportSlideBackgroundImageSection";
import SportTitleSection from "./SportTitleSection";
import SportWideVarietySection from "./SportWideVarietySection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface SportDetailProps {
  data: CoCurricularLifeJson;
}

export default function SportDetail({ data }: SportDetailProps) {
  const { sections, navBox1 } = data;
  const [introSection, slideBackgroundImageSection, wideVarietySection, latestEventSection, emotionalGrowthSection] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SportTitleSection data={data} />
      <SportIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <SportSlideBackgroundImageSection data={slideBackgroundImageSection} navBox={navBox1} />
      </LazySection>

      <LazySection>
        <SportWideVarietySection data={wideVarietySection} />
      </LazySection>

      <LazySection>
        <SportLatestEventSection data={latestEventSection} />
      </LazySection>

      <LazySection>
        <SportEmotionalGrowthSection data={emotionalGrowthSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="sports"
          carouselName="sports"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
