"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import ProfileModal from "@/components/custom/modals/profile-modal";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { useState } from "react";
import XCLASBStoryFacilitySection from "./XCLASBStoryFacilitySection";
import XCLASBStoryIntroSection from "./XCLASBStoryIntroSection";
import XCLASBStoryKeyPillarsSection from "./XCLASBStoryKeyPillarsSection";
import XCLASBStoryMoreAboutXCLSection from "./XCLASBStoryMoreAboutXCLsection";
import XCLASBStoryOurEducatorsSection from "./XCLASBStoryOurEducatorsSection";
import XCLASBStoryOurLegacySection from "./XCLASBStoryOurLegacySection";
import XCLASBStoryTitleSection from "./XCLASBStoryTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections with SSR disabled

interface XCLASBStoryProps {
  data: AboutUsPageJson;
}

const XCLASBStoryDetail = ({ data }: XCLASBStoryProps) => {
  const { sections } = data;

  const [storySection, keyPillarsSection, ourLegacySection, moreAboutXclSection, ourEducatorsSection, facilitySection] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionWithTabJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: storySection });

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
    <div className="flex flex-col overflow-x-hidden">
      <XCLASBStoryTitleSection titleData={data} />
      <XCLASBStoryIntroSection sectionData={storySection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <XCLASBStoryKeyPillarsSection sectionData={keyPillarsSection} />
      </LazySection>

      <LazySection>
        <XCLASBStoryOurLegacySection sectionData={ourLegacySection} />
      </LazySection>

      <LazySection>
        <XCLASBStoryMoreAboutXCLSection sectionData={moreAboutXclSection} />
      </LazySection>

      <LazySection>
        <XCLASBStoryOurEducatorsSection openModal={openModal} sectionWithTabData={ourEducatorsSection} />
      </LazySection>

      <LazySection>
        <XCLASBStoryFacilitySection sectionData={facilitySection} />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="xcl-asb-story"
          carouselName="XCLASBStory"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>

      {modalOpen && <ProfileModal open={modalOpen} onClose={onClose} profiles={modalData} initialIndex={modalIndex} />}
    </div>
  );
};

export default XCLASBStoryDetail;
