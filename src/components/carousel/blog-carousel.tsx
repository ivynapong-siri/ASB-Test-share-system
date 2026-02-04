"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import BlogCard from "../custom/cards/blog-card";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SwiperOptions } from "swiper/types";
import { cn } from "@/lib/utils";
import { getFormatCardDate } from "@/server/utils/helpers";
import { slideBlogBreakPoints } from "@/client/configs/slide-carousel-config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";

interface BlogCarouselProps {
  blogData: SectionCardJson[];
  ref?: RefObject<SwiperRef | null>;
  classNameCard?: string;
  classNameTitle?: string;
  classNameContent?: string;
  classNameCardHeader?: string;
  classNameFooter?: string;
  customBreakPoint?: SwiperOptions["breakpoints"];
  hiddenNavigate?: boolean;
  isBadgeDate?: boolean;
  badgeOnImage?: boolean;
  classNameCardBody?: string;
  wrapSwiperClassName?: string;
}

export default function BlogCarousel({
  blogData,
  classNameCard,
  classNameCardHeader,
  classNameContent,
  classNameFooter,
  classNameTitle,
  classNameCardBody,
  customBreakPoint,
  hiddenNavigate,
  isBadgeDate,
  wrapSwiperClassName,
  ref,
}: BlogCarouselProps) {
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const cardRef = useRef<(HTMLDivElement | null)[]>([]);
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);

  const [maxTitleHeight, setMaxTitleHeight] = useState<number>(0);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useLayoutEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (cardRef.current.length > 0) {
        const heights = cardRef.current.map((el) => el?.offsetHeight || 0);
        setMaxCardHeight(Math.max(...heights));
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [blogData]);

  useEffect(() => {
    if (titleRefs.current.length > 0) {
      const heights = titleRefs.current.map((el) => el?.offsetHeight || 0);
      setMaxTitleHeight(Math.max(...heights));
    }
  }, [blogData]);

  const renderBlog = (data: SectionCardJson, index: number) => {
    const convertDate = data.date ? getFormatCardDate(data.date) : data.from ? getFormatCardDate(data.from) : "-";

    const imageUrl =
      (isMobile ? data.imageMobile?.imageUrl : data.image?.imageMediumLargeUrl) ||
      data.image?.imageUrl ||
      "/mock-image.jpg";
    return (
      <BlogCard
        key={data.id}
        title={data.title}
        badgeOnImage={(data as any).badgeOnImageText || data.badge}
        badgeOnImageText={(data as any).badgeOnImageText || data?.badge}
        content={data.description}
        dateTag={(data as any).experience}
        badgeDate={convertDate}
        isBadgeDate={isBadgeDate}
        imgSrc={imageUrl}
        learnMoreHref={data.buttonUrl}
        buttonText={data.buttonLabel}
        classNameCard={cn("h-full border-none bg-white", classNameCard)}
        classNameTitle={cn("w-full text-xl md:max-w-[480px] lg:text-[28px]", classNameTitle)}
        classNameContent={cn("grow px-5 lg:px-14", classNameContent)}
        classNameCardHeader={cn("px-5 pt-8 lg:px-14 lg:pt-12", classNameCardHeader)}
        classNameFooter={cn("px-5 pb-5 lg:px-14 lg:pb-12", classNameFooter)}
        classNameCardBody={cn("min-h-auto grow", classNameCardBody)}
        classNameImg="max-md:max-h-[243px]"
        cardRef={(el) => (cardRef.current[index] = el)}
        maxCardHeight={maxCardHeight}
        titleRef={(el) => (titleRefs.current[index] = el)}
        maxTitleHeight={maxTitleHeight}
      />
    );
  };

  return (
    <div className={cn("relative flex w-full flex-col", wrapSwiperClassName)}>
      <Swiper
        ref={ref}
        spaceBetween={16}
        breakpoints={customBreakPoint || slideBlogBreakPoints}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        pagination={{
          el: ".blog-swiper-custom-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".blog-swiper-button-next",
          prevEl: ".blog-swiper-button-prev",
          disabledClass: "blog-swiper-button-disabled",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className="blogSwiper flex h-full w-full flex-col xl:flex-row"
        slidesOffsetBefore={isTablet ? 40 : 0}
        slidesOffsetAfter={isTablet ? 40 : 0}
      >
        {blogData.map((data, index) => (
          <SwiperSlide
            key={data.id}
            className="flex h-full w-full flex-col xl:flex-row"
            style={{ width: "fit-content", minHeight: maxCardHeight || "auto" }}
          >
            {renderBlog(data, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {!hiddenNavigate && (
        <div className="container mx-auto my-10 flex w-full justify-center gap-2 lg:gap-8">
          <div className="relative w-8">
            <div className="swiper-button blog-swiper-button-prev">
              <CarouselNavigationArrowLeft />
            </div>
          </div>
          <div className="blog-swiper-custom-pagination" />
          <div className="relative w-8">
            <div className="swiper-button blog-swiper-button-next">
              <CarouselNavigationArrowRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
