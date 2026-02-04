"use client";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import ModalFlatCard from "@/components/custom/modals/modal-flat-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface ProgramCurriculumSectionProps {
  data: SectionJson;
}

interface ModalConfig {
  active: boolean;
  index: number;
}

const RenderCards = ({ card, onClick }: { card: SectionCardJson; onClick: () => void }) => {
  return (
    <HoverCard
      title={card.title}
      backgroundContent={
        <Image
          key={`${card.id}-${card.title}`}
          alt=""
          src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
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
      contentClassName="min-w-0"
      isProfile={true}
      requiredHiddenStrip={false}
      className="rounded-[50px]"
      buttonAction={onClick}
    />
  );
};

export default function ProgramCurriculumSection({ data }: ProgramCurriculumSectionProps) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ active: false, index: -1 });

  function onClose() {
    setModalConfig({ active: false, index: -1 });
  }

  function onOpen(index: number) {
    setModalConfig({ active: true, index });
  }

  return (
    <>
      {modalConfig.active && (
        <ModalFlatCard
          onClose={onClose}
          slides={data.cards ?? []}
          carouselName="programCurriculum"
          buttonName="program-curriculum"
          otherLabel=""
          currentIndex={modalConfig.index}
        />
      )}
      <SectionContainer sectionClassName="bg-primary-gray" className="items-center justify-center">
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8 text-center" />
        <div className="flex flex-col items-center gap-7 pb-15 text-center xl:pb-13">
          <ASBTitle title={data.title ?? ""} className="max-w-[900px]" />
          <ASBDescription description={data.description ?? ""} className="max-w-[800px] sm:text-lg" />
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:flex xl:flex-wrap xl:justify-center xl:gap-5">
          {data.cards &&
            data.cards.map((card, index) => (
              <div key={card.id} className="xl:w-[calc(33.333%-20px)] xl:flex-shrink-0">
                <RenderCards card={card} onClick={() => onOpen(index)} />
              </div>
            ))}
        </div>
      </SectionContainer>
    </>
  );
}
