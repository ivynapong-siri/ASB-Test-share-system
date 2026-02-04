"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper as SwiperInstance } from "swiper";
import HoverCard from "../custom/cards/hover-card";

const RenderHoverCard = ({
  data,
  badgeLabel,
  isMobile,
}: {
  badgeLabel: string;
  data: SectionCardJson;
  isMobile: boolean;
}) => {
  const primaryUrl = getImageUrl(data, isMobile);
  const fallbackUrl = data.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <HoverCard
        key={data.id}
        title={data.title}
        contentTitle={data.subject}
        description={data.description}
        badgeLabel={badgeLabel}
        backgroundContent={
          <Image
            key={data.image?.id}
            alt=""
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
        className="w-full min-w-0"
        contentStyleTranslation={16}
        customContentHoverClassName="pb-8"
      />
    </motion.div>
  );
};

export default function OurVoicesCarouselMobile({
  profileCardData,
  badgeLabel,
  filterContent,
}: {
  profileCardData: SectionCardJson[];
  badgeLabel: string;
  filterContent?: ReactNode;
}) {
  const isMobile = useIsMobile();
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const visibleCount = 5;

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  // scroll pagination bullets
  useEffect(() => {
    const paginationEl = paginationRef.current;
    if (!paginationEl) return;

    const bullets = [...paginationEl.children] as HTMLElement[];
    if (!bullets.length) return;

    const bulletWidth = bullets[0]?.offsetWidth + 16;
    const totalBullets = bullets.length;
    const mid = Math.floor(visibleCount / 2);

    let translateX = 0;
    if (activeIndex > mid && activeIndex < totalBullets - mid) {
      translateX = -(activeIndex - mid) * bulletWidth;
    } else if (activeIndex >= totalBullets - mid) {
      translateX = -(totalBullets - visibleCount) * bulletWidth;
    }

    paginationEl.style.transform = `translateX(${translateX}px)`;
  }, [activeIndex]);

  return (
    <div ref={swiperContainerRef} className="relative w-full overflow-x-hidden">
      <div className="my-10 flex w-full flex-col items-center">{filterContent}</div>
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        onSlideChange={handleSlideChange}
        pagination={{
          el: ".mobile-custom-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".mobile-next",
          prevEl: ".mobile-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mobileSwiper !ml-10 flex h-full w-full"
      >
        {profileCardData.map((e) => (
          <SwiperSlide key={e.id}>
            <RenderHoverCard badgeLabel={badgeLabel} data={e} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mx-auto mt-4 flex w-full justify-center gap-2 lg:gap-4">
        <div className="relative w-10">
          <div className="swiper-button mobile-prev">
            <CarouselNavigationArrowLeft />
          </div>
        </div>

        <div className="relative w-[min(100%,200px)] overflow-hidden lg:w-[min(100%,370px)]">
          <div ref={paginationRef} className="mobile-custom-pagination flex transition-transform duration-300" />
        </div>

        <div className="relative w-10">
          <div className="swiper-button mobile-next">
            <CarouselNavigationArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
