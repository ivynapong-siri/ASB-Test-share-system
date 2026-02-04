"use client";

import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";

import SlideCarousel from "@/components/carousel/slide-carousel";
import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdmissionProcessIntroSectionProps {
  data: SectionJson;
  buttonLabel: string;
  buttonUrl: string;
  breadcrumbData: BreadcrumbProps;
}

const AdmissionProcessIntroSection = ({
  data,
  buttonLabel,
  buttonUrl,
  breadcrumbData,
}: AdmissionProcessIntroSectionProps) => {
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
        title={data.title}
        description={data.description}
        ribbonText={data.ribbonText}
        imageSrc={data.image?.imageUrl || ""}
        haveButton
        buttonConfig={{
          buttonText: buttonLabel,
          href: buttonUrl,
        }}
        vectorChildren={
          <PatternStroke1
            color="#B81E29"
            className="absolute top-20 -right-22 h-[75px] w-[166px] lg:-top-0 lg:-right-30 lg:h-[150px] lg:w-[360px]"
          />
        }
        topLeftIcon={<LightBulbIcon className="h-10 w-8 lg:h-16 lg:w-12" />}
        topRightIcon={<KnotIcon className="h-6 w-5 lg:h-9 lg:w-9" />}
        bottomLeftIcon={<BookIcon className="h-8 w-13 lg:h-12 lg:w-21" />}
        bottomRightIcon={<MagnifyIcon className="h-5 w-6 lg:h-9 lg:w-10" />}
        topLeftIconClassName="-left-12 top-0 lg:-left-18 lg:top-0"
        topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
        bottomLeftIconClassName="-bottom-10 -left-14 lg:-bottom-10 lg:-left-20"
        bottomRightIconClassName="-bottom-10 right-0 lg:-bottom-10 lg:right-0"
        reverse
        imageClassName="rotate-y-180"
        containerClassName="rotate-y-180"
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
      />
      <div className="relative flex w-full flex-col py-6 md:pb-10">
        <SlideCarousel
          paddingLeft={sectionMarginLeft}
          slides={data.cards ?? []}
          paginateClassName="w-[min(100%,220px)]"
        />
      </div>
    </>
  );
};

export default AdmissionProcessIntroSection;
