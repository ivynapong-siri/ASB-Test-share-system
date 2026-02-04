"use client";

import { useEffect, useRef, useState } from "react";

import IconCard from "@/components/custom/cards/icon-card";
import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface ProjectBasedBenefitSectionProps {
  benefitData: SectionJson;
}

export default function ProjectBasedBenefitSection({ benefitData }: ProjectBasedBenefitSectionProps) {
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [maxTitleHeight, setMaxTitleHeight] = useState<number>(0);

  useEffect(() => {
    if (titleRefs.current.length > 0) {
      const heights = titleRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxTitleHeight(Math.max(...heights));
    }
  }, [benefitData]);

  return (
    <TitleDescriptionCenterContainer
      title={benefitData.title ?? ""}
      description={benefitData.description ?? ""}
      titleClassName="max-w-3xl"
      descriptionClassName="max-w-xl"
      className="lg:pt-16 lg:pb-0"
      ribbonText={benefitData.ribbonText ?? ""}
    >
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefitData.cards &&
          benefitData.cards.map((card, index) => (
            <IconCard
              key={`card-icon-${card.id}`}
              icon={
                <Image
                  src={card.image2?.imageUrl ?? ""}
                  alt={`icon-${card.id}`}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              }
              className="flex flex-col justify-between pb-16"
              title={card.title}
              description={card.description}
              titleRef={(el) => (titleRefs.current[index] = el)}
              maxTitleHeight={maxTitleHeight}
            />
          ))}
      </div>
    </TitleDescriptionCenterContainer>
  );
}
