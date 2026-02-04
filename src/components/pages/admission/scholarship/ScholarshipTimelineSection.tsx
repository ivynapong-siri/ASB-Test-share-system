import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface ScholarshipTimelineSectionProps {
  mineStonesSectionData: SectionJson;
}

interface CardProps {
  titleText: string;
  description: string;
  iconSrc: string;
  backgroundOverlaySrc?: string;
}

function MilestoneCard({ titleText, description, iconSrc, backgroundOverlaySrc }: CardProps) {
  return (
    <div className="relative flex min-h-44 items-start gap-6 rounded-4xl bg-white p-6">
      <div className="bg-muted rounded-md">
        <div className="relative size-12">
          <Image src={iconSrc} alt="icon" fill className="object-contain" />
        </div>
      </div>
      <div className="z-1 flex w-full flex-col gap-3 font-mono">
        <p className="font-medium tracking-widest text-neutral-400 uppercase">{titleText}</p>
        <p className="text-base/[1.625rem] text-[#555555]">{description}</p>
      </div>
      {backgroundOverlaySrc && (
        <div className="absolute right-2 bottom-3">
          <div className="relative z-0 aspect-square w-32">
            <Image src={backgroundOverlaySrc} alt="icon" fill className="object-contain" priority />
          </div>
        </div>
      )}
    </div>
  );
}

const ScholarshipTimelineSection = ({ mineStonesSectionData }: ScholarshipTimelineSectionProps) => {
  return (
    <SectionContainer className="items-center" sectionClassName="bg-primary-300">
      <ASBRibbonText className="translate-x-8" title={mineStonesSectionData.ribbonText ?? ""} />
      <ASBTitle title={mineStonesSectionData.title ?? ""} className="text-white" />
      <div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mineStonesSectionData.cards?.map((card) => (
          <MilestoneCard
            key={card.id}
            backgroundOverlaySrc={card.image2?.imageUrl}
            titleText={card.title}
            description={card.description}
            iconSrc={card.image?.imageUrl ?? "mock-image.jpg"}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ScholarshipTimelineSection;
