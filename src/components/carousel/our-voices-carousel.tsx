"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { chunkArray, getImageUrl } from "@/client/utils/helper";
import { ReactNode, useMemo, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { motion } from "framer-motion";
import Image from "next/image";
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
        contentStyleTranslation={10}
        customContentHoverClassName="md:pb-6 lg:pb-4"
      />
    </motion.div>
  );
};

export default function OurVoicesCarousel({
  profileCardData,
  badgeLabel,
  buttonName,
  filterContent,
}: {
  profileCardData: SectionCardJson[];
  badgeLabel: string;
  buttonName: string;
  filterContent?: ReactNode;
}) {
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const handleScrollToTop = () => {
    if (!isMobile) {
      swiperContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const groupNumber = isTablet ? 6 : 9;
  const groupedCards = useMemo(() => chunkArray(profileCardData, groupNumber), [profileCardData, groupNumber]);

  return (
    <div ref={swiperContainerRef} className="relative w-full overflow-x-hidden">
      <div className="my-10 flex w-full flex-col items-center">{filterContent}</div>
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
        slidesPerView={1}
        pagination={{
          el: `.${buttonName}-custom-pagination`,
          clickable: true,
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onSlideChange={() => {
          handleScrollToTop();
        }}
        autoHeight
        modules={[Pagination, Navigation]}
        className={`${buttonName}Swiper flex h-full w-full`}
      >
        {groupedCards.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.map((e) => (
                <div key={e.id}>
                  <RenderHoverCard badgeLabel={badgeLabel} data={e} isMobile={isMobile} />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mx-auto mt-4 flex w-full justify-center gap-2 md:mt-14 md:gap-4 lg:gap-8">
        <div className="relative w-10">
          <div ref={prevRef} className="swiper-button">
            <CarouselNavigationArrowLeft />
          </div>
        </div>

        <div className={`${buttonName}-custom-pagination `} />

        <div className="relative w-10">
          <div ref={nextRef} className="swiper-button">
            <CarouselNavigationArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
