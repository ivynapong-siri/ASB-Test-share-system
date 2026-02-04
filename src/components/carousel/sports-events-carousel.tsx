"use client";

import "@/client/styles/active-carousel.css";
import "swiper/css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { sportsEventsCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import BlogCard from "../custom/cards/blog-card";

interface SportsEventsCarouselProps {
  slides: SectionCardJson[];
  className?: string;
}

interface CardProps {
  titleRef: (el: HTMLHeadingElement | null) => void;
  maxTitleHeight?: number;
  cardRef: (el: HTMLHeadingElement | null) => void;
  maxCardHeight?: number;
  isMobile: boolean;
}

function Card({
  id,
  image,
  imageMobile,
  title,
  description,
  badge,
  maxTitleHeight,
  titleRef,
  cardRef,
  maxCardHeight,
  isMobile,
}: SectionCardJson & CardProps) {
  const imageUrl = isMobile ? imageMobile?.imageUrl : image?.imageMediumLargeUrl || image?.imageUrl || "";
  return (
    <BlogCard
      key={id}
      imgSrc={imageUrl || ""}
      showFooter={false}
      title={title}
      content={description}
      customBadgeChildren={
        <div className="bg-secondary-200 w-max rounded-full p-2 font-mono text-xs tracking-widest text-white">
          {badge}
        </div>
      }
      titleRef={titleRef}
      maxTitleHeight={maxTitleHeight}
      cardRef={cardRef}
      maxCardHeight={maxCardHeight}
      learnMoreHref=""
      classNameCardHeader="gap-3"
      classNameImg="h-[371px] w-full max-md:h-[298px]"
      classNameContentText="line-clamp-none pb-10"
    />
  );
}

export default function SportsEventsCarousel({ slides, className }: SportsEventsCarouselProps) {
  const swiperRef = useRef<SwiperRef | null>(null);
  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [maxTitleHeight, setMaxTitleHeight] = useState<number>(0);

  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  const handleNavigation = (direction: "prev" | "next") => {
    if (swiperRef.current) {
      direction === "prev" ? swiperRef.current.swiper.slidePrev() : swiperRef.current.swiper.slideNext();
    }
  };

  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (cardRef.current.length > 0) {
        const heights = cardRef.current.map((el) => el?.offsetHeight || 0);
        setMaxCardHeight(Math.max(...heights));
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [slides]);

  useEffect(() => {
    if (titleRefs.current.length > 0) {
      const heights = titleRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxTitleHeight(Math.max(...heights));
    }
  }, [slides]);

  const showArrow = isLaptop ? slides.length > 1 : slides.length > 2;

  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-8 xl:flex-row", className)}>
      {showArrow && (
        <div className="max-xl:hidden">
          <NavigationRoundedButton
            navigationName="sports-events"
            direction="prev"
            onClick={() => handleNavigation("prev")}
          />
        </div>
      )}

      <div className="w-full">
        <Swiper
          ref={swiperRef}
          spaceBetween={16}
          breakpoints={sportsEventsCarouselBreakPoints}
          modules={[Navigation, Autoplay]}
          className="w-full"
          slidesOffsetBefore={isLaptop ? 40 : 0}
          slidesOffsetAfter={isLaptop ? 40 : 0}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {slides.map((slide, inx) => (
            <SwiperSlide key={`${slide.id}-${inx}`} className="flex">
              <Card
                titleRef={(el) => (titleRefs.current[inx] = el)}
                maxTitleHeight={maxTitleHeight}
                cardRef={(el) => (cardRef.current[inx] = el)}
                maxCardHeight={maxCardHeight}
                {...slide}
                isMobile={isMobile}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        {showArrow && (
          <>
            <NavigationRoundedButton
              className="mr-4 xl:hidden"
              navigationName="sports-events"
              direction="prev"
              onClick={() => handleNavigation("prev")}
            />
            <NavigationRoundedButton
              navigationName="sports-events"
              direction="next"
              onClick={() => handleNavigation("next")}
            />
          </>
        )}
      </div>
    </div>
  );
}
