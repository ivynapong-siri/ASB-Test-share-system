import {
  GrowBasketBallIcon,
  GrowLightBulbIcon,
  GrowTrophyIcon,
  KnotIcon,
  SchoolBusWhiteWheelsIcon,
} from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface ScholarshipApplyCardSectionProps {
  futureSectionData: SectionJson;
}

const ScholarshipApplyCardSection = ({ futureSectionData }: ScholarshipApplyCardSectionProps) => {
  const isMobile = useIsMobile();
  const imageUrl =
    (isMobile ? futureSectionData.imageMobile?.imageUrl : futureSectionData.image?.imageMediumLargeUrl) ||
    futureSectionData.image?.imageUrl ||
    "/mock-image.jpg";

  return (
    <SectionContainer
      sectionClassName="py-23 lg:py-24 px-8 sm:px-20 lg:px-10"
      className="bg-primary-300 rounded-[60px] p-2 lg:p-6"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-4 -left-18 h-[148px] w-[333px] max-md:hidden" />
          <PatternStroke2 className="absolute -right-24 bottom-10 h-[132px] w-[180px] lg:bottom-0 lg:h-[265px] lg:w-[361px]" />
        </>
      }
    >
      <div
        className="rounded-[60px] p-2 max-lg:pb-8 lg:px-8 lg:py-10 xl:px-24"
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='60' ry='60' stroke='white' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
          borderRadius: 60,
        }}
      >
        <div className="relative flex items-center max-lg:flex-col">
          <GrowLightBulbIcon className="absolute top-52 -right-3 z-30 h-6 w-6 max-md:rotate-y-180 lg:-right-10 lg:h-[42px] lg:w-[33px]" />
          <SchoolBusWhiteWheelsIcon className="absolute -bottom-10 left-8 z-30 h-11 w-11 max-md:-rotate-12 lg:-bottom-6 lg:-left-8 lg:h-[43px] lg:w-[74px]" />
          <GrowTrophyIcon className="absolute top-4 left-0 z-30 h-7 w-7 lg:top-0 lg:-left-12 lg:h-[46px] lg:w-[50px]" />
          <div className="absolute top-1/2 left-1/2 h-[95%] w-[90%] -translate-1/2 rounded-[60px] bg-white p-2 lg:h-[90%] lg:w-full lg:p-6">
            <div
              className="h-full w-full rounded-4xl"
              style={{
                backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='60' ry='60' stroke='%23B81E29FF' stroke-width='3' stroke-dasharray='2%2c8' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
                borderRadius: 60,
              }}
            ></div>
          </div>
          <div className="z-10 flex grow flex-col items-center justify-center p-10 pb-8 max-lg:px-10 sm:pt-14 lg:p-18 lg:pr-10 xl:p-24">
            <div className="w-full max-w-lg items-center max-lg:flex max-lg:flex-col max-lg:text-center">
              <h5 className="text-primary-400 text-3xl font-semibold">{futureSectionData.title}</h5>
              <p className="text-primary-400 my-8 font-mono max-lg:text-sm">{futureSectionData.description}</p>
              <LinkButton
                buttonText={futureSectionData.buttonLabel ?? ""}
                href={futureSectionData.buttonUrl ?? ""}
                variant="secondary"
                linkClassName="max-sm:scale-80"
              />
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-[424px] sm:max-w-[95%] xl:max-w-[424px]">
            <Image src={imageUrl} alt="apply-image" fill className="z-10 rounded-4xl object-cover" />

            <div className="absolute h-full w-full rotate-3 rounded-4xl border border-dashed border-neutral-300" />
            <KnotIcon className="absolute -top-2 -right-2 z-20 h-6 w-6 lg:-top-3 lg:-right-5 lg:h-8 lg:w-8" />
            <GrowBasketBallIcon className="absolute right-4 -bottom-3 z-20 h-5 w-5 lg:right-0 lg:h-8 lg:w-8" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ScholarshipApplyCardSection;
