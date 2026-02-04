"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { duplicateCardIndexId } from "@/client/utils/helper";
import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SwiperOptions } from "swiper/types";
import LinkButton from "../custom/buttons/link-button";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import ActiveCard from "../custom/cards/active-card";

interface ActiveCarouselProps {
  slides: SectionCardJson[];
  cardClassName?: string;
  inActiveSlideClassName?: string;
  breakPoints?: SwiperOptions["breakpoints"];
  activeLinkClassName?: string;
  onClick?: () => void;
  modalPopup?: ReactNode;
  isModalOpen?: boolean;
  activeIndex: number;
  wrapperClass?: string;
  curveColor?: string;
  useSubtitle?: boolean;
  inActiveSlideTextClassName?: string;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  paddingLeft?: number;
  requiredInactiveBottomCard?: boolean;
  whiteBoxPosition?: string;
  cardPosition?: string;
}

const ActiveSlide = ({
  slide,
  cardClassName,
  onClick,
  activeLinkClassName,
  modalPopup,
  curveColor: curveClassName,
  useSubtitle,
  swiperRef,
}: {
  slide: SectionCardJson;
  cardClassName?: string;
  activeLinkClassName?: string;
  onClick?: () => void;
  modalPopup?: ReactNode;
  curveColor?: string;
  useSubtitle?: boolean;
  swiperRef: RefObject<SwiperRef | null>;
}) => {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? slide.imageMobile?.imageUrl : slide.image?.imageMediumLargeUrl) || slide.image?.imageUrl || "";

  return (
    <ActiveCard
      onClick={onClick}
      curveColor={curveClassName}
      cardClassName={cardClassName}
      image={imageUrl}
      contentChildren={
        <div className="flex flex-col gap-4 px-5 pb-4">
          <h6 className="text-[1.25rem]/[1.625rem] font-semibold text-white xl:text-[1.75rem]/[2rem]">{slide.title}</h6>
          <p className="line-clamp-3 font-mono text-[0.875rem]/[1.25rem] font-light">
            {useSubtitle ? slide.subtitle : slide.description}
          </p>
        </div>
      }
      buttonChildren={
        slide.buttonLabel &&
        slide.buttonUrl && (
          <LinkButton
            linkClassName={cn(
              "text-primary-400 w-56 bg-white px-6 py-2 font-mono text-xs tracking-widest uppercase transition duration-300 hover:text-white lg:w-[320px] lg:px-6",
              activeLinkClassName
            )}
            onClick={(e) => {
              if (!slide.buttonUrl) {
                e?.preventDefault();
              }

              if (slide.buttonUrl == "#" && onClick) {
                e?.preventDefault();
                onClick();
              }
            }}
            buttonText={slide.buttonLabel ?? "Apply Now"}
            href={modalPopup ? "" : slide.buttonUrl}
            size="default"
            iconClassName="size-6 p-1 duration-100 border-primary text-secondary-200 group-hover/button:border-white group-hover/button:text-white"
          />
        )
      }
    >
      <div className="z-10 flex flex-col items-end pl-3">
        <div className="flex gap-2">
          <NavigationRoundedButton
            navigationName="active"
            direction="prev"
            onClick={(e) => {
              if (modalPopup) e.stopPropagation();
              swiperRef.current?.swiper.slidePrev();
            }}
          />
          <NavigationRoundedButton
            navigationName="active"
            direction="next"
            onClick={(e) => {
              if (modalPopup) e.stopPropagation();
              swiperRef.current?.swiper.slideNext();
            }}
          />
        </div>
      </div>
    </ActiveCard>
  );
};

const InactiveSlide = ({
  slide,
  inActiveSlideClassName,
  modalPopup,
  inActiveSlideTextClassName,
}: {
  slide: SectionCardJson;
  inActiveSlideClassName?: string;
  inActiveSlideTextClassName?: string;
  modalPopup?: ReactNode;
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? slide.imageMobile?.imageUrl : slide.image?.imageMediumLargeUrl) || slide.image?.imageUrl || "";
  return (
    <div
      className="relative h-fit w-full min-w-[211px] hover:cursor-pointer lg:min-w-[290px]"
      onClick={() => (modalPopup ? "#" : router.push(slide.buttonUrl))}
    >
      <div
        className={cn(
          "relative h-[273px] w-full overflow-hidden rounded-4xl lg:h-[370px] lg:max-h-[370px] lg:w-[290px]",
          inActiveSlideClassName
        )}
      >
        <Image src={imageUrl} alt="Active Card" className="object-cover" fill priority />
        <div className="via-primary/30 to-primary absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent" />
      </div>
      <div className={cn("absolute bottom-4 left-0 w-fit px-4 text-white", inActiveSlideTextClassName)}>
        <h3 className="text-lg font-bold text-white lg:text-xl">{slide.title}</h3>
      </div>
    </div>
  );
};

interface ActiveDuplicateCardJson extends SectionCardJson {
  subId?: number;
}

export default function ActiveCarousel({
  slides,
  cardClassName,
  inActiveSlideClassName,
  breakPoints,
  onClick,
  activeLinkClassName,
  modalPopup,
  isModalOpen,
  wrapperClass,
  curveColor: curveClassName,
  useSubtitle,
  inActiveSlideTextClassName,
  setActiveIndex,
  activeIndex,
  paddingLeft,
  requiredInactiveBottomCard = true,
  whiteBoxPosition,
  cardPosition,
}: ActiveCarouselProps) {
  const formattedSlides: ActiveDuplicateCardJson[] = duplicateCardIndexId(slides);
  const isMobile = useIsMobile();
  const isLaptop = useIsLaptop();
  const swiperRef = useRef<SwiperRef>(null);

  const handleNavigation = (direction: "next" | "prev") => {
    if (!swiperRef.current) return;

    if (direction === "next") {
      swiperRef.current.swiper.slideNext();
    } else {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;

    // Update swiper when layout changes
    swiper.update();

    // --- Autoplay hover / swipe control ---
    const handleMouseEnter = () => swiper.autoplay.stop();
    const handleMouseLeave = () => swiper.autoplay.start();
    const handleTouchStart = () => swiper.autoplay.stop();
    const handleTouchEnd = () => swiper.autoplay.start();

    const container = swiper.el; // swiper root element

    // Attach listeners
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [paddingLeft, isMobile]);

  return (
    <div className="relative max-w-full">
      <div
        className="relative flex h-[432px] min-w-screen overflow-x-visible xl:h-[590px]"
        style={{ width: `calc(100vw - ${paddingLeft}px)` }}
      >
        <div
          className={cn(
            "absolute left-0 z-10 block h-[432px] bg-white sm:hidden lg:h-[590px] xl:block",
            whiteBoxPosition
          )}
          style={{ width: isMobile && paddingLeft ? paddingLeft - 4 : paddingLeft }}
        />
        <Swiper
          ref={swiperRef}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          onSlideChangeTransitionEnd={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={breakPoints}
          spaceBetween={16}
          slidesPerView={"auto"}
          loop={true}
          navigation={{
            nextEl: ".active-swiper-button-next",
            prevEl: ".active-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          onAutoplayPause={(swiper) => {
            swiper.autoplay.start();
          }}
          wrapperClass={wrapperClass}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={isLaptop}
          modules={[Navigation, Autoplay]}
          className="activeSwiper flex w-full min-w-screen"
          slidesOffsetBefore={!isLaptop ? (paddingLeft ?? 0) : 4}
        >
          {formattedSlides.map((slide, index) => {
            return (
              <SwiperSlide key={`${slide.id}-${index}`} className={cn("!w-auto")}>
                {({ isActive }) => {
                  return (
                    <div
                      className={cn(
                        "z-10 flex h-full max-h-[432px] w-full max-w-[358px] transition-all duration-500 ease-in-out lg:max-h-[590px] lg:max-w-[470px]",
                        requiredInactiveBottomCard && "items-end",
                        "max-xl:items-end",
                        cardPosition
                      )}
                    >
                      {isActive ? (
                        <ActiveSlide
                          swiperRef={swiperRef}
                          slide={slide}
                          cardClassName={cardClassName}
                          activeLinkClassName={activeLinkClassName}
                          onClick={onClick}
                          modalPopup={modalPopup}
                          curveColor={curveClassName}
                          useSubtitle={useSubtitle}
                        />
                      ) : (
                        <InactiveSlide
                          slide={slide}
                          inActiveSlideClassName={inActiveSlideClassName}
                          modalPopup={modalPopup}
                          inActiveSlideTextClassName={inActiveSlideTextClassName}
                        />
                      )}
                    </div>
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {isModalOpen && modalPopup}

      <div className="container mx-auto my-10 flex w-full justify-center gap-2 xl:hidden">
        <div className="flex gap-2">
          <NavigationRoundedButton navigationName="active" direction="prev" onClick={() => handleNavigation("prev")} />
          <NavigationRoundedButton navigationName="active" direction="next" onClick={() => handleNavigation("next")} />
        </div>
      </div>
    </div>
  );
}
