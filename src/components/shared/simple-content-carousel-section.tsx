"use client";

import { useSharedSections } from "@/client/contexts/shared-sections-context";
import { cn } from "@/lib/utils";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SwiperOptions } from "swiper/types";
import ContentCarousel from "../carousel/content-carousel";
import { SectionContainer } from "../custom/section-container";

interface Slide {
  id: number;
  badgeLabel?: string;
  subject?: string;
  title: string;
  image: { imageUrl: string };
  buttonLabel: string;
  buttonUrl: string;
}

type SimpleContentCarouselSectionProps = {
  slides?: Slide[] | SectionProfileJson[];
  className?: string;
  carouselName: string;
  buttonName: string;
  breakPoints?: SwiperOptions["breakpoints"];
  isConvertPagination?: boolean;
  sectionContainerClassName?: string;
  sectionClassName?: string;
  isProfile?: boolean;
  contentClassName?: string;
  requirePadding?: boolean;
  hoverCardImageClassName?: string;
  cardClassName?: string;
  isBottomCarousel?: boolean;
  requiredHiddenStrip?: boolean;
  useIsLabTopOffset?: boolean;
  openModal?: (items: any[], index: number) => void;
};

const SimpleContentCarouselSection = ({
  slides,
  breakPoints,
  buttonName,
  carouselName,
  className,
  isConvertPagination,
  sectionContainerClassName,
  sectionClassName,
  isProfile,
  contentClassName,
  openModal,
  requirePadding,
  hoverCardImageClassName,
  cardClassName,
  isBottomCarousel,
  requiredHiddenStrip,
  useIsLabTopOffset,
}: SimpleContentCarouselSectionProps) => {
  const sharedSection = useSharedSections();
  const mainSlides: Slide[] =
    sharedSection?.[0].cards?.map((card) => ({
      id: card.id,
      badgeLabel: card.badge,
      subject: card.subject,
      title: card.title,
      image: { imageUrl: card.image?.imageUrl ?? "" },
      buttonLabel: card.buttonLabel,
      buttonUrl: card.buttonUrl,
    })) || [];

  return (
    <SectionContainer
      sectionClassName={sectionContainerClassName}
      className={cn(isBottomCarousel && "px-0 xl:px-10", sectionClassName)}
    >
      <ContentCarousel
        slides={slides ? slides : mainSlides}
        breakPoints={breakPoints}
        buttonName={buttonName}
        carouselName={carouselName}
        isConvertPaginationIcon={isConvertPagination}
        isProfile={isProfile}
        requiredHiddenStrip={requiredHiddenStrip}
        contentClassName={contentClassName}
        requirePadding={requirePadding}
        isBottomCarousel={isBottomCarousel}
        hoverCardImageClassName={hoverCardImageClassName}
        cardClassName={cardClassName}
        className={className}
        useIsLabTopOffset={useIsLabTopOffset}
        {...(openModal ? { openModal } : {})}
      />
    </SectionContainer>
  );
};
export default SimpleContentCarouselSection;
