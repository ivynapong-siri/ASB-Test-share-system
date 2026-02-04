"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import { PatternStroke2 } from "@/components/shapes";
import ASBTitleSection from "@/components/shared/asb-title-section";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import HoverCardProgramSection from "@/components/shared/hover-card-program-section";
import LazySection from "@/components/shared/lazy-section";
import OurMagicalSection from "@/components/shared/our-magical-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { useState } from "react";
import AmericanActivitiesSection from "./AmericanActivitiesSection";
import AmericanEvaluationSection from "./AmericanEvaluationSection";
import AmericanFaqSection from "./AmericanFaqsSection";
import AmericanLiteracySection from "./AmericanLiteracySection";
import AmericanOurCurriculumSection from "./AmericanOurCurriculumSection";
import AmericanPersonalizedSection from "./AmericanPersonalizedSection";

// Keep above-the-fold components as regular imports

interface AmericanProps {
  data: CurriculumPageJson;
}

export default function AmericanDetail({ data }: AmericanProps) {
  const { sections } = data;
  const [
    ourCurriculumSection,
    personalizedSection,
    literacySection,
    ourMagicalSection,
    evaluationSection,
    programSection,
    americanActivitiesSection,
    faqSection,
  ] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionWithTabJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: ourCurriculumSection });
  const [hoveredId, setHoveredId] = useState<number>(ourMagicalSection?.cards?.[0]?.id ?? 0);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ASBTitleSection data={data} descriptionClassName="max-w-4xl" />
      <AmericanOurCurriculumSection data={ourCurriculumSection} breadcrumbData={breadcrumbData} />
      <AmericanPersonalizedSection data={personalizedSection} />

      <LazySection>
        <AmericanLiteracySection data={literacySection} />
      </LazySection>

      <LazySection>
        <OurMagicalSection
          data={ourMagicalSection}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          vectorChildren={
            <>
              <PatternStroke2
                className="absolute bottom-22 -left-48 z-0 h-[265px] w-[360px] rotate-75 lg:-bottom-26 lg:-left-24 lg:rotate-0"
                color="#B81E29"
              />
            </>
          }
        />
      </LazySection>

      <LazySection>
        <AmericanEvaluationSection data={evaluationSection} />
      </LazySection>

      <LazySection>
        <HoverCardProgramSection data={programSection} cardAlignStart />
      </LazySection>

      <LazySection>
        <AmericanActivitiesSection data={americanActivitiesSection} />
      </LazySection>

      <LazySection>
        <AmericanFaqSection data={faqSection} />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection className="z-10" />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="american-curriculum"
          carouselName="americanCurriculum"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
