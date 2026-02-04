import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke2 } from "@/components/shapes";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface ProgramPlayBasedLearningSectionProps {
  data: SectionJson;
  isShowVector?: boolean;
  isBackgroundIcon?: boolean;
  patternClassName?: string;
}

const RenderCards = ({
  card,
  isLast,
  cardLength,
  isBackgroundIcon,
}: {
  card: SectionCardJson;
  isLast: boolean;
  cardLength: number;
  isBackgroundIcon?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-primary-gray relative flex w-full flex-col gap-4 overflow-hidden rounded-4xl px-6 py-8",
        isLast && cardLength % 2 != 0 && "lg:col-span-2",
        isBackgroundIcon && "px-12"
      )}
    >
      <div className={cn("relative h-15 w-15 shrink-0", isBackgroundIcon && "absolute top-0 left-0 z-0")}>
        <Image alt="clock" src={card.image2?.imageUrl ?? ""} fill className="object-cover" priority />
      </div>
      <p className="text-primary-400 z-1 font-sans text-2xl font-semibold">{card.title}</p>
      <p className="text-neutral z-1 font-mono text-sm">{card.description}</p>
    </div>
  );
};

export default function ProgramPlayBasedLearningSection({
  data,
  isShowVector = true,
  isBackgroundIcon = false,
  patternClassName,
}: ProgramPlayBasedLearningSectionProps) {
  const cards = data.cards ?? [];
  const lastIndex = cards.length - 1;

  return (
    <SectionContainer
      className="flex gap-15 max-md:pb-36 md:flex-row"
      vectorChildren={
        isShowVector && (
          <PatternStroke2
            className={cn(
              "absolute -left-20 z-10 h-34 w-49 rotate-12 max-md:top-[525px] md:top-auto md:-bottom-8 md:h-75 md:w-96",
              patternClassName
            )}
          />
        )
      }
    >
      <div className="md:pt-20">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <div className="flex max-w-96 flex-col gap-8 md:w-[463px] lg:pb-12">
          <ASBTitle title={data.title ?? ""} className="text-start" />
          <ASBDescription description={data.description ?? ""} />
        </div>
        {data.buttonLabel && data.buttonUrl && (
          <div className="max-md:pt-8">
            <LinkButton buttonText={data.buttonLabel} linkClassName="max-sm:text-xs" href={data.buttonUrl} />
          </div>
        )}
      </div>

      <div className="-mb-15 flex flex-col">
        <div className="relative mb-7 h-75 md:h-89">
          <Image
            src={data.image?.imageMediumLargeUrl || data.image?.imageUrl || ""}
            alt=""
            fill
            className="rounded-[50px] object-cover"
            priority
          />
        </div>
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
          {cards.map((card, index) => (
            <RenderCards
              key={card.id}
              card={card}
              isLast={index === lastIndex}
              cardLength={cards.length}
              isBackgroundIcon={isBackgroundIcon}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
