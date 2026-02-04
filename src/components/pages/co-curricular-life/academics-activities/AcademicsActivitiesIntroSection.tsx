"use client";

import { CalendarIcon, IllustrationIcon, KnotIcon, ProtractorIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import HoverCard from "@/components/custom/cards/hover-card";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface AcademicsActivitiesIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const RenderCards = ({ card, onClick }: { card: SectionCardJson; onClick: () => void }) => {
  return (
    <HoverCard
      key={card.id}
      title={card.title}
      backgroundContent={
        <Image
          key={`${card.id}-${card.title}`}
          alt=""
          src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || "/mock-image.jpg"}
          fill
          priority
          className="object-cover transition-all duration-300 ease-out group-hover:scale-120"
        />
      }
      linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
      iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
      isHover={false}
      buttonLabel={card.buttonLabel}
      buttonLink={card.buttonUrl}
      onClick={onClick}
      contentClassName="min-w-0"
      isProfile={true}
      className="rounded-[50px]"
      requiredHiddenStrip={false}
    />
  );
};

const AcademicsActivitiesIntroSection = ({ data, breadcrumbData }: AcademicsActivitiesIntroSectionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <IntroSection
        title={data.title}
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
        description={data.description}
        ribbonText={data.ribbonText}
        imageSrc={data.image?.imageUrl ?? ""}
        textClassName="justify-center max-w-[505px]"
        showStandardVector={false}
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-10 right-1 z-10 h-33 w-45 translate-x-1/3 -rotate-180 md:top-5 lg:top-12 xl:-top-16 xl:right-8 xl:h-66 xl:w-90" />
            <PatternStroke1 className="absolute top-[830px] -left-18 z-10 h-19 w-42 rotate-35 max-sm:translate-y-full sm:top-[680px] md:top-[480px] xl:top-[630px] xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
          </>
        }
        containerClassName="sm:h-92 sm:w-88 xl:h-[596px] xl:w-[592px] transform scale-x-[-1]"
        topLeftIconClassName="-left-4 -top-4 sm:left-8 sm:top-3 md:top-0 md:left-0 lg:-left-3 xl:-left-1 transform scale-x-[-1] lg:rotate-24"
        topRightIconClassName="right-3 -top-4 sm:right-14 sm:top-7 md:top-1 lg:top-0 xl:top-4 md:right-8"
        bottomLeftIconClassName="-left-6 -bottom-2 sm:left-5 sm:bottom-8 md:left-2 md:bottom-4 lg:bottom-2 lg:left-0 transform scale-x-[-1]"
        bottomRightIconClassName="-right-4 -bottom-4 sm:right-8 sm:bottom-5 md:right-0 md:-bottom-2 lg:-right-2 transform scale-x-[-1]"
        topLeftIcon={<CalendarIcon className="h-9 w-7 lg:h-15 lg:w-11" />}
        topRightIcon={<KnotIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />}
        bottomLeftIcon={<ProtractorIcon className="h-6 w-9 md:h-7 md:w-11 lg:h-9 lg:w-15" />}
        bottomRightIcon={<IllustrationIcon className="h-5 w-9 md:h-7 md:w-12 lg:h-9 lg:w-17" />}
        children={
          <div className="grid grid-cols-1 flex-col gap-5 pt-23 md:grid-cols-2 xl:grid-cols-3">
            {data.cards &&
              data.cards.map((card, index) => (
                <div key={card.id}>
                  <RenderCards card={card} onClick={() => handleOpenModal(index)} />
                </div>
              ))}
          </div>
        }
      />

      {isModalOpen && (
        <ModalFlatCard
          slides={data.cards ?? []}
          buttonName="academics-activities"
          carouselName="academicsActivities"
          otherLabel="Other Activities"
          onClose={() => handleCloseModal()}
          currentIndex={activeIndex}
        />
      )}
    </>
  );
};

export default AcademicsActivitiesIntroSection;
