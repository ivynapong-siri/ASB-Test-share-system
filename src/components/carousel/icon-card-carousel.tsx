"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { iconCardCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getMinSectionCardJsonLoop } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import React from "react";
import ASBDescription from "../custom/asb-description";
import ASBTitle from "../custom/asb-title";
import IconCard from "../custom/cards/icon-card";
import { SectionContainer } from "../custom/section-container";

interface IconCardCarouselProps {
  slides: SectionCardJson[];
  title: string;
  description: string;
  className?: string;
}

export default function IconCardCarousel({ slides, description, title, className }: IconCardCarouselProps) {
  const cards = getMinSectionCardJsonLoop({ cards: slides, minLoopCard: 6 });

  const mobilePaginationRef = React.useRef<HTMLDivElement>(null);
  const desktopPaginationRef = React.useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  return (
    <SectionContainer className={cn("flex flex-col gap-8 max-md:px-0 md:flex-row md:gap-16", className)}>
      <div className="flex w-full flex-col gap-8 max-md:px-10 max-md:pr-10 md:max-w-[400px] md:min-w-[350px] lg:max-w-[500px] lg:min-w-[400px]">
        <ASBTitle title={title} className="text-start" />
        <ASBDescription description={description} />

        {/* Big screen show paginate here */}
        <div className="hidden w-full pt-8 md:flex">
          <div ref={desktopPaginationRef} className={`desktop-swiper-pagination`} />
        </div>
      </div>

      <div className="h-full w-full flex-row md:flex">
        <Swiper
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.pagination) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }, 0);
          }}
          pagination={{
            el: isMobile ? mobilePaginationRef.current : desktopPaginationRef.current,
            clickable: true,
          }}
          navigation={{
            nextEl: `.icon-carousel-swiper-button-next`,
            prevEl: `.icon-carousel-swiper-button-prev`,
            disabledClass: `icon-carousel-swiper-button-disabled`,
          }}
          loop
          breakpoints={iconCardCarouselBreakPoints}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={16}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesOffsetBefore={isMobile ? 40 : 0}
          slidesOffsetAfter={isMobile ? 40 : 0}
        >
          {cards.map((slide, index) => (
            <SwiperSlide key={`${index}`} className="h-full min-h-[400px] w-80">
              <IconCard
                key={slide.id}
                className="h-full min-h-[400px] w-full"
                icon={
                  <Image
                    src={slide.image2?.imageUrl ?? ""}
                    alt={`icon-card-${slide.id}-${index}`}
                    width={80}
                    height={80}
                    quality={95}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={"/blur-image.jpg"}
                  />
                }
                title={slide.title}
                description={slide.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="z-10 flex flex-row justify-center pt-8 md:hidden">
        <div className="relative flex w-8 justify-end pr-2">
          <div className={`swiper-button icon-carousel-swiper-button-prev`}>
            <CarouselNavigationArrowLeft />
          </div>
        </div>
        <div ref={mobilePaginationRef} className={`mobile-swiper-pagination`} />
        <div className="relative w-8 pl-2">
          <div className={`swiper-button icon-carousel-swiper-button-next`}>
            <CarouselNavigationArrowRight />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
