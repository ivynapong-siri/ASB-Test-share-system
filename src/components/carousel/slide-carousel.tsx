"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getImageUrl, getMinDuplicateCardJsonLoop } from "@/client/utils/helper";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { Swiper as SwiperInstance } from "swiper";

function sortTextImageFormat(cards: SectionCardJson[]): SectionCardJson[] {
  if (!cards?.length) return [];

  const textCards = cards.filter((c) => !c.image);
  const imageCards = cards.filter((c) => c.image);

  const result: SectionCardJson[] = [];
  const maxLen = Math.max(textCards.length, imageCards.length);

  for (let i = 0; i < maxLen; i++) {
    if (textCards[i]) result.push(textCards[i]);
    if (imageCards[i]) result.push(imageCards[i]);
  }

  return result;
}

interface SlideCarouselProps {
  slides: SectionCardJson[];
  className?: string;
  spaceBetween?: number;
  slidePerGroup?: number;
  paddingLeft: number;
  paginateClassName?: string;
}

export default function SlideCarousel({
  paginateClassName,
  slides,
  className,
  spaceBetween,
  slidePerGroup,
  paddingLeft,
}: SlideCarouselProps) {
  const minLoopCard = 14;
  const formattedSlides = getMinDuplicateCardJsonLoop({ cards: slides, minLoopCard });
  const sortSlides = sortTextImageFormat(formattedSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const paginationRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    const paginationEl = paginationRef.current;
    if (!paginationEl) return;

    const bullets = [...paginationEl.children] as HTMLElement[];
    if (!bullets.length) return;

    const bulletWidth = bullets[0]?.offsetWidth + 16;
    const totalBullets = bullets.length;
    const visibleCount = 5;
    const mid = Math.floor(visibleCount / 2);

    let translateX = 0;
    if (activeIndex > mid && activeIndex < totalBullets - mid) {
      translateX = -(activeIndex - mid) * bulletWidth;
    } else if (activeIndex >= totalBullets - mid) {
      translateX = -(totalBullets - visibleCount) * bulletWidth;
    }

    paginationEl.style.transform = `translateX(${translateX}px)`;
  }, [activeIndex]);

  const renderSlideContent = (slide: SectionCardJson, isMobile: boolean) => {
    if (slide.image) {
      const primaryUrl = getImageUrl(slide, isMobile);
      const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
      const [imgSrc, setImgSrc] = useState(primaryUrl);

      return (
        <img
          src={imgSrc}
          alt={slide.title || "Slide Image"}
          className="h-full w-full rounded-full object-cover"
          onError={() => {
            if (imgSrc !== fallbackUrl) {
              console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
              setImgSrc(fallbackUrl);
            }
          }}
        />
      );
    }

    return (
      <div className="flex flex-col gap-3 px-12 py-10 text-start">
        <h5 className="line-clamp-3 text-white">{slide.title}</h5>
        <p className="line-clamp-3 font-mono text-xs lg:text-sm">{slide.description}</p>
      </div>
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Swiper
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        slidesPerView={"auto"}
        slidesPerGroup={isMobile ? 1 : (slidePerGroup ?? 2)}
        pagination={{
          el: ".swiper-custom-pagination",
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={spaceBetween ?? 0}
        roundLengths
        loop={true}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        slidesOffsetBefore={isMobile ? 0 : paddingLeft}
      >
        {sortSlides.map((slide, index) => {
          const isBackgroundPrimary = index % 4 === 0 || index % 4 === 1;

          return (
            <SwiperSlide key={index} className="max-w-[300px]">
              <div
                className={cn(
                  "flex h-48 w-full max-w-[300px] items-center justify-center rounded-full text-white md:h-52",
                  slide.image ? null : isBackgroundPrimary ? "bg-primary-200" : "bg-secondary"
                )}
              >
                {renderSlideContent(slide, isMobile)}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="container mx-auto mt-14 flex w-full justify-center gap-2 md:gap-4 lg:justify-end xl:gap-8">
        <div className="relative w-10 lg:w-14">
          <div className={`image-swiper-button-prev swiper-button`}>
            <CarouselNavigationArrowLeft />
          </div>
        </div>

        <div className={cn("relative w-[min(100%,180px)] overflow-hidden lg:w-[min(100%,300px)]", paginateClassName)}>
          <div ref={paginationRef} className={`swiper-custom-pagination flex transition-transform duration-300`} />
        </div>

        <div className="relative w-10 lg:w-14">
          <div className={`image-swiper-button-next swiper-button`}>
            <CarouselNavigationArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
