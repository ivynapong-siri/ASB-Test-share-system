"use client";

import "@/client/styles/active-carousel.css";
import "swiper/css";
import "swiper/css/navigation";

import { getImageUrl, getMinSectionCardJsonLoop } from "@/client/utils/helper";
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";

interface OtherFacilitiesCarouselProps {
  slides: SectionCardJson[];
  children: ReactNode;
  onClick: () => void;
  modalPopup: ReactNode;
  isModalOpen: boolean;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  loopNumber: number;
  className?: string;
}

const ActiveImage = ({
  slide,
  onClick,
  isMobile,
}: {
  slide: SectionCardJson;
  onClick: () => void;
  isMobile: boolean;
}) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="other-swiper-slide__content cursor-pointer">
      <HoverCard
        title={slide.title}
        personPosition={slide.subtitle}
        backgroundContent={
          <Image
            key={`${slide.id}-${slide.title}`}
            alt=""
            src={imgSrc}
            fill
            priority
            className="object-cover"
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
        buttonLabel={slide.buttonLabel}
        buttonLink={slide.buttonUrl}
        onClick={() => onClick()}
        isHover={false}
        className="flex h-full w-full"
        contentClassName="items-center text-center flex w-full min-w-px"
        personPositionClassName="text-sm line-clamp-3"
        linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white text-sm"
        iconClassName="border-primary-400 text-secondary group-hover/button:text-white group-hover/button:border-white"
        backgroundClassName="rounded-b-[48px] md:rounded-b-5xl lg:rounded-b-4xl"
      />
    </div>
  );
};

const InactiveImage = ({ slide, isMobile }: { slide: SectionCardJson; isMobile: boolean }) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="other-swiper-slide__content">
      <HoverCard
        title={slide.title}
        backgroundContent={
          <Image
            key={`${slide.id}-${slide.title}`}
            alt=""
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
        isHover={false}
        className="flex h-full w-full"
        contentClassName="items-center text-center flex w-full min-w-px"
        backgroundClassName="rounded-b-[48px] md:rounded-b-5xl lg:rounded-b-4xl"
      />
    </div>
  );
};

export default function OtherFacilitiesCarousel({
  slides,
  children,
  isModalOpen,
  modalPopup,
  onClick,
  loopNumber,
  className,
}: OtherFacilitiesCarouselProps) {
  const carouselName = "other-facilities";
  const cards = getMinSectionCardJsonLoop({ cards: slides, minLoopCard: loopNumber });
  const isMobile = useIsMobile();

  const ref = useRef<SwiperRef>(null);

  const handleNavigation = (direction: "prev" | "next") => {
    direction === "prev" ? ref.current?.swiper.slidePrev() : ref.current?.swiper.slideNext();
  };

  return (
    <div className={cn("flex h-full w-full flex-col lg:flex-row lg:gap-16", className)}>
      <div className="flex w-full flex-1 grow flex-col gap-24 lg:max-w-[400px] lg:min-w-[400px]">
        {children}

        <div className="container mx-auto my-6 hidden w-full flex-row justify-center gap-4 lg:flex lg:justify-start">
          <div>
            <NavigationRoundedButton
              navigationName={carouselName}
              direction="prev"
              onClick={() => handleNavigation("prev")}
            />
          </div>
          <div>
            <NavigationRoundedButton
              navigationName={carouselName}
              direction="next"
              onClick={() => handleNavigation("next")}
            />
          </div>
        </div>
      </div>

      <div className="relative flex w-full pt-15 lg:max-w-5/6 lg:pt-0">
        <Swiper
          ref={ref}
          slidesPerView="auto"
          loop
          slidesPerGroup={1}
          spaceBetween={16}
          navigation={{
            nextEl: `.${carouselName}-swiper-button-next`,
            prevEl: `.${carouselName}-swiper-button-prev`,
            disabledClass: `${carouselName}-swiper-button-disabled`,
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          centeredSlides={isMobile}
          className="otherFacilitiesSwiper max-lg:min-h-[467px]"
        >
          {cards.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`} className="other-facilities-swiper-slide">
              {({ isActive }) => (
                <div
                  className={cn(
                    "other-swiper-slide__content transition-all duration-500 ease-in-out",
                    isActive && "z-10"
                  )}
                >
                  {isActive ? (
                    <ActiveImage slide={slide} onClick={() => onClick()} isMobile={isMobile} />
                  ) : (
                    <InactiveImage slide={slide} isMobile={isMobile} />
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto my-6 flex w-full flex-row justify-center gap-4 pt-6 lg:hidden lg:justify-start">
        <div>
          <NavigationRoundedButton
            navigationName={carouselName}
            direction="prev"
            onClick={() => handleNavigation("prev")}
          />
        </div>
        <div>
          <NavigationRoundedButton
            navigationName={carouselName}
            direction="next"
            onClick={() => handleNavigation("next")}
          />
        </div>
      </div>

      {isModalOpen && modalPopup}
    </div>
  );
}
