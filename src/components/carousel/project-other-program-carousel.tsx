"use client";

import "swiper/css";

import { chunkArray, getImageUrl } from "@/client/utils/helper";
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useState } from "react";
import { SwiperOptions } from "swiper/types";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";

interface ProjectOtherProgramCarouselProps {
  cards: SectionCardJson[];
  breakPoint: SwiperOptions["breakpoints"];
  carouselName: string;
}

const RenderCard = ({ card, isMobile }: { card: SectionCardJson; isMobile: boolean }) => {
  const primaryUrl = getImageUrl(card, isMobile);
  const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <HoverCard
      title={card.title}
      backgroundContent={
        <Image
          src={imgSrc}
          alt={`hover-slide-image-${card.id}`}
          fill
          priority
          className="absolute top-4 right-2 h-full w-full scale-110 border-none [mask-image:linear-gradient(to_top,0%,#000_100%)] object-cover transition-all duration-300 ease-out group-hover:scale-120"
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
      buttonOnHover
      customContentHoverClassName="pb-2"
      linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
      iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
      contentClassName="min-w-0"
      buttonLabel={card.buttonLabel}
      buttonLink={card.buttonUrl}
    />
  );
};

export default function ProjectOtherProgramCarousel({
  cards,
  breakPoint,
  carouselName,
}: ProjectOtherProgramCarouselProps) {
  const isMobile = useIsMobile();
  const groupedMobileCards = chunkArray(cards, 1);

  return (
    <div className="w-full max-lg:pl-10">
      <Swiper
        navigation={{
          nextEl: `.${carouselName}-swiper-button-next`,
          prevEl: `.${carouselName}-swiper-button-prev`,
          disabledClass: `${carouselName}-swiper-button-disabled`,
        }}
        loop
        autoHeight
        modules={[Navigation, Grid, Autoplay]}
        spaceBetween={16}
        breakpoints={breakPoint}
        className="overflow-hidden"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {isMobile
          ? groupedMobileCards.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 gap-4">
                  {data.map((e) => {
                    return <RenderCard card={e} isMobile={isMobile} />;
                  })}
                </div>
              </SwiperSlide>
            ))
          : cards.map((card, inx) => (
              <SwiperSlide key={`hover-card-${card.id}-${inx}`}>
                <RenderCard card={card} isMobile={isMobile} />
              </SwiperSlide>
            ))}
      </Swiper>
      <div className="mt-12 flex justify-center gap-4 max-md:pr-10">
        <NavigationRoundedButton navigationName={carouselName} direction="prev" />
        <NavigationRoundedButton navigationName={carouselName} direction="next" />
      </div>
    </div>
  );
}
