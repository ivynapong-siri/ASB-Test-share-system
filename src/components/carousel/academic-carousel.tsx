"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useState } from "react";
import { SwiperOptions } from "swiper/types";
import LinkButton from "../custom/buttons/link-button";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import ModalFlatCard from "../custom/modals/modal-flat-card";

interface AcademicCarouselProps {
  slides: SectionCardJson[];
  inActiveSlideClassName?: string;
  breakPoints: SwiperOptions["breakpoints"];
  className?: string;
  paddingLeft?: number;
}

const RenderCard = ({
  slide,
  inActiveSlideClassName,
  onClick,
  isMobile,
}: {
  slide: SectionCardJson;
  inActiveSlideClassName?: string;
  onClick: () => void;
  isMobile: boolean;
}) => {
  const imageUrl =
    (isMobile ? slide.imageMobile?.imageUrl : slide.image?.imageMediumLargeUrl) || slide.image?.imageUrl || "";
  return (
    <div className="relative h-full max-h-[486px] w-full">
      <div
        className={cn(
          "relative aspect-[3/4] h-full max-h-[486px] w-full overflow-hidden rounded-4xl",
          inActiveSlideClassName
        )}
      >
        <Image src={imageUrl} alt={slide.title} className="object-cover" fill priority />
        <div className="via-primary/30 to-primary absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent" />
      </div>
      <div className="absolute bottom-4 left-0 w-fit px-6 pb-2 text-white">
        <h5 className="pb-3 text-white">{slide.title}</h5>
        <LinkButton
          linkClassName="w-fit text-xs px-2 py-1 bg-white text-primary hover:text-white"
          buttonText={slide.buttonLabel ?? ""}
          href={slide.buttonUrl ?? ""}
          size="sm"
          onClick={onClick}
          iconClassName="text-secondary border border-dashed border-primary rounded-full size-6 p-1 group-hover/button:border-white group-hover/button:text-white"
        />
      </div>
    </div>
  );
};

export default function AcademicCarousel({
  slides,
  inActiveSlideClassName,
  breakPoints,
  className,
  paddingLeft,
}: AcademicCarouselProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = useIsMobile();

  const handleOpenModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={cn("relative max-w-full", className)} style={{ paddingLeft }}>
      <Swiper
        className="activeSwiper h-full"
        spaceBetween={16}
        breakpoints={breakPoints}
        loop
        navigation={{
          nextEl: ".academic-swiper-button-next",
          prevEl: ".academic-swiper-button-prev",
          disabledClass: "academic-swiper-button-disabled",
        }}
        wrapperClass="items-end !w-full"
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`} className="h-full max-h-[486px]">
            <RenderCard
              slide={slide}
              inActiveSlideClassName={inActiveSlideClassName}
              onClick={() => handleOpenModal(index)}
              isMobile={isMobile}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden gap-2 py-10 lg:flex">
        <NavigationRoundedButton navigationName={"academic"} direction="prev" />
        <NavigationRoundedButton navigationName={"academic"} direction="next" />
      </div>

      <div className="flex justify-center gap-2 py-10 lg:hidden" style={{ paddingRight: paddingLeft }}>
        <NavigationRoundedButton navigationName={"academic"} direction="prev" />
        <NavigationRoundedButton navigationName={"academic"} direction="next" />
      </div>

      {isModalOpen && (
        <ModalFlatCard
          slides={slides ?? []}
          buttonName="academics-activities"
          carouselName="academicsActivities"
          otherLabel="Other Activities"
          onClose={() => handleCloseModal()}
          currentIndex={activeIndex}
        />
      )}
    </div>
  );
}
