"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl, useIsSafari } from "@/client/utils/helper";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";
import { PatternStroke1 } from "../shapes";

interface ModalFlatCardCarouselProps {
  slides: SectionCardJson[];
  className?: string;
  carouselName: string;
  buttonName: string;
  otherLabel: string;
  onClose: () => void;
  currentIndex: number;
  showStandardVector?: boolean;
  vectorChildren?: React.ReactNode;
}

function getRandomIndices(slides: SectionCardJson[], excludeIndex: number) {
  const dataLength = slides.length;
  const indices: number[] = [];
  const usedTitles = new Set<string>();

  const excludeTitle = slides[excludeIndex]?.title;
  if (excludeTitle) usedTitles.add(excludeTitle);

  while (indices.length < Math.min(3, dataLength - 1)) {
    const num = Math.floor(Math.random() * dataLength);
    const title = slides[num]?.title;

    if (num !== excludeIndex && !indices.includes(num) && title && !usedTitles.has(title)) {
      indices.push(num);
      usedTitles.add(title);
    }
  }

  return indices;
}

export default function ModalFlatCardCarousel({
  slides,
  className,
  buttonName,
  carouselName,
  otherLabel,
  onClose,
  currentIndex,
  showStandardVector = true,
  vectorChildren,
}: ModalFlatCardCarouselProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [randomIndex, setRandomIndex] = useState<number[]>(() => getRandomIndices(slides, currentIndex));
  const isSafari = useIsSafari();

  const ref = useRef<SwiperRef>(null);

  const currentSlide = slides[activeIndex];
  const currentTitle = currentSlide?.title || "";
  const currentDescription = currentSlide?.description || "";

  const handleNavigation = () => {
    setRandomIndex(getRandomIndices(slides, activeIndex));
  };

  useEffect(() => {
    if (currentSlide && ref.current?.swiper) {
      const index = slides.findIndex((s) => s.id === currentSlide.id);
      if (index !== -1) {
        ref.current.swiper.slideToLoop(index);
      }
    }
  }, [currentSlide, slides]);

  const RenderImageCard = ({
    cardOnClick,
    indices,
    slides,
  }: {
    slides: SectionCardJson[];
    indices: number[];
    cardOnClick: (id: number) => void;
  }) => {
    return indices.map((i, index) => {
      const e = slides[i];
      const primaryUrl = getImageUrl(e, isMobile);
      const fallbackUrl = e.image?.imageUrl || "/mock-image.jpg";
      const [imgSrc, setImgSrc] = useState(primaryUrl);

      return (
        <div key={index} className="flex lg:pb-6">
          <HoverCard
            key={`${e.id}-${e.title}`}
            title={e.title}
            backgroundContent={
              <Image
                alt={e.title}
                src={imgSrc}
                fill
                className="object-cover"
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={"/blur-image.jpg"}
                onError={() => {
                  if (imgSrc !== fallbackUrl) {
                    console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
                    setImgSrc(fallbackUrl);
                  }
                }}
              />
            }
            className="h-[150px] w-full object-center lg:h-[350px]"
            contentClassName="min-w-0"
            backgroundClassName={cn("rounded-b-4xl", isSafari && "-z-10")}
            isHover={false}
            onClick={() => cardOnClick(e.id)}
          />
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        "relative flex max-h-[600px] w-[calc(100vw-4.5rem)] overflow-x-hidden overflow-y-hidden rounded-4xl bg-white lg:max-h-[750px] lg:w-[1000px]",
        className
      )}
    >
      {vectorChildren
        ? vectorChildren
        : showStandardVector && (
            <PatternStroke1 className="absolute -right-4 -bottom-60 h-20 w-42 lg:h-[148px] lg:w-[330px]" />
          )}

      <div className="flex w-full flex-col overflow-y-auto px-10 py-3 lg:px-4 lg:py-4">
        <div
          onClick={() => onClose()}
          className="bg-primary mb-4 ml-auto flex size-10 items-center justify-center rounded-full p-2 hover:cursor-pointer"
        >
          <XIcon className="size-8 text-white" />
        </div>

        <div className="flex w-full flex-row items-center justify-between gap-4 lg:px-8">
          <div className="hidden size-10 lg:flex">
            <NavigationRoundedButton navigationName={buttonName} direction="prev" onClick={() => handleNavigation()} />
          </div>

          <div className="w-full lg:w-3/4">
            <Swiper
              ref={ref}
              spaceBetween={16}
              onSwiper={(swiperInstance) => {
                swiperInstance.slideToLoop(currentIndex);
                setActiveIndex(currentIndex);
                setTimeout(() => {
                  swiperInstance.pagination.render();
                  swiperInstance.pagination.update();
                }, 0);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              loop={true}
              slidesPerView={1}
              pagination={{
                el: `.${buttonName}-swiper-custom-pagination`,
              }}
              navigation={{
                nextEl: `.${buttonName}-swiper-button-next`,
                prevEl: `.${buttonName}-swiper-button-prev`,
                disabledClass: `${buttonName}-swiper-button-disabled`,
              }}
              modules={[Grid, Pagination, Navigation]}
              className={cn(`${carouselName}Swiper`)}
            >
              {slides.map((slide, index) => {
                const primaryUrl = getImageUrl(slide, isMobile);
                const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
                const [imgSrc, setImgSrc] = useState(primaryUrl);

                return (
                  <SwiperSlide key={`${slide.id}-${index}`}>
                    <div className="relative flex h-[185px] w-full lg:h-[520px]">
                      <Image
                        alt=""
                        src={imgSrc}
                        fill
                        className="rounded-4xl object-cover"
                        sizes="(max-width: 1024px) 100vw, 680px"
                        priority
                        onError={() => {
                          if (imgSrc !== fallbackUrl) {
                            console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
                            setImgSrc(fallbackUrl);
                          }
                        }}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="hidden size-10 lg:flex">
            <NavigationRoundedButton navigationName={buttonName} direction="next" onClick={() => handleNavigation()} />
          </div>
        </div>

        <div className="flex flex-col lg:px-8">
          <h4 className="pt-8 text-[1.75rem]/[2rem] font-semibold lg:pt-16 lg:text-[2rem]/[2rem]">{currentTitle}</h4>
          <p className="pt-4 font-mono text-sm/[1.25rem]">{currentDescription}</p>
        </div>

        <div className="container mx-auto mt-6 flex w-full flex-row justify-center gap-4 lg:hidden">
          <div className="flex">
            <NavigationRoundedButton navigationName={buttonName} direction="prev" onClick={() => handleNavigation()} />
          </div>
          <div className="flex">
            <NavigationRoundedButton navigationName={buttonName} direction="next" onClick={() => handleNavigation()} />
          </div>
        </div>
        <div className="flex flex-col lg:px-8">
          <h4 className="pt-8 text-[1.75rem]/[2rem] font-semibold lg:pt-16 lg:text-[2rem]/[2rem]">{otherLabel}</h4>
          <div className="my-6 grid w-full grid-cols-1 gap-6 lg:h-[370px] lg:grid-cols-3">
            <RenderImageCard
              cardOnClick={(id: number) => {
                const index = slides.findIndex((slide) => slide.id === id);
                if (index !== -1) {
                  ref.current?.swiper.slideToLoop(index);
                  setActiveIndex(index);
                  setRandomIndex(getRandomIndices(slides, index));
                }
              }}
              indices={randomIndex}
              slides={slides}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
