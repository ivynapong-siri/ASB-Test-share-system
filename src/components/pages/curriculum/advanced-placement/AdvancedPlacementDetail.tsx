"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import AdvancedPlacementBenefitSection from "./AdvancedPlacementBenefitSection";
import AdvancedPlacementCourseSection from "./AdvancedPlacementCourseSection";
import AdvancedPlacementFAQSection from "./AdvancedPlacementFAQSection";
import AdvancedPlacementImageSection from "./AdvancedPlacementImageSection";
import AdvancedPlacementIntroSection from "./AdvancedPlacementIntroSection";
import AdvancedPlacementTitleSection from "./AdvancedPlacementTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface AdvancedPlacementDetailProps {
  data: CurriculumPageJson;
}

export default function AdvancedPlacementDetail({ data }: AdvancedPlacementDetailProps) {
  const { sections } = data;

  const [introSection, benefitSection, imageSection, courseSection, faqSection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AdvancedPlacementTitleSection titleData={data} />
      <AdvancedPlacementIntroSection introData={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <AdvancedPlacementBenefitSection benefitData={benefitSection} />
      </LazySection>

      <LazySection>
        <AdvancedPlacementImageSection imageData={imageSection} />
      </LazySection>

      <LazySection>
        <AdvancedPlacementCourseSection courseData={courseSection} />
      </LazySection>

      <LazySection>
        <AdvancedPlacementFAQSection faqData={faqSection} />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection className="mt-24" />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="advanced-placement"
          carouselName="advancedPlacement"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
