"use client";

import { getImageUrl } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { useState } from "react";

interface AmericanActivitiesProps {
  data: SectionJson;
}

const RenderCard = ({ card }: { card: SectionCardJson }) => {
  const isMobile = useIsMobile();
  const primaryUrl = getImageUrl(card, isMobile);
  const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <HoverCard
      title={card.title}
      backgroundContent={
        <Image
          key={`${card.id}-${card.title}`}
          alt=""
          src={imgSrc}
          fill
          className="object-cover transition-all duration-300 ease-out group-hover:scale-120"
          priority
          onError={() => {
            if (imgSrc !== fallbackUrl) {
              console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
              setImgSrc(fallbackUrl);
            }
          }}
        />
      }
      linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
      iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
      isHover={true}
      description={card.description}
      buttonLabel={card.buttonLabel}
      buttonLink={card.buttonUrl}
      contentClassName="min-w-0"
      className="rounded-[50px]"
      buttonOnHover={true}
      overlayClassName={"flex flex-col-reverse items-start gap-4"}
      descriptionClassName="font-mono"
      descriptionDivClassName="gap-2"
      titleClassName="pb-4"
      customContentHoverClassName="pb-0 "
      contentStyleTranslation={8}
    />
  );
};

export default function AmericanActivitiesSection({ data }: AmericanActivitiesProps) {
  return (
    <SectionContainer className="max-md:pb-0" sectionClassName="z-0">
      <div className="flex flex-col gap-10 pt-12 pb-15 md:pt-0 lg:flex-row lg:justify-center xl:pb-20">
        <ASBTitle title={data.title ?? ""} className="max-w-[900px] text-start lg:max-w-xl" />
        <ASBDescription description={data.description ?? ""} className="max-w-[570px]" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:pb-10">
        {data.cards &&
          data.cards.map((card) => (
            <div className="aspect-[3/2] w-full lg:w-[48%] lg:max-w-[620px]" key={card.id}>
              <RenderCard card={card} />
            </div>
          ))}
      </div>
    </SectionContainer>
  );
}
