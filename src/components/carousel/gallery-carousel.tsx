"use client";

import "@/client/styles/active-carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useState } from "react";
import GalleryModal from "../custom/modals/gallery-modal";

interface GalleryCarouselProps {
  slides: SectionCardJson[];
  className?: string;
}

const ActiveImage = ({
  slide,
  openModal,
  isMobile,
}: {
  slide: SectionCardJson;
  openModal: () => void;
  isMobile: boolean;
}) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="school-gallery-swiper-slide__content ิbg-red-300 cursor-pointer">
      <Image
        onClick={openModal}
        src={imgSrc}
        alt=""
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
    </div>
  );
};

const InactiveImage = ({ slide, isMobile }: { slide: SectionCardJson; isMobile: boolean }) => {
  const primaryUrl = getImageUrl(slide, isMobile);
  const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="school-gallery-swiper-slide__content h-full w-full">
      <Image
        src={imgSrc}
        alt=""
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
    </div>
  );
};

export default function GalleryCarousel({ slides, className }: GalleryCarouselProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  function onClose() {
    setIsOpenModal(false);
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div className="flex h-[300px] w-full items-center justify-center md:h-[500px]">
        <Swiper
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.pagination) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }, 0);
          }}
          spaceBetween={16}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          navigation={{
            nextEl: `.gallery-swiper-button-next`,
            prevEl: `.gallery-swiper-button-prev`,
            disabledClass: `gallery-swiper-button-disabled`,
          }}
          pagination={{
            el: `.gallery-swiper-custom-pagination`,
            clickable: true,
          }}
          className="gallerySwiper w-full min-w-screen"
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="gallery-swiper-slide">
              {index === activeIndex ? (
                <ActiveImage
                  slide={slide}
                  openModal={() => {
                    setIsOpenModal(() => true);
                  }}
                  isMobile={isMobile}
                />
              ) : (
                <InactiveImage slide={slide} isMobile={isMobile} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto mt-4 flex w-full justify-center gap-2 md:mt-7 lg:gap-8 xl:mt-14">
        <div className="relative flex w-8 justify-end">
          <div className="swiper-button gallery-swiper-button-prev">
            <CarouselNavigationArrowLeft />
          </div>
        </div>
        <div className="gallery-swiper-custom-pagination" />
        <div className="relative w-14">
          <div className="swiper-button gallery-swiper-button-next">
            <CarouselNavigationArrowRight />
          </div>
        </div>
      </div>
      {isOpenModal && <GalleryModal onClose={onClose} slides={slides} currentIndex={activeIndex} />}
    </div>
  );
}
