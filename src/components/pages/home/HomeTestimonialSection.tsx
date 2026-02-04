"use client";

import { slideTestimonialsBreakPoints } from "@/client/configs/slide-carousel-config";
import { PatternStroke3 } from "@/components/shapes";
import HoverCardWithFilterSection from "@/components/shared/hover-card-with-filter-section";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface HomeTestimonialSectionProps {
  testimonialData: SectionWithTabJson;
}

const renderVectors = () => (
  <>
    <PatternStroke3 className="absolute top-1/4 -left-10 h-18 w-40 rotate-60 lg:bottom-2/5" />
    <PatternStroke3 className="absolute top-16 -right-10 h-18 w-28" />
  </>
);

const HomeTestimonialSection = ({ testimonialData }: HomeTestimonialSectionProps) => {
  return (
    <HoverCardWithFilterSection
      vectorChildren={renderVectors()}
      data={testimonialData}
      mainTitleClassName="lg:pt-6 lg:pb-6 lg:pb-8"
      mainDescriptionClassName="lg:max-w-[460px] 2xl:pr-0 xl:pr-0 lg:pb-0 pt-0"
      groupCardsNumber={2}
      isProfile
      requiredGroupCards
      breakpoints={slideTestimonialsBreakPoints}
      className="max-lg:px-10"
      customMinusTopOffset={0}
    />
  );
};

export default HomeTestimonialSection;
