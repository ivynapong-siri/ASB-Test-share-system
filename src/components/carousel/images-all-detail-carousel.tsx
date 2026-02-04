"use client";

import "swiper/css";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import { GalleriesJson } from "@/server/serializers/news-group-serializer";
import Image from "next/image";
interface ImagesAllDetailCarouselProps {
  slides: GalleriesJson[];
  carouselName: string;
  slideName: string;
  imageClassName: string;
  sliderClassName?: string;
  containerClassName?: string;
  centeredSlides?: boolean;
  translate?: number;
}

export default function ImagesAllDetailCarousel({
  slides,
  carouselName,
  slideName,
  imageClassName,
  containerClassName,
  sliderClassName,
  centeredSlides,
  translate = 0,
}: ImagesAllDetailCarouselProps) {
  function setTranslate(swiper: SwiperClass) {
    swiper.setTranslate(swiper.translate + translate);
  }

  return (
    <div className={cn("relative h-[300px] w-full", containerClassName)}>
      <Swiper
        navigation={{
          nextEl: `.${carouselName}-swiper-button-next`,
          prevEl: `.${carouselName}-swiper-button-prev`,
          disabledClass: `${carouselName}-swiper-button-disabled`,
        }}
        loop
        centeredSlides={centeredSlides}
        slidesPerView={"auto"}
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        onSlideChange={setTranslate}
        className={cn("h-full", sliderClassName)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, inx) => {
          // Check file url when customer add small images, just use the full image size
          const imageUrl = slide.metadata.mediumLarge?.fileUrl ?? slide.metadata.full.fileUrl;

          return (
            <SwiperSlide key={`${slideName}-${slide.attachment.id}-${inx}`} style={{ width: "fit-content" }}>
              <div className={cn("relative", imageClassName)}>
                <Image
                  src={imageUrl}
                  alt={`${slideName}-${slide.attachment.id}-${inx}`}
                  priority
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 500px"
                  className="rounded-4xl object-cover"
                  placeholder="blur"
                  blurDataURL={"/blur-image.jpg"}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
