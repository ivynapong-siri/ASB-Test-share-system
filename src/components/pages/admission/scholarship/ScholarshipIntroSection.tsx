"use client";

import { KnotIcon, LightBulbIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";

import SlideCarousel from "@/components/carousel/slide-carousel";
import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { useIsMobile } from "@/hooks/use-mobile";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ScholarshipIntroSectionProps {
  whyASBSukhumvitSectionData: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function ScholarshipIntroSection({
  whyASBSukhumvitSectionData,
  breadcrumbData,
}: ScholarshipIntroSectionProps) {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile
      ? whyASBSukhumvitSectionData.imageMobile?.imageUrl
      : whyASBSukhumvitSectionData.image?.imageMediumLargeUrl) ||
    whyASBSukhumvitSectionData.image?.imageUrl ||
    "";

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
        textClassName="xl:max-w-[609px]"
        imageSrc={imageUrl}
        title={whyASBSukhumvitSectionData?.title}
        description={whyASBSukhumvitSectionData?.description}
        ribbonText={whyASBSukhumvitSectionData?.ribbonText}
        containerClassName="rotate-y-180"
        imageClassName="rotate-y-180"
        topLeftIconClassName="top-0 left-0 lg:-left-4 -translate-x-full"
        topRightIconClassName="top-2 lg:top-4 right-0 -translate-y-full"
        topLeftIcon={<LightBulbIcon className="h-8 w-6 lg:h-16 lg:w-12" />}
        topRightIcon={<KnotIcon className="h-[24px] w-[22px] lg:h-8 lg:w-8" />}
        breadcrumbs1={breadcrumbData.breadcrumb1}
        breadcrumbs2={breadcrumbData.breadcrumb2}
        vectorChildren={
          <>
            <PatternStroke1
              color="#B81E29"
              className="absolute top-24 -right-18 z-1 h-[75px] w-[170px] -rotate-180 lg:-top-8 xl:-right-24 xl:h-[150px] xl:w-[340px]"
            />
            <PatternStroke1 className="absolute -bottom-16 -left-18 z-0 h-[75px] w-[170px] xl:bottom-0 xl:-left-20 xl:z-1 xl:h-[150px] xl:w-[340px]" />
          </>
        }
      />
      <div className="relative flex w-full flex-col py-6 md:pb-10">
        <SlideCarousel
          paddingLeft={sectionMarginLeft}
          className="mt-12 xl:max-w-none"
          slides={whyASBSukhumvitSectionData?.cards ?? []}
          paginateClassName="w-[min(100%,220px)] lg:w-[min(100%,365px)]"
        />
      </div>
    </>
  );
}
