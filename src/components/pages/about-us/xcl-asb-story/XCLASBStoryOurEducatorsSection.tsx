"use client";

import { PatternStroke3, PatternStroke4 } from "@/components/shapes";

import HoverCardWithFilterSection from "@/components/shared/hover-card-with-filter-section";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface XCLASBStoryOurEducatorsSectionProps {
  sectionWithTabData: SectionWithTabJson;
  openModal: (items: any[], index: number) => void;
}

const renderVectors = () => (
  <>
    <PatternStroke3 color="white" className="absolute top-10 -right-8 h-20 w-20 lg:top-42 lg:h-28 lg:w-28" />
    <PatternStroke4
      color="white"
      className="absolute bottom-[100px] -left-12 h-13 w-39 sm:bottom-2/5 lg:-left-3 lg:h-14 lg:w-40"
    />
  </>
);

const XCLASBStoryOurEducatorsSection = ({ sectionWithTabData, openModal }: XCLASBStoryOurEducatorsSectionProps) => {
  return (
    <HoverCardWithFilterSection
      data={sectionWithTabData}
      isFilterDropdown={true}
      isProfile={true}
      vectorChildren={renderVectors()}
      openModal={openModal}
    />
  );
};

export default XCLASBStoryOurEducatorsSection;
