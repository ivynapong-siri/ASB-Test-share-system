"use client";

import HoverCard from "@/components/custom/cards/hover-card";
import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface ProjectBasedAcrossSectionProps {
  acrossData: SectionJson;
}

export default function ProjectBasedAcrossSection({ acrossData }: ProjectBasedAcrossSectionProps) {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const cards = acrossData.cards ?? [];

  return (
    <TitleDescriptionCenterContainer
      title={acrossData.title ?? ""}
      titleClassName="max-w-4xl"
      description={acrossData.description ?? ""}
      descriptionClassName="max-w-xl"
      ribbonText={acrossData.ribbonText ?? ""}
      className="max-md:pt-5"
    >
      <div className="hidden w-full gap-4 md:flex">
        {[0, 1].map((col) => (
          <div key={col} className="flex w-1/2 flex-col gap-4">
            {cards
              .filter((_, index) => index % 2 === col)
              .map((card, idx, columnCards) => {
                const isHovered = card.id === hoveredCardId;
                const isAboveHovered = hoveredCardId !== null && columnCards[idx + 1]?.id === hoveredCardId;
                const isBelowHovered = hoveredCardId !== null && columnCards[idx - 1]?.id === hoveredCardId;

                const heightClass = isHovered
                  ? "h-[480px]"
                  : isAboveHovered || isBelowHovered
                    ? "h-[280px]"
                    : "h-[380px]";

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`transition-all duration-300 ${heightClass}`}
                  >
                    <HoverCard
                      key={`large-hover-${card.id}`}
                      className="h-full"
                      title={card.title}
                      badgeLabel={card.badge}
                      badgeClassName="text-secondary-200"
                      description={card.description}
                      descriptionMobile={card.descriptionMobile}
                      descriptionClassName="text-sm/[20px] font-mono"
                      backgroundContent={
                        <Image
                          src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
                          alt={`card-image-${card.id}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      }
                      contentStyleTranslation={100}
                      customBackground
                      overlayClassName="bg-primary top-[50%] h-fit"
                    />
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {cards.map((card) => (
          <HoverCard
            key={`mobile-hover-${card.id}`}
            className="h-[540px]"
            title={card.title}
            badgeLabel={card.badge}
            badgeClassName="text-secondary-200"
            description={card.description}
            descriptionMobile={card.descriptionMobile}
            backgroundContent={
              <Image
                src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
                priority
                alt={`card-image-${card.id}`}
                fill
                className="object-cover"
              />
            }
            contentStyleTranslation={-8}
            backgroundClassName="to-[#0A3156]"
            overlayClassName="to-[#0A3156]"
          />
        ))}
      </div>
    </TitleDescriptionCenterContainer>
  );
}
