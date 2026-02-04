"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ComponentType, useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Swiper as SwiperInstance } from "swiper";
import { SwiperOptions } from "swiper/types";

interface GearCarouselProps<T extends { id: string | number; image: string }> {
  cardData: T[];
  breakpoints: SwiperOptions["breakpoints"];
  cardComponent: ComponentType<T>;
  arrowClass?: string;
  isMobile?: boolean;
  buttonClassName?: string;
  paginateClassName?: string;
  className?: string;
}

export default function GearCarousel<T extends { id: string | number; image: string }>({
  cardData,
  breakpoints,
  cardComponent: Card,
  arrowClass,
  isMobile,
  buttonClassName,
  paginateClassName,
  className,
}: GearCarouselProps<T>) {
  const navPrefix = "carousel";
  const [activeIndex, setActiveIndex] = useState(0);
  const paginationRef = useRef<HTMLDivElement>(null);

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

  const activeImage = cardData[activeIndex]?.image ?? "";
  const wrapperClassName = cn(className, isMobile ? "block md:hidden" : "hidden md:block");
  const imageClassName = isMobile ? "px-10" : "";
  const carouselName = isMobile && "-mobile";

  return (
    <div className={cn("relative flex w-full flex-col items-center lg:flex-row", wrapperClassName)}>
      <div className={cn("relative z-0 flex w-full xl:w-1/2", imageClassName)}>
        <div className="relative z-10 mx-auto aspect-[358/397] h-[358px] w-[480px] overflow-clip rounded-4xl md:h-[595px] md:w-[590px] lg:mx-0 lg:aspect-[630/648]">
          <Image
            alt="FineArt.jpg"
            src={activeImage}
            fill
            priority
            className="object-cover"
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
          />
        </div>
      </div>

      <div className="w-full max-w-screen -translate-y-1/4 gap-x-4 gap-y-4 pt-16 pr-0 md:px-10 lg:absolute lg:top-1/2 lg:translate-x-1/3 lg:-translate-y-[300px] lg:px-0 lg:pt-20 xl:max-w-screen-xl">
        <Swiper
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.pagination) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }, 0);
          }}
          loop={true}
          spaceBetween={16}
          breakpoints={breakpoints}
          autoHeight
          onSlideChange={handleSlideChange}
          pagination={{
            el: `.${navPrefix}${carouselName}-pagination`,
            clickable: true,
          }}
          navigation={{
            nextEl: `.${navPrefix}${carouselName}-next`,
            prevEl: `.${navPrefix}${carouselName}-prev`,
            disabledClass: `${navPrefix}-disabled`,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="profileSwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesOffsetBefore={isMobile ? 40 : 0}
        >
          {cardData.map((data) => (
            <SwiperSlide key={data.id}>
              <Card {...data} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={cn("container mx-auto mt-14 flex w-full justify-center gap-2 md:gap-4 xl:gap-8", buttonClassName)}
        >
          <div className={cn("relative w-10 lg:w-14", arrowClass)}>
            <div className={`${navPrefix}${carouselName}-prev swiper-button`}>
              <CarouselNavigationArrowLeft />
            </div>
          </div>

          <div className={cn("relative w-[min(100%,180px)] overflow-hidden lg:w-[min(100%,340px)]", paginateClassName)}>
            <div
              ref={paginationRef}
              className={`${navPrefix}${carouselName}-pagination flex transition-transform duration-300`}
            />
          </div>

          <div className={cn("relative w-10 lg:w-14", arrowClass)}>
            <div className={`${navPrefix}${carouselName}-next swiper-button`}>
              <CarouselNavigationArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
