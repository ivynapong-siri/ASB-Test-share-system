"use client";

import { AnimatedFadeInWhenVisible, AnimatedFlexItems } from "@/components/shared/animation-section";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";
import { useEffect, useRef, useState } from "react";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "../../custom/asb-ribbon-text";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import SlideCarousel from "../../carousel/slide-carousel";

interface HomeASBStoryProps {
  asbStoryData: SectionJson;
}

const HomeASBStorySection = ({ asbStoryData }: HomeASBStoryProps) => {
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
        className="pt-30 pb-12 lg:pt-32 lg:pb-14"
        vectorChildren={
          <>
            <PatternStroke2
              position="right"
              className="absolute -top-32 -right-34 max-lg:w-48 lg:-top-44 lg:-right-60"
            />
            <PatternStroke1 position="left" className="absolute -bottom-80 -left-36 w-52 lg:-bottom-80 lg:-left-17" />
          </>
        }
      >
        <AnimatedFlexItems
          className="flex flex-col gap-8 lg:flex-row lg:pb-10 xl:gap-24 2xl:gap-[95px]"
          childrenLeft={
            <>
              <ASBRibbonText title={asbStoryData.ribbonText ?? ""} />
              <h2>{asbStoryData.header ?? ""}</h2>
            </>
          }
          classNameLeft="lg:flex-2/3 2xl:flex-1/2"
          childrenRight={<ASBDescription description={asbStoryData.description ?? ""} className="lg:pt-6" />}
          classNameRight="lg:flex-1/3"
        />
      </SectionContainer>

      <AnimatedFadeInWhenVisible className="relative flex w-full flex-col max-lg:pb-23 md:pb-10 lg:py-6">
        <SlideCarousel
          slides={asbStoryData.cards ?? []}
          paddingLeft={sectionMarginLeft}
          paginateClassName="w-[min(100%,230px)] lg:w-[min(100%,340px)]"
        />
      </AnimatedFadeInWhenVisible>
    </>
  );
};

export default HomeASBStorySection;
