"use client";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ReactNode, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { chunkArray } from "@/client/utils/helper";
import { useIsLaptop } from "@/hooks/use-laptops";
import { cn } from "@/lib/utils";
import { NewsGroupDetailJson } from "@/server/serializers/news-group-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";
import { motion } from "framer-motion";
import { Swiper as SwiperInstance } from "swiper";
import NewsCard from "../custom/cards/news-card";

interface LatestNewsCarouselProps {
  cardData: NewsGroupDetailJson[];
  filterContent?: ReactNode;
  buttonName?: string;
  buttonLabel: string;
  groupedCardsChunkArrayIndex?: number;
  paginateClassName?: string;
}

const RenderCard = ({ buttonLabel, data }: { data: NewsGroupDetailJson; buttonLabel: string }) => {
  const convertDate = data.date && data.date !== "" ? getFormatCardDate(data.date) : "";
  const endpoint = `/our-community/news/detail/${data.slug}`;

  return (
    <NewsCard
      key={data.id}
      title={data.title}
      dateTag={convertDate}
      badgeOnImage={!!data.subcategory}
      badgeOnImageText={data.subcategory ?? ""}
      buttonText={buttonLabel}
      content={data.description}
      contentMobile={data.descriptionMobile}
      imgSrc={data.image?.imageMediumLargeUrl || data.image?.imageUrl || "/mock-image.jpg"}
      learnMoreHref={endpoint}
    />
  );
};

// forwardRef so parent can control swiper if needed
const LatestNewsCarousel = forwardRef<SwiperInstance, LatestNewsCarouselProps>(
  (
    {
      cardData,
      filterContent,
      paginateClassName,
      buttonName = "latest-news",
      buttonLabel,
      groupedCardsChunkArrayIndex = 9,
    },
    ref
  ) => {
    const paginationRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLaptop = useIsLaptop();

    const swiperRef = useRef<SwiperInstance | null>(null);

    // ensure swiper starts from index 0
    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.slideToLoop(0, 0);
      }
    }, []);

    const handleSlideChange = (swiper: SwiperInstance) => {
      setActiveIndex(swiper.realIndex);
    };

    useEffect(() => {
      const paginationEl = paginationRef.current;
      if (!paginationEl) return;

      const bullets = [...paginationEl.children] as HTMLElement[];
      if (!bullets.length) return;

      const bulletWidth = bullets[0]?.offsetWidth + 16;
      const totalBullets = bullets.length;
      const visibleCount = 5;
      const mid = Math.floor(visibleCount / 2);

      let translateX = 0;

      if (activeIndex > mid && activeIndex < totalBullets - mid) {
        translateX = -(activeIndex - mid) * bulletWidth;
      }

      if (activeIndex >= totalBullets - mid) {
        translateX = -(totalBullets - visibleCount) * bulletWidth;
      }

      if (activeIndex <= mid) {
        translateX = 0;
      }

      paginationEl.style.transform = `translateX(${translateX}px)`;
    }, [activeIndex]);

    const groupedCards = useMemo(
      () => chunkArray(cardData, isLaptop ? 8 : groupedCardsChunkArrayIndex),
      [cardData, groupedCardsChunkArrayIndex, isLaptop]
    );

    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.slideToLoop(0, 0);
      }
    }, [groupedCards]);

    return (
      <div className="relative w-full">
        <div className="my-10 flex w-full flex-col items-center">{filterContent}</div>
        {groupedCards.length > 0 && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setTimeout(() => {
                if (swiper.pagination) {
                  swiper.pagination.render();
                  swiper.pagination.update();
                }
              }, 0);
              if (typeof ref === "function") ref(swiper);
              else if (ref) (ref as React.MutableRefObject<SwiperInstance | null>).current = swiper;
            }}
            virtual
            spaceBetween={16}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            pagination={{
              el: `.${buttonName}-swiper-custom-pagination`,
              clickable: true,
            }}
            loop={cardData.length > 9}
            navigation={{
              nextEl: `.${buttonName}-swiper-button-next`,
              prevEl: `.${buttonName}-swiper-button-prev`,
              disabledClass: `${buttonName}-swiper-button-disabled`,
            }}
            lazyPreloadPrevNext={9}
            modules={[Pagination, Navigation, Virtual]}
            className={`${buttonName}Swiper flex h-full w-full`}
          >
            {groupedCards.map((group, index) => (
              <SwiperSlide key={`slide-${index}-${group.map((card) => card.id).join("-")}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
                >
                  {group.map((card, cardIndex) => (
                    <RenderCard key={`${card.id}-${cardIndex}`} data={card} buttonLabel={buttonLabel} />
                  ))}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div
          className={cn(
            "container mx-auto hidden w-full justify-center gap-2 py-4 md:py-14 md:pb-16 lg:gap-8",
            groupedCards.length > 0 && "flex"
          )}
        >
          <div className="relative w-10 md:w-14">
            <div className={`swiper-button ${buttonName}-swiper-button-prev`}>
              <CarouselNavigationArrowLeft />
            </div>
          </div>

          {/* Paginates offset */}
          <div
            className={cn(
              `relative w-[min(100%,200px)] overflow-x-hidden`,
              paginateClassName,
              cardData && cardData.length > groupedCardsChunkArrayIndex * 6
                ? "lg:w-[min(100%,365px)]"
                : "lg:w-[min(100%,225px)]"
            )}
          >
            <div
              ref={paginationRef}
              className={`${buttonName}-swiper-custom-pagination flex transition-transform duration-300`}
            />
          </div>

          <div className="relative w-10 md:w-14">
            <div className={`swiper-button ${buttonName}-swiper-button-next`}>
              <CarouselNavigationArrowRight />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

LatestNewsCarousel.displayName = "LatestNewsCarousel";

export default LatestNewsCarousel;
