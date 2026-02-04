"use client";

import { useEffect, useRef, useState } from "react";

import ASBDescription from "@/components/custom/asb-description";
import ActiveCarousel from "../../carousel/active-carousel";
import { AnimatedFadeInWhenVisible } from "@/components/shared/animation-section";
import { HighlightCircleVector } from "@/components/vectors";
import LinkButton from "../../custom/buttons/link-button";
import { PatternStroke1 } from "@/components/shapes";
import { SectionContainer } from "../../custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { cutWithHighlight } from "@/client/utils/helper";
import { usePathname } from "next/navigation";

type HomeLifeAtXCLSectionProps = {
  lifeAtXCL: SectionJson;
};

const HomeLifeAtXCLSection = ({ lifeAtXCL }: HomeLifeAtXCLSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  const isChinese = pathname.split("/")[1] === "zh-hans";

  const header = cutWithHighlight(lifeAtXCL.header ?? "", lifeAtXCL.highlightText ?? "", isChinese);

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
        className="relative flex w-full flex-col gap-20 max-md:pb-12 lg:py-40 lg:pb-16"
        vectorChildren={
          <PatternStroke1 className="absolute top-1/4 -right-24 hidden md:top-3/4 lg:z-10 lg:block xl:top-1/4" />
        }
      >
        <AnimatedFadeInWhenVisible className="flex flex-col gap-4 md:justify-between lg:flex-row lg:gap-20">
          <>
            <div className="flex w-full flex-col gap-2 lg:gap-4 xl:max-w-2xl">
              <h2 className="relative w-full text-nowrap">
                <span className="relative z-10">{header.before}</span>
                {!isChinese && (
                  <span className="relative z-0 inline-block">
                    <HighlightCircleVector
                      fill="#45A9E0"
                      className="absolute top-0 -left-3 -z-1 h-auto w-20 translate-y-1/12 md:-left-5 md:w-32 lg:-top-3 lg:-left-8 lg:w-54"
                    />
                    {header.highlight}
                  </span>
                )}
              </h2>
              <h2 className="w-full">
                <span className="relative z-10">{header.after}</span>
                {isChinese && (
                  <span className="relative z-0 inline-block">
                    <HighlightCircleVector
                      fill="#45A9E0"
                      className="absolute top-0 -left-3 -z-1 h-auto w-20 translate-y-1/12 md:-left-5 md:w-32 lg:-top-3 lg:-left-4 lg:w-54"
                    />
                    {header.highlight}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex w-full flex-col gap-4 lg:max-w-[440px]">
              <ASBDescription description={lifeAtXCL.description ?? ""} />
              <LinkButton
                buttonText={lifeAtXCL.buttonLabel ?? ""}
                linkClassName="text-xs md:text-sm"
                iconClassName="size-7 p-2 md:size-9 md:p-[10px]"
                href={lifeAtXCL.buttonUrl ?? "/"}
              />
            </div>
          </>
        </AnimatedFadeInWhenVisible>
      </SectionContainer>

      <AnimatedFadeInWhenVisible className="relative flex w-full lg:pb-16">
        <ActiveCarousel
          activeIndex={activeIndex}
          paddingLeft={sectionMarginLeft}
          setActiveIndex={setActiveIndex}
          slides={lifeAtXCL.cards ?? []}
        />
      </AnimatedFadeInWhenVisible>
    </>
  );
};

export default HomeLifeAtXCLSection;
