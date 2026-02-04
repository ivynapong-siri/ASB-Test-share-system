"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/client/utils/helper";
import { NavigationRoundedButton } from "@/components/custom/buttons/navigation-rounded-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useState } from "react";

interface EducationCarouselProps {
  cards: SectionCardJson[];
}

const EducationCarousel = ({ cards }: EducationCarouselProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative -mx-5 flex flex-row items-center justify-center gap-2 sm:mx-0 lg:gap-10 lg:pt-10">
      <div className="flex w-fit items-center justify-end lg:w-1/3 xl:w-fit">
        <NavigationRoundedButton navigationName="education" direction="prev" iconClassName="size-6 md:size-8" />
      </div>
      <Swiper
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={60}
        className="w-full"
        loop
        navigation={{
          nextEl: ".education-swiper-button-next",
          prevEl: ".education-swiper-button-prev",
          disabledClass: "education-swiper-button-disabled",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {cards?.map((slide, idx) => {
          const primaryUrl = getImageUrl(slide, isMobile);
          const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
          const [imgSrc, setImgSrc] = useState(primaryUrl);

          return (
            <SwiperSlide key={idx}>
              <div className="flex h-fit w-full flex-row items-center justify-center bg-transparent py-2 sm:py-5 lg:px-20 lg:py-10 xl:py-15">
                <div className="relative">
                  <div className="relative h-36 w-72 sm:h-56 sm:w-96 lg:w-[30rem] xl:h-[30rem] xl:w-[60rem] 2xl:h-[40rem] 2xl:w-[72rem]">
                    <Image
                      src={imgSrc}
                      alt=""
                      className="rounded-3xl object-cover"
                      fill
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
                  </div>
                  <div className="absolute top-0 -z-1 h-32 w-52 rotate-6 rounded-3xl border border-black sm:h-56 sm:w-96 lg:w-[30rem] xl:h-[30rem] xl:w-[60rem] 2xl:h-[40rem] 2xl:w-[72rem]" />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="w-fit lg:w-1/3 xl:w-fit">
        <NavigationRoundedButton navigationName="education" direction="next" iconClassName="size-6 md:size-8" />
      </div>
    </div>
  );
};

export default EducationCarousel;
