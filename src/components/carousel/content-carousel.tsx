"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef } from "react";
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { useIsSafari } from "@/client/utils/helper";
import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper";
import { SwiperOptions } from "swiper/types";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";

interface Slide {
  id: number;
  badgeLabel?: string;
  subject?: string;
  title: string;
  image: { imageUrl: string };
  buttonLabel: string;
  buttonUrl: string;
}

interface ContentCarouselProps {
  slides: Slide[] | SectionProfileJson[];
  className?: string;
  carouselName: string;
  buttonName: string;
  breakPoints: SwiperOptions["breakpoints"];
  isConvertPaginationIcon?: boolean;
  isProfile?: boolean;
  requireSafariCheck?: boolean;
  contentClassName?: string;
  requirePadding?: boolean;
  openModal?: (items: any[], index: number) => void;
  hoverCardImageClassName?: string;
  cardClassName?: string;
  isBottomCarousel?: boolean;
  useIsLabTopOffset?: boolean;
  requiredHiddenStrip?: boolean;
}

function isSlide(data: Slide | SectionProfileJson): data is Slide {
  return "image" in data && typeof data.image === "object" && "imageUrl" in data.image;
}

export default function ContentCarousel({
  slides,
  className,
  requireSafariCheck = false,
  breakPoints,
  buttonName,
  carouselName,
  isConvertPaginationIcon,
  isProfile,
  contentClassName,
  requirePadding = true,
  hoverCardImageClassName,
  cardClassName,
  openModal,
  isBottomCarousel,
  useIsLabTopOffset,
  requiredHiddenStrip = false,
}: ContentCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const isSafariBrowser = useIsSafari();
  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();

  useEffect(() => {
    // Fix slide not auto play at the first times when it open the page
    if (isMobile && swiperRef.current) {
      const timer = setTimeout(() => {
        swiperRef.current?.slideNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const renderCard = (data: Slide | SectionProfileJson, index: number) => {
    return (
      <HoverCard
        key={data.id}
        title={isSlide(data) ? data.title : `${data?.firstName} ${data?.middleName ?? ""} ${data?.lastName}`}
        badgeLabel={data.badgeLabel}
        personPosition={isSlide(data) ? data.subject : data.position}
        backgroundContent={
          isSlide(data) ? (
            data.image.imageUrl ? (
              <Image
                key={`${data.id}-${data.title}`}
                alt=""
                src={data.image.imageUrl}
                fill
                className={cn(
                  "rounded-xl object-cover transition-all duration-300 ease-out group-hover:scale-120",
                  hoverCardImageClassName
                )}
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={"/blur-image.jpg"}
              />
            ) : null
          ) : data.imageUrl ? (
            <Image
              key={`Profile-${data?.firstName}-${data?.id}`}
              alt=""
              src={data?.imageUrl ?? ""}
              fill
              className={cn(
                "rounded-xl object-cover transition-all duration-300 ease-out group-hover:scale-120",
                hoverCardImageClassName
              )}
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={"/blur-image.jpg"}
            />
          ) : null
        }
        buttonLabel={data.buttonLabel ?? ""}
        buttonLink={data.buttonUrl}
        linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
        iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
        titleClassName="min-w-0 mr-8"
        isHover={false}
        isProfile={isProfile}
        contentClassName={cn("min-w-0", contentClassName)}
        className={cn("h-[28rem] rounded-xl", cardClassName)}
        requiredHiddenStrip={requiredHiddenStrip}
        {...(openModal && { buttonAction: () => openModal(slides, index) })}
      />
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        cssMode={requireSafariCheck ? isSafariBrowser : false}
        spaceBetween={16}
        breakpoints={breakPoints}
        pagination={{
          el: `.${buttonName}-swiper-custom-pagination`,
          clickable: true,
        }}
        navigation={{
          nextEl: `.${buttonName}-swiper-button-next`,
          prevEl: `.${buttonName}-swiper-button-prev`,
          disabledClass: `${buttonName}-swiper-button-disabled`,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className={`${carouselName}Swiper`}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        slidesOffsetBefore={
          isBottomCarousel || useIsLabTopOffset ? (isLaptop ? 40 : 0) : isMobile && requirePadding ? 40 : 0
        }
        slidesOffsetAfter={
          isBottomCarousel || useIsLabTopOffset ? (isLaptop ? 40 : 0) : isMobile && requirePadding ? 40 : 0
        }
      >
        <>
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`}>{renderCard(slide, index)}</SwiperSlide>
          ))}
        </>
      </Swiper>

      {isConvertPaginationIcon ? (
        <>
          <div className="container mx-auto mt-4 hidden w-full justify-center gap-2 md:mt-14 lg:flex lg:gap-8">
            <div className="relative w-14">
              <div className={`swiper-button ${buttonName}-swiper-button-prev`}>
                <CarouselNavigationArrowLeft />
              </div>
            </div>
            <div className={cn(`${buttonName}-swiper-custom-pagination`)} />
            <div className="relative w-14">
              <div className={`swiper-button ${buttonName}-swiper-button-next`}>
                <CarouselNavigationArrowRight />
              </div>
            </div>
          </div>

          <div className="z-10 container mx-auto my-5 flex w-full justify-center gap-2 lg:hidden">
            <div className="flex gap-4">
              <NavigationRoundedButton navigationName={buttonName} direction="prev" />
              <NavigationRoundedButton navigationName={buttonName} direction="next" />
            </div>
          </div>
        </>
      ) : (
        <div className="container mx-auto mt-4 flex w-full justify-center gap-2 md:mt-14 md:gap-4 lg:gap-8">
          <div className={cn("relative w-10", !isBottomCarousel && "md:w-14")}>
            <div className={`swiper-button ${buttonName}-swiper-button-prev`}>
              <CarouselNavigationArrowLeft />
            </div>
          </div>
          <div className={cn(`${buttonName}-swiper-custom-pagination`)} />
          <div className={cn("relative w-10", !isBottomCarousel && "md:w-14")}>
            <div className={`swiper-button ${buttonName}-swiper-button-next`}>
              <CarouselNavigationArrowRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
