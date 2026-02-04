"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselNavigationArrowLeft, CarouselNavigationArrowRight } from "../icons";

import { getImageUrl } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface ProjectsBasedLearningProjectCarouselProps {
  projects: SectionCardJson[];
}

function Card({ card, isActive, isMobile }: { card: SectionCardJson; isActive: boolean; isMobile: boolean }) {
  const primaryUrl = getImageUrl(card, isMobile);
  const fallbackUrl = card.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <div className="w-[358px] md:w-[487px]">
      <div className={`relative w-full ${isActive ? "aspect-[358/338] lg:aspect-[487/460]" : "aspect-[387/276]"}`}>
        <Image
          src={imgSrc}
          alt={`slide-${card.id}-img`}
          fill
          priority
          className="rounded-4xl object-cover"
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
      </div>
      <div className="flex flex-col gap-2 p-8">
        <Badge className="bg-secondary-200 rounded-full px-3 py-1.5 font-mono tracking-widest text-white uppercase">
          {card.badge}
        </Badge>
        <p className="text-primary-400 text-[1.375rem]/[2rem] font-semibold">{card.title}</p>
        {isActive && <p className="text-primary-400 font-mono text-sm/[1.25rem]">{card.description}</p>}
      </div>
    </div>
  );
}

export default function ProjectsBasedLearningProjectCarousel({ projects }: ProjectsBasedLearningProjectCarouselProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const paginationRef = useRef<HTMLDivElement>(null);

  let formattedCards: SectionCardJson[] = [];
  if (projects.length < 8) {
    while (formattedCards.length < 8) {
      formattedCards = formattedCards.concat(projects);
    }
    formattedCards = formattedCards.slice(0, 8);
  } else {
    formattedCards = [...projects];
  }

  useEffect(() => {
    const paginationEl = paginationRef.current;
    if (!paginationEl) return;

    const bullets = [...paginationEl.children] as HTMLElement[];
    const bulletWidth = bullets[0]?.offsetWidth + 16;
    const totalBullets = bullets.length;
    const visibleCount = 5;
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
    <div className="relative flex min-h-[300px] w-full">
      <Swiper
        className="w-full"
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        loop
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        slidesPerView={"auto"}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        pagination={{
          el: ".swiper-custom-pagination",
          clickable: true,
        }}
        lazyPreloadPrevNext={5}
        style={{ overflow: "visible", marginRight: "0", marginLeft: "0" }}
        spaceBetween={16}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {formattedCards.map((project, index) => (
          <SwiperSlide key={index} style={{ width: "fit-content" }}>
            <Card card={project} isActive={index === activeIndex} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 flex w-full">
        <div className="w-96 max-xl:hidden" />
        <div className="flex w-full grow flex-col justify-end p-8 max-xl:translate-y-24 lg:w-80">
          <hr className="border-neutral-200 max-xl:hidden" />

          {/* Pagination */}
          <div className="container mx-auto my-4 flex w-full justify-center gap-2">
            <div className="relative w-10 lg:w-14">
              <div className="swiper-button image-swiper-button-prev">
                <CarouselNavigationArrowLeft />
              </div>
            </div>

            {/* Paginates offset */}
            <div className="relative w-[min(100%,300px)] overflow-hidden lg:w-[min(100%,400px)]">
              <div ref={paginationRef} className="swiper-custom-pagination flex transition-transform duration-300" />
            </div>

            <div className="relative w-10 lg:w-14">
              <div className="swiper-button image-swiper-button-next">
                <CarouselNavigationArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-10 -translate-x-full bg-white" />
    </div>
  );
}
