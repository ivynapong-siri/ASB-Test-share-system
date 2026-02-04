"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

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

interface SportWideVarietySectionProps {
  data: SectionJson;
}

interface ModalConfig {
  active: boolean;
  index: number;
}

export default function SportWideVarietySection({ data }: SportWideVarietySectionProps) {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ active: false, index: -1 });

  function onClose() {
    setModalConfig({ active: false, index: -1 });
  }

  function onOpen(index: number) {
    setModalConfig({ active: true, index });
  }

  return (
    <>
      <SectionContainer
        className="items-center"
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-14 -left-28 w-40 rotate-[20deg] xl:top-48 xl:-left-32 xl:w-80" />
            <PatternStroke1 className="absolute -top-10 -right-24 h-[150px] w-40 xl:-right-20 xl:w-80" />
          </>
        }
      >
        <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={data.title ?? ""} />
        <ASBDescription description={data.description ?? ""} className="mt-6 max-w-xl text-center xl:mt-12" />
        <div className="mt-24 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.cards &&
            data.cards.map((card: SectionCardJson, index: number) => (
              <HoverCard
                key={`${card.id}-${index}`}
                isProfile
                className="col-span-1"
                title={card.title}
                isHover={false}
                backgroundContent={
                  <Image src={card.image?.imageUrl ?? ""} alt={`variety-${card.id}`} fill className="object-cover" />
                }
                linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
                iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
                buttonLabel={card.buttonLabel ?? ""}
                buttonLink={card.buttonUrl ?? "#"}
                buttonAction={() => {
                  onOpen(index);
                }}
                requiredHiddenStrip={false}
              />
            ))}
        </div>
      </SectionContainer>

      {modalConfig.active && (
        <ModalFlatCard
          onClose={onClose}
          slides={data.cards ?? []}
          carouselName="sport-co-curricular"
          buttonName="sport-co-curricular"
          otherLabel=""
          currentIndex={modalConfig.index}
        />
      )}
    </>
  );
}
