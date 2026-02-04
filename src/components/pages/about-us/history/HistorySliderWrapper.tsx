"use client";

import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight, GraduateHatIcon } from "@/components/icons";
import { Fragment, useState } from "react";

import CardStackCarousel from "@/components/carousel/card-stack-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke2 } from "@/components/shapes";
import { DiplomaVector } from "@/components/vectors";
import { cn } from "@/lib/utils";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";
import { motion } from "framer-motion";
import Image from "next/image";

interface HistorySliderWrapperProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export const Pagination = <T,>({
  items,
  active,
  setActive,
  handlePrev,
  handleNext,
  isAnimating,
}: {
  items: T[];
  active: number;
  setActive: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  isAnimating: boolean;
}) => (
  <Fragment>
    <div
      className={cn("relative w-14", {
        "pointer-events-none opacity-50": isAnimating || active === 0,
      })}
      onClick={handlePrev}
    >
      <CarouselNavigationArrowLeft className="hover:cursor-pointer" />
    </div>
    <div className="flex items-center justify-center gap-4">
      {items.map((_, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={cn("rounded-full", {
            "h-12 w-12 bg-[url('/carousel-dot-active.svg')] bg-cover": i === active,
            "h-2 w-2 bg-[hsla(212,82%,15%,1)] opacity-100": i !== active,
          })}
        />
      ))}
    </div>
    <div
      className={cn("relative w-14", {
        "pointer-events-none opacity-50": isAnimating || active === items.length - 1,
      })}
      onClick={handleNext}
    >
      <CarouselNavigationArrowRight className="hover:cursor-pointer" />
    </div>
  </Fragment>
);

export default function HistorySliderWrapper({ data, breadcrumbData }: HistorySliderWrapperProps) {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev + 1) % (data.cards?.length ?? 1)); // Update active index immediately
    setTimeout(() => {
      setIsAnimating(false); // Reset animation state
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev - 1 < 0 ? (data.cards?.length ?? 1) - 1 : prev - 1)); // Update active index immediately
    setTimeout(() => {
      setIsAnimating(false); // Reset animation state
    }, 300);
  };

  return (
    <SectionContainer
      className="pt-30 max-md:pb-0"
      vectorChildren={
        <PatternStroke2 className="absolute -top-12 -right-64 h-[265px] w-[360px] lg:-top-20 lg:-right-50" />
      }
    >
      <BreadcrumbCustom data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }} />
      <div className="flex flex-col items-center gap-24 pt-32 xl:flex-row xl:gap-14 2xl:gap-8">
        <div className="flex flex-col items-start justify-start gap-12 max-xl:w-full lg:gap-20">
          <div className="flex w-full flex-col items-start lg:flex-1/2 xl:min-w-[650px] xl:flex-2/3 2xl:min-w-[750px]">
            <ASBRibbonText title={data.ribbonText ?? ""} />
            <ASBTitle title={data.title ?? ""} className="text-start xl:max-w-[370px]" />
            <p className="pt-8 font-mono xl:max-w-[500px]">{data.description}</p>
          </div>

          <div className="hidden w-full items-center justify-center gap-8 lg:justify-start xl:flex">
            <Pagination
              items={data.cards ?? []}
              active={active}
              setActive={setActive}
              handlePrev={handlePrev}
              handleNext={handleNext}
              isAnimating={isAnimating}
            />
          </div>
        </div>

        <div className="relative flex w-fit rotate-12 items-end justify-end max-xl:pt-12 sm:left-8 lg:top-8 lg:left-0 xl:top-24">
          <CardStackCarousel
            vectorsChildren={
              <Fragment>
                <DiplomaVector className="absolute -top-2 -left-6 h-8 w-8 lg:-top-20 lg:-left-12 xl:-top-58 xl:h-12 2xl:-left-12 2xl:w-12" />
                <GraduateHatIcon className="absolute -right-0 -bottom-4 h-[17.5px] w-[37px] lg:-right-40 lg:h-[35px] lg:w-[74px] xl:-right-60" />
              </Fragment>
            }
            items={data.cards ?? []}
            activeIndex={active}
            className="h-64 w-64 md:h-86 md:w-86"
            renderItem={(item, index) => {
              return (
                <motion.div
                  key={`${item.image?.imageUrl}-${index}`} // Ensure unique key for each item
                  className={cn(
                    "flex h-56 w-56 items-center justify-center rounded-4xl text-xl font-bold text-white shadow-md md:h-72 md:w-72 lg:h-[400px] lg:w-[370px] xl:h-[520px] xl:w-[490px]"
                  )}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }} // New animation effect
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5 }} // Smooth transition
                >
                  {index !== 0 && <div className="absolute inset-0 z-0 rounded-4xl bg-white/50 transition-opacity" />}
                  <Image
                    alt="Head of School Background"
                    src={item.image?.imageMediumLargeUrl || item.image?.imageUrl || ""}
                    fill
                    priority
                    className={cn("-z-1 rounded-4xl object-cover")}
                  />
                </motion.div>
              );
            }}
          />
        </div>

        <div className="flex w-full items-center justify-center gap-8 xl:hidden xl:justify-start">
          <Pagination
            items={data.cards ?? []}
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
}
