"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { useIsMobile } from "@/hooks/use-mobile";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { NewsGroupDetailJson } from "@/server/serializers/news-group-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";
import Image from "next/image";
import LinkButton from "../custom/buttons/link-button";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";

export interface WideCarouselProps {
  slides: NewsGroupDetailJson[] | SectionCardJson[];
  className?: string;
  carouselName: string;
  buttonName: string;
  haveArrowActiveCard?: boolean;
  isRedButton?: boolean;
  contentClassName?: string;
  arrowClassName?: string;
  haveButtonActiveCard?: boolean;
  activeCardClassName?: string;
  haveBadge?: boolean;
  haveCategoriesBadge?: boolean;
  subjectClassName?: string;
  buttonLabel?: string;
  href?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function isSectionCardJson(data: NewsGroupDetailJson | SectionCardJson): data is SectionCardJson {
  return "imageMobile" in data;
}

export default function WideCarousel({
  slides,
  className,
  buttonName,
  carouselName,
  haveArrowActiveCard,
  isRedButton,
  contentClassName,
  arrowClassName: buttonClassName,
  haveButtonActiveCard,
  activeCardClassName,
  haveBadge,
  haveCategoriesBadge = true,
  subjectClassName,
  buttonLabel,
  href,
  descriptionClassName,
  titleClassName,
}: WideCarouselProps) {
  const isMobile = useIsMobile();
  const ref = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavigation = (direction: "prev" | "next") => {
    const swiper = ref.current?.swiper;
    if (!swiper) return;
    direction === "prev" ? swiper.slidePrev() : swiper.slideNext();
  };

  const renderCard = (
    data: NewsGroupDetailJson | SectionCardJson,
    index: number,
    isMobile: boolean,
    titleClassName?: string,
    descriptionClassName?: string
  ) => {
    const isActive = index === activeIndex;
    const convertDate = getFormatCardDate(data.date);
    const isNewsGroup = "newsType" in data;
    const imageMobile = "imageMobile" in data ? data.imageMobile : null;
    const imageUrl = isMobile
      ? imageMobile
        ? imageMobile.imageUrl
        : data.image?.imageMediumLargeUrl || data.image?.imageUrl || "/mock-image.png"
      : data.image?.imageMediumLargeUrl || data.image?.imageUrl || "/mock-image.png";
    const endpoints = href
      ? `${href}/${"slug" in data ? data.slug : data.id}`
      : `/our-community/news/detail/${"slug" in data ? data.slug : data.id}`;
    return (
      <div className="relative h-full w-full rounded-4xl xl:max-h-[450px] xl:max-w-[790px]">
        <div className="group relative mx-auto flex h-[350px] w-full flex-col justify-end overflow-hidden rounded-4xl shadow-lg max-xl:max-w-[790px] md:h-[450px]">
          <Image
            src={imageUrl}
            alt={data.title}
            fill
            priority
            className="object-cover"
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
          />
          <div
            className={cn(
              "bg-secondary-200 absolute top-6 right-7 z-20 rounded-4xl p-4 px-6 py-2 font-mono text-xs tracking-widest text-white uppercase",
              contentClassName,
              haveBadge ? "" : "bg-transparent"
            )}
          >
            {haveBadge && convertDate}
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-[#0A3156]/50 to-[#0A3156]/100 mix-blend-multiply" />
              <div
                className={cn(
                  "absolute inset-0 z-20 flex flex-col justify-end gap-y-4 p-4 text-white",
                  activeCardClassName
                )}
              >
                {haveCategoriesBadge && isNewsGroup && (
                  <div className="relative p-4">
                    <div
                      className={cn(
                        "text-secondary absolute bottom-0 left-0 rounded-4xl bg-white px-6 py-2 font-mono text-xs tracking-widest uppercase",
                        subjectClassName
                      )}
                    >
                      {data.newsType ?? data.badge}
                    </div>
                  </div>
                )}

                <p className={cn("text-[1.75rem]/[2rem] font-semibold", titleClassName)}>{data.title}</p>

                {isNewsGroup ? (
                  <>
                    <div className="hidden md:flex">
                      <div
                        dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(data.description) }}
                        className={cn("relative line-clamp-3 font-mono text-sm", descriptionClassName)}
                      />
                    </div>
                    <div className="flex md:hidden">
                      <div
                        dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(data.descriptionMobile) }}
                        className={cn("relative line-clamp-3 font-mono text-sm")}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className={cn("line-clamp-3 hidden font-mono text-sm md:flex", descriptionClassName)}>
                      {data.description}
                    </p>
                    <p className={cn("line-clamp-3 font-mono text-sm md:hidden")}>
                      {data.descriptionMobile ?? data.description}
                    </p>
                  </>
                )}

                {haveArrowActiveCard && (
                  <div className="hidden lg:block">
                    <div className="absolute top-1/2 left-6 z-20 -translate-y-1/2">
                      <NavigationRoundedButton
                        navigationName={buttonName}
                        direction="prev"
                        onClick={() => handleNavigation("prev")}
                      />
                    </div>
                    <div className="absolute top-1/2 right-6 z-20 -translate-y-1/2">
                      <NavigationRoundedButton
                        navigationName={buttonName}
                        direction="next"
                        onClick={() => handleNavigation("next")}
                      />
                    </div>
                  </div>
                )}

                {haveButtonActiveCard && buttonLabel && (
                  <LinkButton
                    buttonText={buttonLabel}
                    href={endpoints}
                    linkClassName="bg-white text-primary hover:text-white py-2"
                    iconClassName="size-6 p-1 rounded-full text-secondary border-primary group-hover/button:border-white group-hover/button:text-white"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={cn("relative w-full", className)}>
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
        slidesPerView={"auto"}
        centeredSlides={true}
        pagination={{
          el: `.${buttonName}-swiper-custom-pagination`,
          clickable: true,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className={cn(`${carouselName}Swiper`)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: `.${buttonName}-swiper-button-next`,
          prevEl: `.${buttonName}-swiper-button-prev`,
          disabledClass: `${buttonName}-swiper-button-disabled`,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={`${slide.id}-${index}`} className="max-w-[80%] lg:aspect-[790/450] lg:max-w-[790px]">
              {renderCard(slide, index, isMobile, titleClassName, descriptionClassName)}
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={cn("container mx-auto mt-4 flex w-full justify-center gap-2 md:mt-14 lg:gap-8", buttonClassName)}>
        {isRedButton ? (
          <>
            <div className="pt-6">
              <NavigationRoundedButton
                navigationName={buttonName}
                direction="prev"
                onClick={() => handleNavigation("prev")}
              />
            </div>
            <div className="pt-6">
              <NavigationRoundedButton
                navigationName={buttonName}
                direction="next"
                onClick={() => handleNavigation("next")}
              />
            </div>
          </>
        ) : (
          <>
            <div className="relative w-10 md:w-14">
              <div className={`swiper-button ${buttonName}-swiper-button-prev z-10 cursor-pointer`}>
                <CarouselNavigationArrowLeft />
              </div>
            </div>
            <div className={cn(`${buttonName}-swiper-custom-pagination`)} />
            <div className="relative w-10 md:w-14">
              <div className={`swiper-button ${buttonName}-swiper-button-next z-10 cursor-pointer`}>
                <CarouselNavigationArrowRight />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
