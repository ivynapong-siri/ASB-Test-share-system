"use client";

import "@/client/styles/active-carousel.css";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useState } from "react";
import SwiperCore from "swiper";
import LinkButton from "../custom/buttons/link-button";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";
import ModalFlatCard from "../custom/modals/modal-flat-card";

interface SportFacilitiesCarouselProps {
  slides: SectionCardJson[];
  className?: string;
}

const ActiveImage = ({ slide, isMobile }: { slide: SectionCardJson; isMobile: boolean }) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="swiper-slide__content">
      <Image
        priority
        src={imgSrc}
        alt=""
        fill
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
    </div>
  );
};

const InactiveImage = ({ slide, isMobile }: { slide: SectionCardJson; isMobile: boolean }) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="swiper-slide__content w-full">
      <HoverCard
        title={slide.title}
        backgroundContent={
          <Image
            key={`${slide.id}-${slide.title}`}
            alt={""}
            src={imgSrc}
            fill
            priority
            className="object-cover transition-all duration-300 ease-out group-hover:scale-120"
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
        contentClassName="min-w-62 text-center"
        titleClassName="font-bold text-base"
      />
    </div>
  );
};

export default function SportFacilitiesCarousel({ slides, className }: SportFacilitiesCarouselProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiperLocal] = useState<SwiperCore | null>(null);
  const isMobile = useIsMobile();

  const handleNavigation = (direction: "prev" | "next", isMobile: boolean) => {
    const swiper = (
      document.querySelector(".sportFacilitiesSwiper") as HTMLElement & {
        swiper: SwiperCore;
      }
    )?.swiper;
    direction === "prev" ? (isMobile ? swiper.slideTo(1) : swiper.slideTo(2)) : swiper.slideNext();
  };

  function onClose() {
    setModalOpen(false);
  }

  const currentSlide = slides[activeIndex];
  const currentTitle = currentSlide?.title || "";
  const currentDescription = currentSlide?.subtitle || "";

  return (
    <div className={cn("facilities-swiper-container", className)}>
      <div className="flex h-[400px] w-full items-center justify-center md:h-[500px]">
        <Swiper
          spaceBetween={16}
          centeredSlides
          loop
          onSwiper={setSwiperLocal}
          slidesPerView="auto"
          navigation={{
            nextEl: ".sport-facilities-swiper-button-next",
            prevEl: ".sport-facilities-swiper-button-prev",
            disabledClass: "sport-facilities-swiper-button-disabled",
          }}
          onInit={({ realIndex }) => setActiveIndex(realIndex)}
          onRealIndexChange={({ realIndex }) => setActiveIndex(realIndex)}
          modules={[Navigation, Autoplay]}
          className="sportFacilitiesSwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.id}-${index}`} className="sport-facilities-swiper-slide h-full">
              {index === activeIndex ? (
                <ActiveImage slide={slide} isMobile={isMobile} />
              ) : (
                <InactiveImage slide={slide} isMobile={isMobile} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto my-6 flex w-full flex-row items-center justify-center gap-4 px-9 lg:gap-20">
        <div>
          <NavigationRoundedButton
            navigationName="sport-facilities"
            direction="prev"
            onClick={() => handleNavigation("prev", isMobile)}
          />
        </div>

        <div className="flex flex-col items-center text-center text-white">
          <p className="pb-4 text-xl font-semibold lg:text-[1.75rem]">{currentTitle}</p>
          <p className="mb-6 line-clamp-3 font-mono text-sm">{currentDescription}</p>
          <LinkButton
            buttonText={slides[activeIndex].buttonLabel}
            href={slides[activeIndex].buttonUrl}
            onClick={(e) => {
              e?.preventDefault();
              e?.stopPropagation();
              setModalOpen(true);
            }}
            linkClassName="bg-white text-primary-400 hover:text-white"
            iconClassName="border-primary-400 text-secondary group-hover/button:text-white group-hover/button:border-white"
          />
        </div>

        <div>
          <NavigationRoundedButton
            navigationName="sport-facilities"
            direction="next"
            onClick={() => handleNavigation("next", isMobile)}
          />
        </div>

        {isModalOpen && (
          <ModalFlatCard
            slides={slides ?? []}
            buttonName="outdoor-facilities-modal"
            carouselName="outdoorFacilitiesModal"
            otherLabel="Other Facilities"
            onClose={onClose}
            currentIndex={activeIndex}
          />
        )}
      </div>
    </div>
  );
}
