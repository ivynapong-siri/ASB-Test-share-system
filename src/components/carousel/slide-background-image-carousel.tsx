"use client";

import "swiper/css";

import { ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import ASBRibbonText from "../custom/asb-ribbon-text";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import { SectionContainer } from "../custom/section-container";

interface SlideBackgroundImageCarouselProps<T extends SectionCardJson> {
  title?: string;
  titleLine1?: string;
  titleLine2?: string;
  slides: T[];
  ribbonText: string;
  descriptionComponent: ComponentType<T>;
  children?: ReactNode;
  className?: string;
  descriptionClassName?: string;
  headerClassName?: string;
  vectorPosition?: "left" | "right";
  buttonClassName?: string;
  mainTitleClassName?: string;
}

export default function SlideBackgroundImageCarousel<T extends SectionCardJson>({
  title,
  titleLine1,
  titleLine2,
  slides,
  ribbonText,
  descriptionComponent: DescriptionComponent,
  children,
  className,
  descriptionClassName,
  headerClassName,
  vectorPosition,
  buttonClassName,
  mainTitleClassName,
}: SlideBackgroundImageCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgRef = useRef<SwiperRef | null>(null);

  const [fade, setFade] = useState(true);
  const isMobile = useIsMobile();
  useEffect(() => {
    const swiper = bgRef.current?.swiper;
    if (!swiper) return;

    const handleSlideChange = () => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(swiper.realIndex);
        setFade(true);
      }, 300);
    };

    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, []);

  const handleNavigation = (direction: "prev" | "next") => {
    if (bgRef.current) {
      direction === "prev" ? bgRef.current.swiper.slidePrev() : bgRef.current.swiper.slideNext();
    }
  };

  return (
    <SectionContainer className={className} sectionClassName="bg-black">
      {vectorPosition === "left" ? (
        <>
          <ASBRibbonText className="relative z-10 md:hidden" title={ribbonText} vectorPosition={"right"} />
          <ASBRibbonText
            className="relative z-10 max-md:hidden"
            imageClassName="rotate-y-180"
            title={ribbonText}
            vectorPosition={vectorPosition}
          />
        </>
      ) : (
        <ASBRibbonText className="relative z-10" title={ribbonText} vectorPosition={vectorPosition} />
      )}

      <h1
        className={cn(
          "z-10 w-full text-[2rem]/[2rem] text-white md:text-end md:text-[3.875rem]/[4.375rem]",
          mainTitleClassName
        )}
      >
        {title ? (
          <span className={cn("inline-block font-semibold text-white", headerClassName)}>{title}</span>
        ) : (
          <div className={cn("flex w-full flex-col items-end justify-end text-end", mainTitleClassName)}>
            <h2 className={cn("inline-block font-semibold text-white", headerClassName)}>{titleLine1}</h2>
            <h2 className={cn("inline-block font-semibold text-white", headerClassName)}>{titleLine2}</h2>
          </div>
        )}
      </h1>

      <div
        className={cn(
          "relative z-10 my-8 flex w-full items-center justify-between gap-8 max-md:flex-col md:my-24",
          buttonClassName
        )}
      >
        <div className="max-md:hidden">
          {slides.length > 1 && (
            <NavigationRoundedButton
              navigationName="sport-opportunities"
              direction="prev"
              onClick={() => handleNavigation("prev")}
            />
          )}
        </div>

        <div
          className={cn(
            "w-full max-w-6xl transition-opacity ease-in-out md:w-4xl 2xl:w-6xl",
            fade ? "opacity-100" : "opacity-0",
            descriptionClassName
          )}
        >
          <DescriptionComponent {...slides[currentIndex]} />
        </div>

        <div className="max-md:hidden">
          {slides.length > 1 && (
            <NavigationRoundedButton
              navigationName="sport-opportunities"
              direction="next"
              onClick={() => handleNavigation("next")}
            />
          )}
        </div>

        {slides.length > 1 && (
          <div className={cn("flex flex-row gap-4 md:hidden lg:gap-8", buttonClassName)}>
            <NavigationRoundedButton
              navigationName="sport-opportunities"
              direction="prev"
              onClick={() => handleNavigation("prev")}
            />
            <NavigationRoundedButton
              navigationName="sport-opportunities"
              direction="next"
              onClick={() => handleNavigation("next")}
            />
          </div>
        )}
      </div>

      <div className="absolute inset-0 top-0 left-0">
        <div className="relative h-full w-full">
          <Swiper
            ref={bgRef}
            className="h-full w-full"
            loop
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.realIndex);
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {slides.map((slide, inx) => {
              const primaryUrl = getImageUrl(slide, isMobile);
              const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
              const [imgSrc, setImgSrc] = useState(primaryUrl);

              return (
                <SwiperSlide key={`bg-image-${slide.id}-${inx}`}>
                  <Image
                    src={imgSrc}
                    alt={`bg-image-${slide.id}-${inx}`}
                    fill
                    priority
                    className="object-cover opacity-25"
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
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {children && <div className="relative z-10 flex w-full justify-center">{children}</div>}
    </SectionContainer>
  );
}
