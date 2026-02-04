"use client";

import { PatternStroke2, TextHighlight1 } from "@/components/shapes";
import { useEffect, useRef, useState } from "react";

import ActiveCarousel from "@/components/carousel/active-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { PaintTubeIcon } from "@/components/icons";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SchoolFacilitiesIndoorSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const RenderHeader = ({ ribbon, title }: { ribbon: string; title: string }) => {
  return (
    <div className="flex flex-col gap-6 pt-24 lg:gap-6 lg:pt-20">
      <ASBRibbonText title={ribbon} vectorHidden />
      <div className="flex flex-row lg:items-end">
        <ASBTitle title={title} />
        <TextHighlight1 className="relative h-14 w-16" />
      </div>
    </div>
  );
};

const SchoolFacilitiesIndoorSection = ({ data, breadcrumbData }: SchoolFacilitiesIndoorSectionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionMarginLeft, setSectionMarginLeft] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSectionMarginLeft(rect.left + 40);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        setSectionMarginLeft(sectionRef.current.getBoundingClientRect().left + 40);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <SectionContainer
        ref={sectionRef}
        className="max-md:pb-0 lg:pb-8"
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-18.5 -right-18 z-1 h-32 w-44 rotate-[24deg] lg:top-0 lg:-right-25 lg:h-[265px] lg:w-[360px] lg:rotate-0" />
            <PaintTubeIcon className="absolute top-[122px] right-[94px] z-1 h-9 w-5 rotate-[26deg] lg:top-[174px] lg:right-[220px] lg:h-[70px] lg:w-[42px] lg:rotate-0" />
          </>
        }
      >
        <BreadcrumbCustom
          data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
        />
        <RenderHeader ribbon={data.ribbonText ?? ""} title={data.title ?? ""} />

        <div className="flex justify-end pt-8 pb-16 xl:pt-[4.5rem] xl:pb-0">
          <p className="font-mono text-base/[1.625rem] text-neutral-300 xl:w-1/2">{data.description}</p>
        </div>
      </SectionContainer>

      <div className="relative flex w-full max-w-screen pb-8 lg:pb-20">
        <ActiveCarousel
          slides={data.cards ?? []}
          activeIndex={activeIndex}
          paddingLeft={sectionMarginLeft}
          setActiveIndex={setActiveIndex}
          modalPopup={
            <ModalFlatCard
              slides={data.cards ?? []}
              buttonName="indoor-facilities-modal"
              carouselName="indoorFacilitiesModal"
              otherLabel="Other Learning Spaces"
              onClose={() => handleCloseModal()}
              currentIndex={activeIndex}
            />
          }
          onClick={() => handleOpenModal()}
          isModalOpen={isModalOpen}
        />
      </div>
    </>
  );
};

export default SchoolFacilitiesIndoorSection;
