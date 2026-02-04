"use client";

import { AlarmClockIcon, CalendarIcon, KnotIcon, SchoolBusIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";

import SlideCarousel from "@/components/carousel/slide-carousel";
import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SchoolBusServiceIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const SchoolBusServiceIntroSection = ({ data, breadcrumbData }: SchoolBusServiceIntroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionMarginLeft, setSectionMarginLeft] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSectionMarginLeft(rect.left + 40);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      if (sectionRef.current) {
        setSectionMarginLeft(sectionRef.current.getBoundingClientRect().left + 40);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <IntroSection
        sectionRef={sectionRef}
        breadcrumbClickable={true}
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
        title={data.title}
        description={data.description}
        ribbonText={data.ribbonText}
        imageSrc={data.image?.imageUrl ?? ""}
        vectorChildren={
          <PatternStroke1 className="absolute top-0 right-0 z-10 h-19 w-42 -rotate-180 max-md:mt-20 max-md:translate-x-2/5 md:right-2 md:h-28 md:w-63 md:translate-x-1/4 lg:-top-10 lg:h-38 lg:w-84" />
        }
        textClassName="justify-center max-w-[505px]"
        containerClassName="sm:h-92 sm:w-88 xl:h-[596px] xl:w-[592px] transform scale-x-[-1]"
        topLeftIconClassName="-left-6 top-10 sm:left-3 md:-left-1 sm:top-16 lg:-left-6 xl:-left-1 transform scale-x-[-1]"
        topRightIconClassName="right-3 sm:right-8 -top-4 sm:top-3 xl:top-4"
        bottomLeftIconClassName="-left-8 -bottom-4 sm:left-4 sm:bottom-5 md:left-2 md:-bottom-2 lg:-bottom-4 lg:left-0 transform scale-x-[-1]"
        bottomRightIconClassName="-right-7 bottom-2 xl: xl:"
        topLeftIcon={<CalendarIcon className="h-8 w-8 rotate-12 md:h-12 md:w-9 lg:h-16 lg:w-12" />}
        topRightIcon={<KnotIcon className="h-5 w-5 lg:h-8 lg:w-8" />}
        bottomLeftIcon={<SchoolBusIcon className="h-8 w-12 -rotate-30 md:h-8 md:w-14 lg:h-11 lg:w-19" />}
        bottomRightIcon={<AlarmClockIcon className="h-[32px] w-[28px] rotate-30 xl:h-[68px] xl:w-[52px]" />}
      />
      <div className="relative flex w-full flex-col py-6 md:pb-10">
        <SlideCarousel
          paddingLeft={sectionMarginLeft}
          slides={data.cards ?? []}
          paginateClassName="lg:w-[min(100%,340px)]"
        />
      </div>
    </>
  );
};

export default SchoolBusServiceIntroSection;
