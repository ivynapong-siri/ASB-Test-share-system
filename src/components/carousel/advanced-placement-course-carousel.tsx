"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import BlogCardWithIndex from "../custom/cards/blog-card-with-index";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { advancedPlacementCourseBreakPoints } from "@/client/configs/slide-carousel-config";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/client/utils/helper";

interface AdvancedPlacementCourseCarouselProps {
  cards: SectionCardJson[];
  className?: string;
  isMobile: boolean;
}

const renderCard = (
  data: SectionCardJson,
  index: number,
  setHeight: Dispatch<SetStateAction<number>>,
  heightOfSwiper: number,
  isMobile: boolean
) => {
   const primaryUrl = getImageUrl(data, isMobile);
   const fallbackUrl = data.image?.imageUrl || "/mock-image.jpg";
   const [imgSrc, setImgSrc] = useState(primaryUrl);
   
  return (
    <BlogCardWithIndex
      key={data.id}
      title={data.title}
      content={data.richTextDescription}
      imageSrc={imgSrc}
      setImgSrc={setImgSrc}
      fallbackUrl={fallbackUrl}
      className="flex h-full flex-col"
      contentBackgroundClassName="bg-[#F3F5F6] w-full h-full"
      getContentHeight={setHeight}
      index={index}
      isImageOnTop
      richText
      maxHeight={heightOfSwiper}
      richTextClassName="text-primary"
      badgeClassName="bg-primary-200"
      imageClassName="min-h-[237px] max-h-[237px] lg:min-h-[256px] lg:max-h-[256px]"
    />
  );
};

export default function AdvancedPlacementCourseCarousel({
  cards,
  className,
  isMobile,
}: AdvancedPlacementCourseCarouselProps) {
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [swiperHeight, setSwiperHeight] = useState<number>(0);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative z-10 w-full">
        <Swiper
          onInit={(swiper) => {
            setSwiperHeight(swiper.el.offsetHeight);
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.pagination) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }, 0);
          }}
          onResize={(swiper) => {
            setSwiperHeight(swiper.el.offsetHeight);
          }}
          pagination={{
            el: `.ap-carousel-swiper-custom-pagination${isMobile && "-mobile"}`,
            clickable: true,
          }}
          navigation={{
            nextEl: `.ap-carousel-swiper-button-next${isMobile && "-mobile"}`,
            prevEl: `.ap-carousel-swiper-button-prev${isMobile && "-mobile"}`,
            disabledClass: `ap-carousel-swiper-button-disabled${isMobile && "-mobile"}`,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={advancedPlacementCourseBreakPoints}
          spaceBetween={16}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesOffsetBefore={isMobile ? 40 : 0}
          slidesOffsetAfter={isMobile ? 40 : 0}
        >
          {cards.map((card, index) => (
            <SwiperSlide>{renderCard(card, index, setDescriptionHeight, swiperHeight, isMobile)}</SwiperSlide>
          ))}
        </Swiper>

        <div
          className="bg-primary-400 absolute bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2"
          style={{ height: `${isMobile ? descriptionHeight + 32 : descriptionHeight}px` }}
        />
      </div>

      <div className="relative flex w-full justify-center py-16">
        <div className="container mx-auto mt-4 flex w-full justify-center gap-2 md:mt-14 lg:gap-8">
          <div className="relative w-10 md:w-14">
            <div className={`swiper-button ap-carousel-swiper-button-prev${isMobile && "-mobile"}`}>
              <CarouselNavigationArrowLeft color="white" />
            </div>
          </div>
          <div className={`ap-carousel-swiper-custom-pagination${isMobile && "-mobile"} white z-10`} />
          <div className="relative w-10 md:w-14">
            <div className={`swiper-button ap-carousel-swiper-button-next${isMobile && "-mobile"}`}>
              <CarouselNavigationArrowRight color="white" />
            </div>
          </div>
        </div>

        <div className="bg-primary-400 absolute top-0 z-1 h-full w-screen" />
      </div>
    </div>
  );
}
