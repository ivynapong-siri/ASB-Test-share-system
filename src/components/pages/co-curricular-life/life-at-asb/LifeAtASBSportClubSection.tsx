"use client";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import HoverCard from "@/components/custom/cards/hover-card";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface LifeAtASBSportClubSectionProps {
  data: SectionJson;
}

const RenderCard = ({
  item,
  index,
  onOpenModal,
}: {
  item: SectionCardJson;
  index: number;
  onOpenModal: (index: number) => void;
}) => {
  const handleButton = () => {
    onOpenModal(index);
  };

  return (
    <HoverCard
      key={item.id}
      title={item.title}
      backgroundContent={
        <Image
          src={item.image?.imageMediumLargeUrl || item.image?.imageUrl || ""}
          alt={item.title}
          className="z-0 rounded-4xl object-cover"
          fill
          priority
        />
      }
      isHover={false}
      buttonLabel={item.buttonLabel}
      onClick={handleButton}
      buttonLink={item.buttonUrl}
      linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white text-sm"
      iconClassName="border-primary-400 text-secondary group-hover/button:text-white group-hover/button:border-white"
      className="h-120 w-full lg:h-130"
    />
  );
};

const LifeAtASBSportClubSection = ({ data }: LifeAtASBSportClubSectionProps) => {
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
    <SectionContainer className="px-10" sectionClassName="bg-primary">
      <div className="flex w-full flex-col items-center pb-15 lg:pb-21">
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} className="text-white" />
        <ASBDescription
          description={data.description ?? ""}
          className="w-full pt-6 text-center text-white lg:max-w-[640px]"
        />
      </div>
      <div className="mt-5 grid w-full grid-cols-1 gap-6 pb-8 md:grid-cols-2 xl:grid-cols-3">
        {data.cards &&
          data.cards.map((item, index) => (
            <div key={item.id} className="flex w-full">
              <RenderCard key={index} item={item} index={index} onOpenModal={handleOpenModal} />
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "/"} linkButtonVariant="secondary" />
      </div>

      {isModalOpen && (
        <ModalFlatCard
          slides={data.cards ?? []}
          buttonName="sport-clubs-at-xcl-asb-facilities-modal"
          carouselName="SportClubsAtXclAsbIndoorFacilitiesModal"
          otherLabel="Other Sports Club"
          onClose={handleCloseModal}
          currentIndex={activeIndex}
        />
      )}
    </SectionContainer>
  );
};

export default LifeAtASBSportClubSection;
