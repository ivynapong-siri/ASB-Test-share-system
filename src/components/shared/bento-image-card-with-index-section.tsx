"use client";

import "@/client/styles/parent-involvement-layout.css";

import { PatternStroke1, PatternStroke2 } from "../shapes";

import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import BentoCard from "../custom/cards/bento-card";
import TitleDescriptionCenterContainer from "../custom/title-description-center-container";

interface BentoImageCardWithIndexSectionProps {
  data: SectionJson;
  requiredVector?: boolean;
}

interface DesktopCardProps {
  index: number;
  card: SectionCardJson;
  textAlign: "left" | "right";
}

function DesktopCard(props: DesktopCardProps) {
  const { index, card, textAlign } = props;
  const textClass = textAlign === "right" ? "right-0 translate-x-full" : "left-0 -translate-x-full text-end";
  const currentIndex = index + 1;

  return (
    <div className={`content-${currentIndex}`}>
      <BentoCard image={card.image?.imageUrl ?? ""} className="h-full" numb={currentIndex} />
      <h1
        className={cn(
          "text-primary-400 absolute top-1/2 max-w-64 -translate-y-1/2 p-4 text-xl font-semibold",
          textClass
        )}
      >
        {card.title}
      </h1>
    </div>
  );
}

interface MobileCardProps {
  index: number;
  card: SectionCardJson;
  imageClassName?: string;
}

function MobileCard({ index, card, imageClassName }: MobileCardProps) {
  const isRight = index % 2 === 0;
  const containerClassName = isRight ? "justify-end" : "flex-row-reverse justify-start";
  const textClassName = isRight ? "text-end pr-4" : "pl-4";

  return (
    <div className={cn("flex w-full grow items-center", containerClassName)}>
      <h6 className={cn("text-primary-400 w-36 grow font-semibold", textClassName)}>{card.title}</h6>
      <BentoCard image={card.image?.imageUrl ?? ""} className={cn("h-44 w-44", imageClassName)} numb={index + 1} />
    </div>
  );
}

const MAPPING_DESKTOP: ("left" | "right")[] = ["left", "right", "right", "left", "right", "left"];

const BentoImageCardWithIndexSection = ({ data, requiredVector = true }: BentoImageCardWithIndexSectionProps) => {
  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();

  return (
    <TitleDescriptionCenterContainer
      title={data.title ?? ""}
      description={data.description ?? ""}
      ribbonText={data.ribbonText ?? ""}
      vectorChildren={
        requiredVector && (
          <>
            <PatternStroke2 className="absolute top-12 -left-22 h-[132px] w-[180px] rotate-49 lg:top-0 lg:-left-26 lg:h-[265px] lg:w-[361px]" />
            <PatternStroke1 className="absolute top-4 -right-26 h-[74px] w-[166px] rotate-33 lg:top-0 lg:-right-24 lg:h-[148px] lg:w-[333px]" />
          </>
        )
      }
    >
      {/* Desktop */}
      {!isLaptop && data.cards && (
        <div
          className={cn(
            "hidden max-w-2xl gap-4 md:block",
            data.cards.length < 4 ? "small-template-container" : "big-template-container"
          )}
        >
          {data.cards &&
            data.cards.map((card: SectionCardJson, index: number) => (
              <DesktopCard card={card} index={index} textAlign={MAPPING_DESKTOP[index]} />
            ))}
        </div>
      )}

      {/* Laptop/Mobile */}
      {isLaptop && (
        <div className="flex w-full flex-col gap-4 xl:hidden">
          {data.cards &&
            data.cards.map((card: SectionCardJson, index: number) => (
              <MobileCard card={card} index={index} imageClassName={[0, 4].includes(index) ? "h-64 w-52" : undefined} />
            ))}
        </div>
      )}
    </TitleDescriptionCenterContainer>
  );
};

export default BentoImageCardWithIndexSection;
