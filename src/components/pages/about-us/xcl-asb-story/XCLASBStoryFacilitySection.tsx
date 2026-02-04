"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { formattedPaddingNumbers } from "@/server/utils/helpers";
import Image from "next/image";
interface XCLASBStoryFacilitySectionProps {
  sectionData: SectionJson;
}

const XCLASBStoryFacilitySection = ({ sectionData }: XCLASBStoryFacilitySectionProps) => {
  const { ribbonText, title, description, cards, buttonLabel, buttonUrl } = sectionData;

  const renderVectors = () => (
    <>
      <PatternStroke1 className="absolute bottom-1/4 -left-16 hidden h-[150px] w-[350px] lg:block" />
      <PatternStroke2 className="absolute -top-20 -right-50 hidden h-40 w-86 lg:block" />
    </>
  );

  return (
    <SectionContainer vectorChildren={renderVectors()}>
      <div className="flex w-full flex-col justify-between bg-white lg:flex-row xl:gap-20">
        <div className="flex-1/2 pb-8 lg:pb-0">
          {ribbonText && <ASBRibbonText title={ribbonText} />}
          {title && <ASBTitle title={title} className="text-start" />}
        </div>
        <div className="flex-1/2">
          {description && (
            <p className="pb-7 font-mono text-neutral-300 lg:pt-20 lg:pb-8 xl:pt-20 2xl:pr-[60px]">{description}</p>
          )}
          {buttonLabel && buttonUrl && (
            <div className="pt-4">
              <LinkButton
                buttonText={buttonLabel}
                href={buttonUrl}
                iconClassName="size-7 p-1 text-white border border-dashed border-white rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:pt-[100px]">
        {cards?.map((card, index) => (
          <div key={`card-${index}`} className="flex min-h-[338px] flex-col">
            <div className="relative flex h-[240px]">
              <Image
                alt={card.image?.title ?? ""}
                src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
                fill
                priority
                className="rounded-t-[20px] object-cover"
              />
            </div>
            <div className="relative flex h-[98px]">
              <div className="text-primary bg-primary-gray flex w-full flex-col gap-6 rounded-b-4xl px-6 py-8 lg:px-3 xl:px-6">
                <h6>{card.title}</h6>
                <div className="bg-primary absolute top-0 z-10 -translate-y-1/2 rounded-4xl px-6 py-1 font-mono font-medium text-white">
                  {formattedPaddingNumbers(index)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default XCLASBStoryFacilitySection;
