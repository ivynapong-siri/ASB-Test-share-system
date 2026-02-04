"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import EducationCarousel from "@/components/carousel/education-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface XCLEducationIntroSectionProps {
  sectionData: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const XCLEducationIntroSection = ({ sectionData, breadcrumbData }: XCLEducationIntroSectionProps) => {
  const { ribbonText, title, titleLine1, titleLine2, description, cards } = sectionData;
  const renderVectors = () => (
    <>
      <PatternStroke1 className="absolute top-48 right-0 h-[75px] w-[167px] lg:top-8 lg:h-[150px] lg:w-[330px]" />
      <PatternStroke2 className="absolute bottom-20 -left-6 h-[265px] w-[6rem] lg:-left-40 lg:w-[360px]" />
    </>
  );

  const infoData = cards?.[cards.length - 1];
  const slidesCards = sectionData?.cards?.length ? sectionData.cards.filter((c) => c.image !== null) : [];

  return (
    <SectionContainer
      className="gap-20 py-24 lg:gap-10 lg:pt-32 lg:pb-20"
      vectorChildren={renderVectors()}
      sectionClassName="w-full"
    >
      <BreadcrumbCustom data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }} />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="text-primary w-fit flex-col text-3xl font-semibold lg:text-4xl xl:text-6xl">
          {ribbonText && <ASBRibbonText title={ribbonText} />}
          {title && (
            <ASBTitle
              title={title.replace("XCL Education", "\nXCL Education")}
              className="text-start whitespace-pre-line"
              as="h1"
            />
          )}
          {titleLine1 && <ASBTitle title={titleLine1} className="text-start" as="h3" />}
          {titleLine2 && <ASBTitle title={titleLine2} className="text-start" as="h4" />}
        </div>
        {description && (
          <p className="font-mono text-base/[1.625rem] text-neutral-300 lg:max-w-xl lg:pt-15 lg:text-lg 2xl:max-w-3xl">
            {description}
          </p>
        )}
      </div>
      <EducationCarousel cards={slidesCards} />
      <div className="flex flex-col items-center text-center">
        <ASBRibbonText vectorHidden title={infoData?.ribbonText ?? ""} />
        <p className="text-primary-400 pt-6 text-xl/[1.625rem] font-semibold lg:pt-3 lg:text-[2rem]/[2rem]">
          {infoData?.title}
        </p>
        <p className="pt-4 font-mono text-base/[1.625rem] text-neutral-300 lg:pt-8 lg:text-lg xl:max-w-2xl">
          {infoData?.description}
        </p>
      </div>
    </SectionContainer>
  );
};

export default XCLEducationIntroSection;
