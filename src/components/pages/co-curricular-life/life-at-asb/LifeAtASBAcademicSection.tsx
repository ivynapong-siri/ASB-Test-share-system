"use client";

import { useEffect, useRef, useState } from "react";

import { academicBreakPoints } from "@/client/configs/slide-carousel-config";
import AcademicCarousel from "@/components/carousel/academic-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface LifeAtASBAcademicSectionProps {
  data: SectionJson;
}

const LifeAtASBAcademicSection = ({ data }: LifeAtASBAcademicSectionProps) => {
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
      <SectionContainer ref={sectionRef} sectionClassName="bg-primary-gray" className="max-md:pb-15">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-primary-400 max-w-xl flex-col text-3xl font-semibold lg:text-4xl xl:text-6xl">
            <ASBRibbonText title={data.ribbonText ?? ""} />
            <ASBTitle title={data.title ?? ""} className="text-start" />
          </div>
          <ASBDescription description={data.description ?? ""} className="lg:max-w-xl lg:pt-15 2xl:max-w-3xl" />
        </div>
      </SectionContainer>
      <AcademicCarousel
        slides={data.cards ?? []}
        paddingLeft={sectionMarginLeft}
        className="bg-primary-gray"
        inActiveSlideClassName="w-full"
        breakPoints={academicBreakPoints}
      />
    </>
  );
};

export default LifeAtASBAcademicSection;
