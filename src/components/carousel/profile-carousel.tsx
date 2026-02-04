"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { chunkArray, getImageUrl, isSectionProfileJson } from "@/client/utils/helper";
import { ReactNode, useState } from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { slideEducatorsBreakPoints } from "@/client/configs/slide-carousel-config";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn } from "@/lib/utils";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { motion } from "framer-motion";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";
import { NavigationRoundedButton } from "../custom/buttons/navigation-rounded-button";
import HoverCard from "../custom/cards/hover-card";

function RenderProfileCardItem({
  data,
  profileCardData,
  badgeLabel,
  isMobile,
  openModal,
  index,
  className,
  isProfile,
}: {
  data: SectionProfileJson;
  profileCardData: SectionProfileJson[];
  badgeLabel: string;
  isMobile: boolean;
  openModal?: (items: SectionProfileJson[], index: number) => void;
  index: number;
  isProfile?: boolean;
  className?: string;
}) {
  const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");

  const primaryUrl = getImageUrl(data, isMobile);
  const fallbackUrl = data.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <HoverCard
        key={`Profile-${data.id}`}
        title={fullName}
        personPosition={data.position}
        contentTitle={data.middleName}
        description={data.about}
        badgeLabel={badgeLabel}
        buttonLabel={data.buttonLabel}
        buttonLink={openModal ? "#" : data.buttonUrl}
        linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white"
        iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white"
        backgroundContent={
          <Image
            key={`Profile-Image-${data.id}`}
            alt={imgSrc}
            src={imgSrc}
            fill
            priority
            className="rounded-4xl object-cover transition-all duration-300 ease-out group-hover:scale-120"
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
            onError={() => {
              if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
            }}
          />
        }
        className={className}
        isHover={false}
        contentClassName="min-w-0"
        isProfile={isProfile}
        {...(openModal && { buttonAction: () => openModal(profileCardData as SectionProfileJson[], index) })}
      />
    </motion.div>
  );
}

function RenderHoverCardItem({
  data,
  badgeLabel,
  isMobile,
}: {
  data: SectionCardJson;
  badgeLabel: string;
  isMobile: boolean;
}) {
  const primaryUrl = getImageUrl(data, isMobile);
  const fallbackUrl = data.image?.imageUrl || "/mock-image.jpg";
  const [imgSrc, setImgSrc] = useState(primaryUrl);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <HoverCard
        key={`Hover-${data.id}`}
        title={data.title}
        contentTitle={data.subject}
        description={data.description}
        badgeLabel={badgeLabel}
        backgroundContent={
          <Image
            key={`Hover-Image-${data.id}`}
            alt=""
            src={imgSrc}
            fill
            priority
            className="rounded-4xl object-cover transition-all duration-300 ease-out group-hover:scale-120"
            onError={() => {
              if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
            }}
          />
        }
        contentClassName="min-w-0"
        className="w-full"
      />
    </motion.div>
  );
}

interface HoverCardCarouselProps {
  profileCardData: SectionProfileJson[] | SectionCardJson[];
  badgeLabel: string;
  className?: string;
  filterContent?: ReactNode;
  isProfile?: boolean;
  breakpoints?: SwiperOptions["breakpoints"];
  openModal?: (items: SectionProfileJson[], index: number) => void;
  requiredPadding?: boolean;
  groupCardsNumber?: number;
  requiredGroupCards?: boolean;
  groupButtonClassName?: string;
}

export default function ProfileCardCarousel({
  profileCardData,
  badgeLabel,
  className,
  filterContent,
  isProfile = false,
  breakpoints,
  openModal,
  requiredPadding,
  groupCardsNumber = 3,
  requiredGroupCards,
  groupButtonClassName,
}: HoverCardCarouselProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const groupedCards = chunkArray<SectionProfileJson | SectionCardJson>(profileCardData, groupCardsNumber);

  return (
    <div className="relative w-full">
      <div className="my-10 flex w-full flex-row items-center justify-between">
        {filterContent}

        <div className="z-10 container mx-auto hidden justify-end gap-2 md:flex">
          <div className="hidden gap-4 lg:flex">
            <NavigationRoundedButton navigationName="profile-card" direction="prev" />
            <NavigationRoundedButton navigationName="profile-card" direction="next" />
          </div>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.pagination) {
              swiper.pagination.render();
              swiper.pagination.update();
            }
          }, 0);
        }}
        breakpoints={breakpoints ? breakpoints : slideEducatorsBreakPoints}
        navigation={{
          nextEl: ".profile-card-swiper-button-next",
          prevEl: ".profile-card-swiper-button-prev",
          disabledClass: "profile-card-swiper-button-disabled",
        }}
        autoHeight={isMobile}
        modules={[Grid, Pagination, Navigation]}
        slidesOffsetBefore={isTablet && requiredPadding ? 40 : 0}
        slidesOffsetAfter={isTablet && requiredPadding ? 40 : 0}
        className="hoverCardSwiper"
      >
        {isMobile
          ? requiredGroupCards
            ? groupedCards.map((data, index) => (
                <SwiperSlide key={index}>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                    {data.map((e) =>
                      isSectionProfileJson(e) ? (
                        <RenderProfileCardItem
                          data={e}
                          profileCardData={profileCardData as SectionProfileJson[]}
                          openModal={openModal}
                          index={index}
                          className={className}
                          badgeLabel={badgeLabel}
                          isMobile={isMobile}
                          isProfile={isProfile}
                        />
                      ) : (
                        <RenderHoverCardItem badgeLabel={badgeLabel} data={e} isMobile />
                      )
                    )}
                  </div>
                </SwiperSlide>
              ))
            : profileCardData.map((data, index) => (
                <SwiperSlide key={data.id}>
                  {isSectionProfileJson(data) ? (
                    <RenderProfileCardItem
                      data={data}
                      profileCardData={profileCardData as SectionProfileJson[]}
                      openModal={openModal}
                      index={index}
                      className={className}
                      badgeLabel={badgeLabel}
                      isMobile={isMobile}
                      isProfile={isProfile}
                    />
                  ) : (
                    <RenderHoverCardItem badgeLabel={badgeLabel} data={data} isMobile />
                  )}
                </SwiperSlide>
              ))
          : profileCardData.map((data, index) => (
              <SwiperSlide key={data.id}>
                {isSectionProfileJson(data) ? (
                  <RenderProfileCardItem
                    data={data}
                    profileCardData={profileCardData as SectionProfileJson[]}
                    openModal={openModal}
                    index={index}
                    className={className}
                    badgeLabel={badgeLabel}
                    isMobile={isMobile}
                    isProfile={isProfile}
                  />
                ) : (
                  <RenderHoverCardItem badgeLabel={badgeLabel} data={data} isMobile />
                )}
              </SwiperSlide>
            ))}
      </Swiper>

      <div
        className={cn("z-10 container mx-auto my-5 flex w-full justify-center gap-2 lg:hidden", groupButtonClassName)}
      >
        <div className="flex gap-4">
          <NavigationRoundedButton navigationName="profile-card" direction="prev" />
          <NavigationRoundedButton navigationName="profile-card" direction="next" />
        </div>
      </div>
    </div>
  );
}
