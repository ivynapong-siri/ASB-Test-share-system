"use client";

import { getImageUrl } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface EnglishLanguageLearnerProgramAcrossSectionProps {
  acrossData: SectionJson;
}

function CardImage({ imageUrl, fallbackUrl, cardId }: { imageUrl: string; fallbackUrl: string; cardId: number }) {
  const [src, setSrc] = useState(imageUrl);

  return (
    <Image
      src={src}
      alt={`across-image-${cardId}`}
      fill
      className="object-cover"
      priority
      onError={() => setSrc(fallbackUrl)}
    />
  );
}

export default function EnglishLanguageLearnerProgramAcrossSection({
  acrossData,
}: EnglishLanguageLearnerProgramAcrossSectionProps) {
  const isMobile = useIsMobile();

  return (
    <SectionContainer className="items-center gap-8 max-lg:pt-0">
      <div className="flex flex-col items-center">
        <ASBRibbonText title={acrossData.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={acrossData.title ?? ""} className="max-w-[940px]" />
      </div>
      <ASBDescription description={acrossData.description ?? ""} className="max-w-4xl text-center" />
      <div className="grid w-full gap-4 xl:grid-cols-3 xl:grid-rows-2">
        {acrossData.cards &&
          acrossData.cards.map((card, index) => {
            const imageUrl = getImageUrl(card, isMobile);
            const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";

            return (
              <HoverCard
                key={`across-card-${card.id}`}
                title={card.title}
                forceHover={isMobile ? true : index === 0}
                className={cn("col-span-1", index === 0 ? "xl:row-span-2 xl:h-full" : "xl:h-72 2xl:h-96")}
                description={card.description}
                descriptionClassName="font-mono"
                backgroundContent={<CardImage imageUrl={imageUrl} fallbackUrl={fallbackUrl} cardId={card.id} />}
                contentClassName="min-w-0"
                contentStyleTranslation={0}
              />
            );
          })}
      </div>
    </SectionContainer>
  );
}
