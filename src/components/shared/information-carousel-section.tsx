"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/navigation";

import { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PatternStroke1, PatternStroke3 } from "../shapes";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import ASBRibbonText from "../custom/asb-ribbon-text";
import ASBTitle from "../custom/asb-title";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import { SectionContainer } from "../custom/section-container";

type InformationCarouselSectionProps = {
  data: SectionJson;
  descriptionClassname?: string;
  wrapperClassname?: string;
  slideClassname?: string;
  vectorChildren?: ReactNode;
  className?: string;
};

const InformationCarouselSection = ({
  data,
  wrapperClassname,
  slideClassname,
  descriptionClassname,
  vectorChildren,
  className,
}: InformationCarouselSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <SectionContainer
      vectorChildren={
        vectorChildren ? (
          vectorChildren
        ) : (
          <>
            <PatternStroke1 className="absolute top-0 -right-0 h-28 w-28 xl:h-52 xl:w-[400px]" color="white" />
            <PatternStroke3
              className="absolute bottom-0 -left-0 z-10 h-28 w-28 rotate-270 rotate-y-180 lg:-left-16 xl:h-40 xl:w-40"
              color="white"
            />
          </>
        )
      }
      sectionClassName="bg-primary"
      className={className}
    >
      <ASBRibbonText title={data.ribbonText ?? ""} />
      <ASBTitle title={data.title ?? ""} className="max-w-3xl text-start text-white" />
      <div
        className={cn(
          "relative flex flex-col lg:flex-row lg:items-center lg:justify-center lg:pt-10",
          wrapperClassname
        )}
      >
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={60}
          className="w-full"
          autoHeight
          loop
          navigation={{
            nextEl: ".information-carousel-swiper-button-next",
            prevEl: ".information-carousel-swiper-button-prev",
            disabledClass: "information-carousel-swiper-button-disabled",
          }}
        >
          {data.cards &&
            data.cards?.map((slide, idx) => {
              const showBottomCondition =
                (slide.from && slide.to) || (slide.title && slide.badge) || (slide.title && slide.subtitle);

              const primaryUrl = getImageUrl(slide, isMobile);
              const fallbackUrl = slide.image?.imageUrl || "/mock-image.jpg";
              const [imgSrc, setImgSrc] = useState(primaryUrl);

              return (
                <SwiperSlide key={idx} className="h-full">
                  <div
                    className={cn(
                      "flex h-fit w-full flex-col-reverse gap-10 bg-transparent py-10 md:flex-row md:items-center md:justify-center xl:gap-20",
                      slideClassname
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="relative h-64 w-64 rounded-3xl lg:h-72 lg:w-72 xl:h-96 xl:w-96 2xl:h-[30rem] 2xl:w-[30rem]">
                        <Image
                          src={imgSrc}
                          alt=""
                          className="z-10 rounded-3xl object-cover"
                          fill
                          priority
                          onError={() => {
                            if (imgSrc !== fallbackUrl) {
                              console.warn(`Image failed to load: ${imgSrc}, switching to fallback.`);
                              setImgSrc(fallbackUrl);
                            }
                          }}
                        />
                        <div className="absolute top-0 -left-2 h-64 w-64 -rotate-6 rounded-3xl border border-white lg:h-72 lg:w-72 xl:h-96 xl:w-96 2xl:h-[30rem] 2xl:w-[30rem]" />
                      </div>
                    </div>
                    <div className="relative flex flex-col gap-12">
                      <div className="font-mono text-wrap text-white md:w-xs lg:w-xl">
                        <p className={descriptionClassname}>{slide.description}</p>
                        {showBottomCondition && (
                          <div className="flex flex-col gap-3 pt-8">
                            <p className="font-sans text-base/[1.5rem] font-bold">{slide.from || slide.title}</p>
                            <p className="font-mono text-sm/[1.25rem]">{slide.to || slide.badge || slide.subtitle}</p>
                          </div>
                        )}
                      </div>
                      <div className="hidden w-fit lg:block">
                        <div className="flex w-fit gap-4">
                          <NavigationRoundedButton navigationName="information-carousel" direction="prev" />
                          <NavigationRoundedButton navigationName="information-carousel" direction="next" />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <div className="flex w-full justify-center gap-2 lg:hidden">
          <div className="flex gap-4">
            <NavigationRoundedButton navigationName="information-carousel" direction="prev" />
            <NavigationRoundedButton navigationName="information-carousel" direction="next" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default InformationCarouselSection;
