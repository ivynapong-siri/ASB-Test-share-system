"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import HolidaysAndCelebrationsCelebrationDaysSection from "./HolidaysAndCelebrationsCelebrationDaysSection";
import HolidaysAndCelebrationsIntroSection from "./HolidaysAndCelebrationsIntroSection";
import HolidaysAndCelebrationsOurVastCelebrationsSection from "./HolidaysAndCelebrationsOurVastCelebrationsSection";
import HolidaysAndCelebrationsTitleSection from "./HolidaysAndCelebrationsTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface HolidaysAndCelebrationsDetailProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}

const HolidaysAndCelebrationsDetail = ({ data, newsGroupData }: HolidaysAndCelebrationsDetailProps) => {
  const { sections } = data;
  const [introSection, ourVastCelebrationsSection, celebrationDaysSection] = sections as [
    SectionJson,
    SectionJson,
    SectionWithTabJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HolidaysAndCelebrationsTitleSection data={data} />
      <HolidaysAndCelebrationsIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <HolidaysAndCelebrationsOurVastCelebrationsSection
          data={ourVastCelebrationsSection}
          newsGroupData={newsGroupData}
        />
      </LazySection>

      <LazySection>
        <HolidaysAndCelebrationsCelebrationDaysSection data={celebrationDaysSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          sectionContainerClassName="bg-primary-gray"
          buttonName="holidays-and-celebrations"
          carouselName="holidaysAndCelebrations"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default HolidaysAndCelebrationsDetail;
