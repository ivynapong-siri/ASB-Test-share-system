"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import ProfileModal from "@/components/custom/modals/profile-modal";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";
import OurTeamGreetingFromHeadSection from "./OurTeamGreetingFromHeadSection";
import OurTeamGreetingFromPrincipal from "./OurTeamGreetingFromPrincipalSection";
import OurTeamHeadOfSchoolSection from "./OurTeamHeadOfSchoolSection";
import OurTeamTeacherSection from "./OurTeamTeacherSection";
import OurTeamTitleSection from "./OurTeamTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface OurTeamDetailProps {
  data: AboutUsPageJson;
}

const OurTeamDetail = ({ data }: OurTeamDetailProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<SectionProfileJson[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const { sections } = data;
  const [
    introSection,
    greetingPrincipalSection,
    headOfSchoolSection,
    principalSection,
    headOfDivisionSection,
    ourTeacher,
  ] = sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

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
      <OurTeamTitleSection data={data} />
      <OurTeamGreetingFromHeadSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <OurTeamGreetingFromPrincipal data={greetingPrincipalSection} />
      </LazySection>

      <LazySection>
        <OurTeamHeadOfSchoolSection
          openModal={openModal}
          headOfSchoolData={headOfSchoolSection}
          principalData={principalSection}
          headOfDivisionData={headOfDivisionSection}
        />
      </LazySection>

      <LazySection>
        <OurTeamTeacherSection openModal={openModal} data={ourTeacher} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="our-team"
          carouselName="ourTeam"
          sectionContainerClassName="bg-primary-gray"
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

export default OurTeamDetail;
