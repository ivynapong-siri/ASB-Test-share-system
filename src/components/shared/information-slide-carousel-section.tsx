"use client";

import "@/client/styles/slide-carousel.css";
import "swiper/css";
import "swiper/css/pagination";

import { SectionCardJson } from "@/server/serializers/card-serializer";
import IconCardCarousel from "../carousel/icon-card-carousel";

interface InformationSlideCarouselSectionProps {
  title: string;
  description: string;
  slides: SectionCardJson[];
  className?: string;
}

export default function InformationSlideCarouselSection({
  slides,
  title,
  description,
  className,
}: InformationSlideCarouselSectionProps) {
  return <IconCardCarousel slides={slides} description={description} title={title} className={className} />;
}
