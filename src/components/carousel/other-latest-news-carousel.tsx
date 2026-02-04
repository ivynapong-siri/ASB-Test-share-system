"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useLayoutEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { otherLatestNewsBreakPoints } from "@/client/configs/slide-carousel-config";
import { cn } from "@/lib/utils";
import { NewsGroupDetailJson } from "@/server/serializers/news-group-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";
import { motion } from "framer-motion";
import ASBRibbonText from "../custom/asb-ribbon-text";
import ASBTitle from "../custom/asb-title";
import LinkButton from "../custom/buttons/link-button";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import NewsCard from "../custom/cards/news-card";

interface OtherLatestNewsCarouselProps {
  cardData: NewsGroupDetailJson[];
  title?: string;
  buttonName?: string;
  buttonLabel: string;
  buttonUrl?: string;
  hiddenNavigate?: boolean;
  groupedCardsChunkArrayIndex?: number;
  cardClassName?: string;
  viewMoreButtonLabel?: string;
  viewMoreButtonUrl?: string;
  description?: string;
  ribbonLabel?: string;
  variant?: "primary" | "secondary";
  className?: string;
  isMobile?: boolean;
  titleClassName?: string;
  requiredPadding?: boolean;
  textBoxClassName?: string;
}

const RenderCard = ({
  buttonLabel,
  data,
  cardClassName,
  titleClassName,
  cardRef,
  maxCardHeight,
}: {
  data: NewsGroupDetailJson;
  buttonLabel: string;
  cardClassName?: string;
  titleClassName?: string;
  cardRef?: (el: HTMLHeadingElement | null) => void;
  maxCardHeight?: number;
}) => {
  const convertDate = data.date && data.date != "" ? getFormatCardDate(data.date) : "";
  const endpoint = `/our-community/news/detail/${data.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full"
    >
      <NewsCard
        cardRef={cardRef}
        maxCardHeight={maxCardHeight}
        key={data.id}
        title={data.title}
        dateTag={convertDate}
        badgeOnImage={data.badge ? true : false}
        badgeOnImageText={data.badge}
        buttonText={buttonLabel}
        content={data.description}
        contentMobile={data.descriptionMobile}
        imgSrc={data.image?.imageMediumLargeUrl || data.image?.imageUrl || "/mock-image.jpg"}
        learnMoreHref={endpoint}
        className="min-h-[680px]"
        cardClassName={cardClassName}
        imageClassName="min-h-[369px]"
        titleClassName={titleClassName}
      />
    </motion.div>
  );
};

export default function OtherLatestNewsCarousel({
  cardData,
  buttonName,
  buttonLabel,
  buttonUrl,
  title,
  cardClassName,
  viewMoreButtonLabel,
  viewMoreButtonUrl,
  description,
  ribbonLabel,
  variant = "primary",
  isMobile,
  className,
  titleClassName,
  requiredPadding,
  textBoxClassName,
}: OtherLatestNewsCarouselProps) {
  const swiperRef = useRef<SwiperRef>(null);
  const cardRef = useRef<(HTMLDivElement | null)[]>([]);

  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (cardRef.current.length > 0) {
        const heights = cardRef.current.map((el) => el?.offsetHeight || 0);
        setMaxCardHeight(Math.max(...heights));
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [cardData]);

  function handleNavigate(direction: "next" | "prev") {
    if (swiperRef.current) {
      if (direction === "next") swiperRef.current.swiper.slideNext();
      else swiperRef.current.swiper.slidePrev();
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="mb-16 flex h-full w-full flex-row items-center justify-between">
        <div
          className={cn(
            "flex w-full flex-col justify-center",
            ribbonLabel && description ? "items-center" : "items-start",
            isMobile && requiredPadding && "max-xl:px-10",
            textBoxClassName
          )}
        >
          {ribbonLabel && <ASBRibbonText title={ribbonLabel} className="translate-x-8" />}
          {title && <ASBTitle title={title} className={cn("text-start", description && "text-center")} />}
          {description && (
            <p className="w-full pt-7 text-center font-mono text-base/[1.625rem] text-neutral-400 md:w-[590px]">
              {description}
            </p>
          )}
        </div>
        {variant == "primary" && (
          <div className={cn("flex h-full w-auto flex-row gap-2 max-md:hidden", isMobile && "max-xl:px-10")}>
            <NavigationRoundedButton
              onClick={() => {
                handleNavigate("prev");
              }}
              navigationName={buttonName ?? ""}
              direction="prev"
            />
            <NavigationRoundedButton
              onClick={() => {
                handleNavigate("next");
              }}
              navigationName={buttonName ?? ""}
              direction="next"
            />
          </div>
        )}
      </div>

      <Swiper
        ref={swiperRef}
        virtual={!isMobile}
        spaceBetween={16}
        breakpoints={otherLatestNewsBreakPoints}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        pagination={{
          el: `.${buttonName}-swiper-custom-pagination`,
          clickable: true,
        }}
        navigation={{
          nextEl: `.${buttonName}-swiper-button-next`,
          prevEl: `.${buttonName}-swiper-button-prev`,
          disabledClass: `${buttonName}-swiper-button-disabled`,
        }}
        lazyPreloadPrevNext={9}
        loop={isMobile}
        modules={[Pagination, Navigation, Virtual, Autoplay]}
        className={`${buttonName}Swiper flex h-full w-full`}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {cardData.map((e, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full">
              <RenderCard
                key={e.id}
                data={e}
                cardRef={(el) => (cardRef.current[index] = el)}
                maxCardHeight={maxCardHeight}
                buttonLabel={viewMoreButtonLabel ?? "Read more"}
                cardClassName={cardClassName}
                titleClassName={titleClassName}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex w-full flex-col gap-8 pt-8 md:flex-row">
        <div
          className={cn(
            "flex h-12 w-full flex-row items-center gap-2",
            variant == "primary" ? "md:hidden" : "justify-center md:justify-start",
            textBoxClassName
          )}
        >
          <NavigationRoundedButton
            onClick={() => {
              handleNavigate("prev");
            }}
            navigationName={buttonName ?? ""}
            direction="prev"
          />
          <NavigationRoundedButton
            onClick={() => {
              handleNavigate("next");
            }}
            navigationName={buttonName ?? ""}
            direction="next"
          />
        </div>
        {buttonLabel && buttonUrl && (
          <div className={cn("flex justify-center md:justify-end", isMobile && requiredPadding && "pr-10")}>
            <LinkButton buttonText={buttonLabel} href={buttonUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
