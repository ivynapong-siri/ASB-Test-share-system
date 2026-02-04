"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import MarkYourCalendarSection from "@/components/shared/mark-your-calendar-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import AdmissionAndProcessFAQSection from "./AdmissionAndProcessFAQSection";
import AdmissionAndProcessJourneySection from "./AdmissionAndProcessJourneySection";
import AdmissionAndProcessTitleSection from "./AdmissionAndProcessTitleSection";
import AdmissionAndProcessTuitionFeeSection from "./AdmissionAndProcessTuitionFeeSection";
import AdmissionAndProcessVoiceOfXCLSection from "./AdmissionAndProcessVoiceOfXCLSection";
import AdmissionProcessIntroSection from "./AdmissionProcessIntroSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

type AdmissionProcessProps = {
  data: AdmissionPageJson;
};

export default function AdmissionAndProcessDetail({ data }: AdmissionProcessProps) {
  const { sections, buttonLabel, buttonUrl, navBox1, navBox2, breadcrumbs1, breadcrumbs2 } = data;

  const [tuitionFeeSection, voiceOfXCLSection, faqsSection, , admissionDatesSection, , introSection, journeySection] =
    sections as [
      SectionJson,
      SectionJson,
      SectionJson,
      SectionJson,
      SectionWithTabJson,
      SectionJson,
      SectionJson,
      SectionWithTabJson,
    ];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: tuitionFeeSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AdmissionAndProcessTitleSection data={data} />
      <AdmissionProcessIntroSection
        data={introSection}
        breadcrumbData={breadcrumbData}
        buttonLabel={buttonLabel}
        buttonUrl={buttonUrl}
      />

      <LazySection>
        <AdmissionAndProcessJourneySection data={journeySection} navBox={navBox1} />
      </LazySection>

      <LazySection>
        <AdmissionAndProcessTuitionFeeSection data={tuitionFeeSection} />
      </LazySection>

      <LazySection>
        <AdmissionAndProcessVoiceOfXCLSection
          data={voiceOfXCLSection}
          navBox={navBox2}
          buttonLabel={buttonLabel}
          buttonUrl={buttonUrl}
        />
      </LazySection>

      <LazySection>
        <AdmissionAndProcessFAQSection faqsSectionData={faqsSection} />
      </LazySection>

      <LazySection>
        <MarkYourCalendarSection data={admissionDatesSection} variant="secondary" />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="admission-and-process"
          carouselName="admissionAndProcess"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
