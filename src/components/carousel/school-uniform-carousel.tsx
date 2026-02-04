"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRef, useState } from "react";
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/client/utils/helper";
import { NavigationRoundedButton } from "@/components/custom/buttons/navigation-rounded-button";
import HoverCard from "@/components/custom/cards/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";

export interface SchoolUniformCarouselProps {
  slides: SectionCardJson[];
  className?: string;
  buttonName: string;
  isProfile?: boolean;
  contentClassName?: string;
}

export default function SchoolUniformCarousel({
  slides,
  className,
  buttonName,
  isProfile,
  contentClassName,
}: SchoolUniformCarouselProps) {
  const ref = useRef<SwiperRef>(null);
  const isMobile = useIsMobile();
  const renderCard = (data: SectionCardJson, isMobile: boolean) => {
    const primaryUrl = getImageUrl(data, isMobile);
    const fallbackUrl = data.image?.imageUrl || "/mock-image.jpg";
    const [imgSrc, setImgSrc] = useState(primaryUrl);

    return (
      <HoverCard
        key={data.id}
        title={data.title}
        badgeLabel={data.badge}
        personPosition={data.subject}
        backgroundContent={
          <Image
            key={`${data.id}-${data.title}`}
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
        buttonLabel={data.buttonLabel ?? ""}
        buttonLink={data.buttonUrl}
        linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
        iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
        isHover={false}
        isProfile={isProfile}
        titleClassName="min-w-0 mr-8"
        contentClassName={cn("min-w-0 xl:min-w-sm", contentClassName)}
        className="h-[28rem] w-full rounded-xl"
      />
    );
  };

  return (
    <div className={cn("relative flex w-full flex-col xl:flex-row xl:items-center xl:gap-4", className)}>
      <div className="hidden xl:block">
        <NavigationRoundedButton navigationName={buttonName} direction="prev" />
      </div>

      <Swiper
        ref={ref}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        spaceBetween={16}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        lazyPreloadPrevNext={5}
        pagination={{
          el: `.${buttonName}-swiper-custom-pagination`,
          clickable: true,
        }}
        navigation={{
          nextEl: `.${buttonName}-swiper-button-next`,
          prevEl: `.${buttonName}-swiper-button-prev`,
          disabledClass: `${buttonName}-swiper-button-disabled`,
        }}
        modules={[Pagination, Navigation, Grid, Autoplay]}
        className="max-xl:max-w-screen"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide className="max-w-[350px] xl:max-w-[375px] 2xl:max-w-[430px]" key={index}>
            {renderCard(slide, isMobile)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden w-fit xl:block">
        <NavigationRoundedButton navigationName={buttonName} direction="next" iconClassName="size-6 xl:size-8" />
      </div>

      <div className="xl:hidden">
        <DefaultCarouselButton buttonName={buttonName} />
      </div>
    </div>
  );
}

const DefaultCarouselButton = ({ buttonName }: Pick<SchoolUniformCarouselProps, "buttonName">) => {
  return (
    <div className="container mx-auto mt-7 flex w-full justify-center gap-2 xl:mt-14 xl:gap-8">
      <div className="relative w-10 xl:w-14">
        <NavigationRoundedButton navigationName={buttonName} direction="prev" />
      </div>

      <div className="relative w-10 xl:w-14">
        <NavigationRoundedButton navigationName={buttonName} direction="next" />
      </div>
    </div>
  );
};
