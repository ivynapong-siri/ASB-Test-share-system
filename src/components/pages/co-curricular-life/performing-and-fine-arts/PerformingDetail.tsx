"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import PerformingBenefitSection from "./PerformingBenefitSection";
import PerformingCarouselSection from "./PerformingCarouselSection";
import PerformingFineArtSection from "./PerformingFineArtSection";
import PerformingIntroSection from "./PerformingIntroSection";
import PerformingLargeImageSection from "./PerformingLargeImageSection";
import PerformingMusicSection from "./PerformingMusicSection";
import PerformingTitleSection from "./PerformingTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface PerformingDetailsProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}

const PerformingDetails = ({ data, newsGroupData }: PerformingDetailsProps) => {
  const { sections } = data;
  const [introSection, fineArtSection, musicSection, benefitSection, largeImageSection, carouselSection] = sections as [
    SectionJson,
    SectionJson,
    SectionWithTabJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <PerformingTitleSection data={data} />
      <PerformingIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <PerformingFineArtSection data={fineArtSection} />
      </LazySection>

      <LazySection>
        <PerformingMusicSection data={musicSection} />
      </LazySection>

      <LazySection>
        <PerformingBenefitSection data={benefitSection} />
      </LazySection>

      <LazySection>
        <PerformingLargeImageSection data={largeImageSection} />
      </LazySection>

      <LazySection>
        <PerformingCarouselSection newsGroupData={newsGroupData} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="co-curricular-performing"
          carouselName="coCurricularPerforming"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default PerformingDetails;
