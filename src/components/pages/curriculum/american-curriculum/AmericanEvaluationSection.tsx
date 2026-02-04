"use client";

import { ComponentProps, useState } from "react";

import { getImageUrl } from "@/client/utils/helper";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";

interface AmericanEvaluationSectionProps {
  data: SectionJson;
}
interface renderBlogCardProp extends ComponentProps<"div"> {
  card: SectionCardJson;
  isMobile: boolean;
}

function RenderBlogCard({ card, className, isMobile }: renderBlogCardProp) {
  const primaryUrl = getImageUrl(card, isMobile);
  const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col-reverse items-start gap-x-4 gap-y-4 md:max-w-none md:items-center md:justify-center",
        className
      )}
    >
      <div className="relative h-88 w-full overflow-hidden rounded-4xl lg:w-172">
        <Image
          alt="evaluation-pic2"
          src={imgSrc}
          className="object-cover"
          fill
          priority
          onError={() => {
            if (imgSrc !== fallbackUrl) {
              console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
              setImgSrc(fallbackUrl);
            }
          }}
        />
      </div>
      <div className="bg-primary-gray rounded-2xl p-8 font-mono text-base/[1.625rem] text-neutral-300 md:max-w-xs lg:max-w-md">
        {card.description ?? ""}
      </div>
    </div>
  );
}

const AmericanEvaluationSection = ({ data }: AmericanEvaluationSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <SectionContainer className="z-20 items-center md:pt-30 md:pb-26" sectionClassName="z-10 bg-white">
      <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
      <ASBTitle title={data.title ?? ""} className="pb-8 lg:pb-18" />

      {data.cards &&
        data.cards.map((card, index) => (
          <RenderBlogCard
            key={index}
            card={card}
            isMobile={isMobile}
            className={index % 2 === 0 ? "pb-4 md:flex-row-reverse" : "md:flex-row"}
          />
        ))}
    </SectionContainer>
  );
};

export default AmericanEvaluationSection;
