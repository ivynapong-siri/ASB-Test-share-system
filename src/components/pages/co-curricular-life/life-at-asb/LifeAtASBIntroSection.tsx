"use client";

import { BasketBallIcon, KnotIcon, PinGreenIcon, RulerIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";
import { useEffect, useRef, useState } from "react";

import { BreadcrumbProps } from "@/server/models/model-types";
import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";
import SlideCarousel from "@/components/carousel/slide-carousel";

interface LifeAtASBIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const LifeAtASBIntroSection = ({ data, breadcrumbData }: LifeAtASBIntroSectionProps) => {
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
        imageSrc={data.image?.imageUrl || "/mock-image.png"}
        title={data.title}
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
        description={data.description}
        ribbonText={data.ribbonText}
        ribbonClassName="max-md:max-w-[200px]"
        vectorChildren={
          <>
            <PatternStroke2 className="absolute top-10 right-1 z-10 h-33 w-45 translate-x-1/3 -rotate-180 md:top-5 lg:top-0 xl:-top-32 xl:right-8 xl:h-60 xl:w-84" />
            <PatternStroke1 className="absolute top-[820px] -left-18 z-10 h-19 w-42 rotate-35 max-sm:translate-y-full sm:top-[680px] md:top-[480px] xl:top-[630px] xl:left-10 xl:h-38 xl:w-84 xl:-translate-x-1/3" />
          </>
        }
        containerClassName="transform scale-x-[-1]"
        topLeftIcon={<PinGreenIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[35px] lg:w-[34px]" />}
        topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
        bottomLeftIcon={
          <RulerIcon className="h-[34px] w-[23px] rotate-90 md:h-[25px] md:w-[24px] lg:h-[60px] lg:w-[32px]" />
        }
        bottomRightIcon={
          <BasketBallIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />
        }
        topLeftIconClassName="-left-3 top-0 lg:-left-10 xl:-left-12 lg:-top-12 rotate-y-180"
        topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
        bottomLeftIconClassName="-bottom-6 left-0 lg:-bottom-10 lg:-left-6 rotate-y-180"
        bottomRightIconClassName="bottom-4 -right-8 lg:-bottom-4 lg:-right-6"
        showStandardVector={false}
      />
      <div className="relative flex w-full flex-col pt-10 pb-20">
        <SlideCarousel
          paddingLeft={sectionMarginLeft}
          slides={data.cards ?? []}
          paginateClassName="w-[min(100%,230px)] lg:w-[min(100%,340px)]"
        />
      </div>
    </>
  );
};

export default LifeAtASBIntroSection;
