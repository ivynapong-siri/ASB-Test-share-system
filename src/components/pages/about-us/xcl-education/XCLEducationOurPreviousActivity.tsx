"use client";

import { GuitarVector, HeadphoneVector, MicrophoneVector, NoteVector } from "@/components/vectors";
import { useEffect, useState } from "react";

import CardStackCarousel from "@/components/carousel/card-stack-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke2 } from "@/components/shapes";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { Pagination } from "../history/HistorySliderWrapper";

interface XCLEducationOurPreviousActivityProps {
  sectionData: SectionJson;
}

const XCLEducationOurPreviousActivity = ({ sectionData }: XCLEducationOurPreviousActivityProps) => {
  const { title, ribbonText, description, cards = [] } = sectionData || { cards: [] };

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (active >= (cards?.length || 0)) {
      setActive(0);
    }
  }, [cards?.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (isAnimating || cards?.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % (cards?.length ?? 0));
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating || cards?.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev - 1 < 0 ? (cards?.length ?? 0) - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const renderVectors = () => (
    <>
      <PatternStroke2 className="absolute top-1/2 -right-20 h-[150px] w-[200px] -translate-y-1/2 md:-right-32 lg:top-0 lg:-right-55 lg:h-[260px] lg:w-96" />
      <PatternStroke2 className="absolute bottom-48 -left-50 h-[265px] w-64 lg:-bottom-25 lg:w-96" />
    </>
  );

  return (
    <SectionContainer
      className="flex h-full flex-col gap-24 lg:items-start lg:justify-between lg:gap-20 xl:flex-row xl:py-40"
      vectorChildren={renderVectors()}
    >
      <div className="flex w-full flex-col gap-10 xl:max-w-[620px]">
        <div>
          {ribbonText && <ASBRibbonText title={ribbonText} />}
          <ASBTitle title={title ?? ""} className="text-start" />
        </div>
        <div className="flex flex-col gap-6 font-mono text-neutral-300">
          <p className="text-base/[1.625rem] whitespace-pre-line">{description}</p>
        </div>
        <div className="hidden w-full items-center justify-center gap-8 lg:justify-start xl:flex">
          <Pagination
            items={cards || []}
            active={active}
            setActive={setActive}
            handlePrev={handlePrev}
            handleNext={handleNext}
            isAnimating={isAnimating}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-24 lg:gap-14 2xl:gap-20">
        <div className="relative flex w-fit rotate-12 items-center justify-center md:left-12 xl:left-0">
          {cards && cards?.length > 0 && (
            <CardStackCarousel
              vectorsChildren={
                <>
                  <GuitarVector className="absolute top-0 -left-8 h-12 w-12 -rotate-12 md:top-12 md:h-[64px] md:w-[40px] xl:-left-20" />
                  <NoteVector className="absolute bottom-14 -left-14 h-8 w-8 -rotate-12 sm:bottom-0 md:-bottom-8 md:-left-16 md:h-[39px] md:w-[41px] lg:-bottom-12 lg:-left-4 2xl:-left-20" />
                  <MicrophoneVector className="absolute -top-26 right-20 h-[32px] w-[32px] sm:top-0 sm:-right-16 md:right-8 md:h-[48px] md:w-[42px] md:-rotate-12 lg:top-0 lg:right-16 xl:right-48 2xl:-top-32 2xl:right-4" />
                  <HeadphoneVector className="absolute -right-8 bottom-5 h-[30px] w-[34px] md:h-[53px] md:w-[52px] md:-rotate-12 lg:-right-4 lg:bottom-0 2xl:-right-30" />
                </>
              }
              items={cards}
              activeIndex={active}
              className="h-64 w-64 md:h-[400px] md:w-[400px] xl:h-[440px] xl:w-[440px]"
              renderItem={(card, index) => {
                return (
                  <div className="flex h-56 w-56 items-center justify-center rounded-4xl text-xl font-bold text-white shadow-md md:h-72 md:w-72 xl:h-80 xl:w-80 2xl:h-[440px] 2xl:w-[440px]">
                    {index !== 0 && (
                      <>
                        <div className="absolute inset-0 z-0 rounded-4xl bg-white/50 transition-opacity" />
                        <div className="absolute -top-6 -right-6 -z-1 h-full w-full rounded-4xl border-[0.5px] border-[#9EB2C8]" />
                      </>
                    )}

                    <Image
                      alt="Head of School Background"
                      src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || "/mock-image.jpg"}
                      fill
                      className={cn("-z-1 rounded-4xl object-cover")}
                    />
                  </div>
                );
              }}
            />
          )}
        </div>
        <div className="flex w-full items-center justify-center gap-8 xl:hidden xl:justify-start">
          <Pagination
            items={cards || []}
            active={active}
            setActive={setActive}
            handlePrev={handlePrev}
            handleNext={handleNext}
            isAnimating={isAnimating}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default XCLEducationOurPreviousActivity;
