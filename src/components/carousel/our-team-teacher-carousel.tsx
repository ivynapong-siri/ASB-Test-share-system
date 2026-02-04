"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { slideOurTeamTeacherBreakPoints } from "@/client/configs/slide-carousel-config";
import { chunkArray } from "@/client/utils/helper";
import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import Image from "next/image";
import { Swiper as SwiperInstance } from "swiper";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";
import { SectionContainer } from "../custom/section-container";

interface OurTeamTeacherCarouselProps {
  slides: SectionProfileJson[];
  buttonName: string;
  openModal?: (items: any[], index: number) => void;
  sectionContainerClassName?: string;
  sectionClassName?: string;
  requiredOffsetPaginate?: boolean;
  paginateClassName?: string;
}

const OurTeamTeacherCarousel = ({
  slides,
  openModal,
  buttonName,
  sectionContainerClassName,
  sectionClassName,
  requiredOffsetPaginate = false,
  paginateClassName,
}: OurTeamTeacherCarouselProps) => {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();

  const groupedCards = chunkArray(slides, isLaptop && !isMobile ? 4 : isMobile ? 1 : 8);

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

  const RenderHoverCard = ({ data, index }: { data: SectionProfileJson; index: number }) => {
    return (
      <HoverCard
        key={data.id}
        title={`${data?.firstName} ${data?.middleName ?? ""} ${data?.lastName}`}
        badgeLabel={data.badgeLabel}
        personPosition={data.position}
        backgroundContent={
          data.imageUrl ? (
            <Image
              key={data?.id}
              alt=""
              src={data?.imageUrl ?? ""}
              fill
              className="will-change-opacity rounded-4xl object-cover transition-all duration-300 ease-out will-change-transform"
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={"/blur-image.jpg"}
            />
          ) : (
            "mock-image.jpg"
          )
        }
        buttonLabel={data.buttonLabel ?? ""}
        buttonLink={data.buttonUrl}
        linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
        iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
        titleClassName="min-w-0 mr-8"
        isHover={false}
        isProfile={true}
        contentClassName="min-w-0"
        className="h-[28rem] rounded-4xl"
        requiredHiddenStrip={false}
        {...(openModal && { buttonAction: () => openModal(slides, index) })}
      />
    );
  };

  return (
    <SectionContainer sectionClassName={sectionContainerClassName} className={sectionClassName}>
      <div ref={swiperContainerRef} className="relative w-full">
        <Swiper
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.pagination) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }, 0);
          }}
          watchSlidesProgress
          virtual
          observer={true}
          observeParents={true}
          cssMode={isLaptop}
          spaceBetween={16}
          breakpoints={slideOurTeamTeacherBreakPoints}
          navigation={{
            nextEl: `.${buttonName}-swiper-button-next`,
            prevEl: `.${buttonName}-swiper-button-prev`,
          }}
          pagination={{
            el: `.${buttonName}-swiper-custom-pagination`,
            clickable: true,
          }}
          onSlideChange={(swiper) => {
            handleSlideChange(swiper);
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          modules={[Navigation, Pagination, Autoplay, Virtual]}
          className={`${buttonName}Swiper flex h-full w-full`}
          slidesOffsetAfter={isLaptop ? 40 : 0}
        >
          {groupedCards.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {data.map((e, cardIndex) => (
                  <div key={e.id}>
                    <RenderHoverCard data={e} index={cardIndex} />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <>
          <div className="container mx-auto my-4 hidden w-full justify-center gap-4 lg:flex">
            <div className="relative w-10 lg:w-12">
              <div className={`swiper-button ${buttonName}-swiper-button-prev`}>
                <CarouselNavigationArrowLeft />
              </div>
            </div>

            {requiredOffsetPaginate ? (
              <div
                className={cn(
                  "relative w-[min(100%,300px)] overflow-hidden md:w-[min(100%,220px)] xl:w-[min(100%,220px)]",
                  paginateClassName
                )}
              >
                <div
                  ref={paginationRef}
                  className={`${buttonName}-swiper-custom-pagination flex transition-transform duration-300`}
                />
              </div>
            ) : (
              <div className={`${buttonName}-swiper-custom-pagination flex transition-transform duration-300`} />
            )}

            <div className="relative w-10 lg:w-12">
              <div className={`swiper-button ${buttonName}-swiper-button-next`}>
                <CarouselNavigationArrowRight />
              </div>
            </div>
          </div>

          <div className="z-10 container mx-auto my-5 flex w-full justify-center gap-2 pr-10 lg:hidden">
            <div className="flex gap-4">
              <NavigationRoundedButton navigationName={buttonName} direction="prev" />
              <NavigationRoundedButton navigationName={buttonName} direction="next" />
            </div>
          </div>
        </>
      </div>
    </SectionContainer>
  );
};

export default OurTeamTeacherCarousel;
