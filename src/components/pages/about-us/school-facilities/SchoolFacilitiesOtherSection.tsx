"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import OtherFacilitiesCarousel from "@/components/carousel/other-facilities-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface SchoolFacilitiesOtherSectionProps {
  data: SectionJson;
}

const SchoolFacilitiesOtherSection = ({ data }: SchoolFacilitiesOtherSectionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const minLoopCard = 6;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SectionContainer
        className="px-0 lg:min-h-screen lg:px-10 lg:py-40"
        vectorChildren={
          <>
            <PatternStroke1 className="absolute top-16 -right-12 h-16 w-42 lg:-right-6 lg:h-[165px] lg:w-[330px] lg:rotate-0" />
            <PatternStroke2 className="absolute bottom-14 -left-24 z-1 h-[140px] w-[200px] lg:-bottom-12 lg:left-1/4 lg:h-[260px] lg:w-[360px]" />
          </>
        }
      >
        <OtherFacilitiesCarousel
          slides={data.cards ?? []}
          loopNumber={minLoopCard}
          isModalOpen={isModalOpen}
          onClick={() => handleOpenModal()}
          setActiveIndex={setActiveIndex}
          children={
            <div className="flex flex-col max-lg:px-10">
              <ASBRibbonText title={data.ribbonText ?? ""} />
              <ASBTitle title={data.title ?? ""} className="text-start" />
              <p className="pt-8 font-mono text-base/[1.625rem] text-neutral-300">{data.description}</p>
            </div>
          }
          modalPopup={
            <ModalFlatCard
              slides={data.cards ?? []}
              buttonName="outdoor-facilities-modal"
              carouselName="outdoorFacilitiesModal"
              otherLabel="Other Facilities"
              onClose={() => handleCloseModal()}
              currentIndex={activeIndex}
            />
          }
        />
      </SectionContainer>
    </>
  );
};

export default SchoolFacilitiesOtherSection;
