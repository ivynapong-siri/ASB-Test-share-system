"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import ProfileModal from "@/components/custom/modals/profile-modal";
import ApplyNowSection from "@/components/shared/apply-now-section";
import LazySection from "@/components/shared/lazy-section";
import MarkYourCalendarSection from "@/components/shared/mark-your-calendar-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { useState } from "react";
import ProgramCurriculumSection from "../ProgramCurriculumSection";
import ProgramIntroSection from "../ProgramIntroSection";
import ProgramNewYearsSection from "../ProgramNewSection";
import ProgramOtherProgramSection from "../ProgramOtherProgramSection";
import ProgramOverviewSection from "../ProgramOverviewSection";
import ProgramPlayBasedLearningSection from "../ProgramPlayBasedLearningSection";
import ProgramTeachersSection from "../ProgramTeachersSection";
import ProgramTitleSection from "../ProgramTitleSection";
import ProgramTuitionAndFeesSection from "../ProgramTuitionAndFeesSection";

// Keep above-the-fold components as regular imports

// These components don't exist, removing imports

// Dynamic imports for below-the-fold sections

interface EarlyYearsProgramDetailProps {
  data: CurriculumPageJson;
}

export default function EarlyYearsProgramDetail({ data }: EarlyYearsProgramDetailProps) {
  const { sections } = data;

  const [
    introSection,
    curriculumSection,
    overviewSection,
    playBasedLearningSection,
    newYearsSection,
    teacherSection,
    tuitionAndFeesSection,
    otherProgramSection,
    admissionKeyDateSection,
    applyNowSection,
  ] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionWithTabJson,
    SectionJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<SectionProfileJson[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (items: SectionProfileJson[], index: number) => {
    setModalData(items);
    setModalIndex(index);
    setModalOpen(true);
  };

  function onClose() {
    setModalOpen(false);
  }

  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <ProgramTitleSection data={data} />
      <ProgramIntroSection data={introSection} breadcrumbData={breadcrumbData} />
      <ProgramCurriculumSection data={curriculumSection} />

      <LazySection>
        <ProgramOverviewSection data={overviewSection} navBox={data.navBox1} />
      </LazySection>
      <LazySection>
        <ProgramPlayBasedLearningSection data={playBasedLearningSection} />
      </LazySection>
      <LazySection>
        <ProgramNewYearsSection data={newYearsSection} />
      </LazySection>
      <LazySection>
        <ProgramTeachersSection data={teacherSection} openModal={openModal} />
      </LazySection>
      <LazySection>
        <ProgramTuitionAndFeesSection data={tuitionAndFeesSection} />
      </LazySection>
      <LazySection>
        <ProgramOtherProgramSection data={otherProgramSection} />
      </LazySection>

      <LazySection>
        <MarkYourCalendarSection
          data={admissionKeyDateSection}
          variant="secondary"
          descriptionAdmissionCardClassName="w-full"
          className="max-md:pb-0"
          requiredShowTitle={false}
          customMinusTopOffset={1}
        />
      </LazySection>

      <LazySection>
        <ApplyNowSection
          data={applyNowSection}
          haveArrow
          asbVectorClassName="max-sm:bottom-2"
          indexImageClassName="z-30"
        />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="early-year-program"
          carouselName="earlyYearProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>

      {modalOpen && <ProfileModal open={modalOpen} onClose={onClose} profiles={modalData} initialIndex={modalIndex} />}
    </div>
  );
}
