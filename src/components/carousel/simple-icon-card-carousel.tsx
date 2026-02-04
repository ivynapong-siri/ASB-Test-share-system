"use client";

import "swiper/css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import IconCard from "../custom/cards/icon-card";

interface SimpleIconCardCarouselProps {
  cards: SectionCardJson[];
  carouselName: string;
  iconClassName?: string;
}

export default function SimpleIconCardCarousel({ cards, carouselName, iconClassName }: SimpleIconCardCarouselProps) {
  const isMobile = useIsMobile();
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);

  const [maxTitleHeight, setMaxTitleHeight] = useState<number>(0);
  const [maxDescriptionHeight, setMaxDescriptionHeight] = useState<number>(0);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (cardRef.current.length > 0) {
        const heights = cardRef.current.map((el) => el?.offsetHeight || 0);
        setMaxCardHeight(Math.max(...heights));
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [cards]);

  useEffect(() => {
    if (titleRefs.current.length > 0) {
      const heights = titleRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxTitleHeight(Math.max(...heights));
    }
    if (descriptionRefs.current.length > 0) {
      const heights = descriptionRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxDescriptionHeight(Math.max(...heights));
    }
  }, [cards]);

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        navigation={{
          nextEl: `.${carouselName}-swiper-button-next`,
          prevEl: `.${carouselName}-swiper-button-prev`,
          disabledClass: `${carouselName}-swiper-button-disabled`,
        }}
        slidesPerView={isMobile ? undefined : "auto"}
        spaceBetween={16}
        modules={[Navigation, Autoplay]}
        centeredSlides
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {cards.map((card, index) => {
          const cardImage2Url = card.image2?.imageUrl;

          return (
            <SwiperSlide
              key={card.id}
              style={{ width: "fit-content", minHeight: maxCardHeight || "auto" }}
              className="flex min-h-full"
            >
              <IconCard
                titleRef={(el) => (titleRefs.current[index] = el)}
                cardRef={(el) => (cardRef.current[index] = el)}
                descriptionRef={(el) => (descriptionRefs.current[index] = el)}
                maxTitleHeight={maxTitleHeight}
                maxCardHeight={maxCardHeight}
                maxDescriptionHeight={maxDescriptionHeight}
                className={cn(
                  "h-full min-h-[503px] w-[387px] max-md:min-h-[460px] max-md:max-w-[358px]",
                  iconClassName
                )}
                icon={
                  cardImage2Url ? (
                    <Image
                      src={cardImage2Url}
                      alt={`icon-card-${card.id}-${index}`}
                      width={70}
                      height={70}
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={"/blur-image.jpg"}
                    />
                  ) : undefined
                }
                title={card.title}
                description={card.description}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mt-12 flex w-full justify-center gap-8">
        <NavigationRoundedButton navigationName={carouselName} direction="prev" />
        <NavigationRoundedButton navigationName={carouselName} direction="next" />
      </div>
    </div>
  );
}
