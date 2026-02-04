"use client";

import { useEffect, useRef, useState } from "react";

import ActiveCarousel from "@/components/carousel/active-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { PaintTubeIcon } from "@/components/icons";
import { PatternStroke2 } from "@/components/shapes";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProgramIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const ProgramIntroSection = ({ data, breadcrumbData }: ProgramIntroSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const minCardsToLoop = 4;
  const cards =
    (data?.cards ?? []).length < minCardsToLoop
      ? [...(data?.cards ?? []), ...(data?.cards ?? [])]
      : (data?.cards ?? []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionMarginLeft, setSectionMarginLeft] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSectionMarginLeft(rect.left + 40);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        setSectionMarginLeft(sectionRef.current.getBoundingClientRect().left + 40);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <SectionContainer
        ref={sectionRef}
        className="gap-14 lg:gap-10"
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-3 -right-6 -z-2 size-30 lg:-top-22 lg:-right-50 lg:h-65 lg:w-90" />
            <PaintTubeIcon className="absolute top-19 right-19 -z-1 h-8 w-6 lg:top-22 lg:right-32 lg:h-17 lg:w-10" />
          </>
        }
      >
        <BreadcrumbCustom
          data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
        />

        <div className="flex flex-col items-stretch lg:flex-row">
          <div className="flex w-full flex-col max-md:items-center">
            <ASBRibbonText title={data.ribbonText ?? ""} className="max-lg:translate-x-8" />
            <div className="flex w-full flex-col gap-7 xl:w-[463px] xl:gap-8">
              <ASBTitle title={data.title ?? ""} className="z-30 text-start max-md:text-center" as="h1" />

              {data.subtitle && (
                <h2 className="text-primary-400 font-sans text-xl/[1.625rem] font-semibold max-md:text-center">
                  {data.subtitle}
                </h2>
              )}

              <span className="font-mono text-sm text-neutral-300 max-md:text-center lg:text-base xl:text-lg">
                {data.description}
              </span>
            </div>
          </div>
          <div className="relative flex w-full max-xl:hidden">
            <ActiveCarousel
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              slides={cards ?? []}
              paddingLeft={120}
              whiteBoxPosition="-left-1"
            />
          </div>
        </div>
      </SectionContainer>

      <div className="flex w-full xl:hidden">
        <ActiveCarousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} slides={cards ?? []} />
      </div>
    </>
  );
};

export default ProgramIntroSection;
