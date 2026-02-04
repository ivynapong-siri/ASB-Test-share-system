"use client";

import { ClockIcon, CloseBookIcon, GrowLightBulbIcon, KnotIcon, WhiteLinePencil } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface FamilyCareerSectionProps {
  data: SectionJson;
}

const FamilyCareerSection = ({ data }: FamilyCareerSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <SectionContainer
      sectionClassName="py-24 px-8"
      className="bg-primary-300 rounded-[60px] p-2 lg:p-6"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-10 z-10 hidden h-22 w-34 md:-left-20 md:block md:h-30 md:w-42 2xl:-left-30 2xl:h-60 2xl:w-84" />
          <PatternStroke2 className="absolute -right-44 bottom-0 z-20 h-19 w-42 2xl:h-[266px] 2xl:w-[362px]" />
        </>
      }
    >
      <div
        className="rounded-[60px] p-2 max-lg:pb-8 lg:px-24 lg:py-10"
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='60' ry='60' stroke='white' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
          borderRadius: 60,
        }}
      >
        <div className="relative flex items-center max-xl:flex-col">
          <GrowLightBulbIcon className="absolute top-3 right-0 z-30 h-7 w-7 rotate-y-180 lg:top-52 lg:-right-10 lg:h-8 lg:w-8 lg:rotate-y-0" />
          <WhiteLinePencil className="absolute -bottom-7 left-7 z-30 max-md:h-[21px] max-md:w-4 lg:bottom-0 lg:-left-10" />
          <CloseBookIcon className="absolute top-0 left-6 z-30 h-8 w-8 lg:-top-4 lg:-left-8 lg:h-10 lg:w-10" />
          <div className="absolute top-1/2 left-1/2 h-[95%] w-[90%] -translate-1/2 rounded-[60px] bg-white p-2 lg:h-[90%] lg:w-full lg:p-6">
            <div
              className="h-full w-full rounded-4xl"
              style={{
                backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='60' ry='60' stroke='%23B81E29FF' stroke-width='3' stroke-dasharray='2%2c8' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
                borderRadius: 60,
              }}
            />
          </div>
          {/* Data */}
          <div className="z-10 flex w-full grow flex-col items-center p-16 text-center lg:items-start lg:p-24 lg:text-start">
            <ASBRibbonText title={data.ribbonText ?? ""} vectorHidden={isMobile} className="pb-3" />
            <ASBTitle title={data.title ?? ""} className="md:text-start" />
            <p className="my-8 font-mono text-neutral-300 max-lg:text-sm">{data.description}</p>
            <LinkButton
              buttonText={data.buttonLabel ?? ""}
              href={data.buttonUrl ?? ""}
              variant="secondary"
              linkClassName="max-sm:scale-80"
            />
          </div>

          {/* Image */}
          <div className="relative aspect-[386/450] h-[315px] w-full max-w-[315px] 2xl:h-[450px] 2xl:max-w-[386px]">
            <Image
              src={data.image?.imageUrl ?? ""}
              alt="apply-image"
              fill
              className="z-10 rounded-4xl object-cover"
              priority
            />
            <div className="absolute h-full w-full rotate-3">
              <div
                className="h-full w-full rounded-4xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='60' ry='60' stroke='%239EB2C8' stroke-width='3' stroke-dasharray='2%2c8' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e")`,
                  borderRadius: 60,
                }}
              />
            </div>
            <KnotIcon className="absolute -top-3 -right-5 z-20 h-8 w-8" />
            <ClockIcon className="absolute right-0 -bottom-3 z-20 h-8 w-8 lg:-right-4 lg:-bottom-12 lg:h-12 lg:w-12" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FamilyCareerSection;
