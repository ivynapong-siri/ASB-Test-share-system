"use client";

import { PatternStroke1, TextHighlight2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface XCLASBStoryMoreAboutXCLSectionProps {
  sectionData: SectionJson;
}

const XCLASBStoryMoreAboutXCLSection = ({ sectionData }: XCLASBStoryMoreAboutXCLSectionProps) => {
  const { titleLine1, titleLine2, description, cards: sectionCards } = sectionData;

  const renderVectors = () => (
    <>
      <PatternStroke1 className="absolute bottom-1/6 -left-2 hidden h-[165px] w-[260px] -rotate-10 sm:bottom-1/5 lg:-left-8 lg:flex lg:h-[225px] lg:w-[320px]" />
      <PatternStroke1 className="absolute top-80 -right-32 h-[165px] w-[260px] lg:top-60 lg:h-[225px] lg:w-[320px]" />
    </>
  );

  const renderHeader = () => {
    return (
      <>
        <div className="flex flex-row">
          <ASBTitle title={titleLine1 ?? ""} />
        </div>
        <div className="flex flex-row">
          <TextHighlight2 className="h-14 w-15" />
          <ASBTitle title={titleLine2 ?? ""} as="h3" />
        </div>
        <p className="pt-6 text-center font-mono text-neutral-300 lg:px-[280px] xl:px-[300px] 2xl:px-[500px]">
          {description}
        </p>
      </>
    );
  };

  return (
    <SectionContainer sectionClassName="bg-primary-gray" className="items-center" vectorChildren={renderVectors()}>
      {renderHeader()}

      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 pt-10 lg:grid-cols-2">
        {sectionCards?.map((card, index) => (
          <div key={`legacy-${index}`} className="flex min-h-[490px] flex-col">
            <div className="relative flex h-[245px] md:h-[400px]">
              <Image
                alt={card.image?.title ?? ""}
                src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
                fill
                className="rounded-t-[20px] object-cover"
              />
            </div>

            <div className="relative flex w-full">
              <div className="text-primary flex w-full flex-col gap-6 rounded-b-4xl bg-white px-6 py-8 lg:px-4 xl:px-[30px] 2xl:pr-[100px] 2xl:pl-[40px]">
                {card.badge && <ASBRibbonText title={card.badge} vectorHidden={true} />}
                <h5>{card.title}</h5>
                <div className="pt-4">
                  <LinkButton
                    buttonText={card.buttonLabel ?? ""}
                    href={card.buttonUrl ?? ""}
                    linkClassName=""
                    iconClassName="text-white border border-dashed border-white rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default XCLASBStoryMoreAboutXCLSection;
