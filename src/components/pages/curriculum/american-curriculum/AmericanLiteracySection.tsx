import { BookIcon, KnotIcon } from "@/components/icons";

import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke1 } from "@/components/shapes";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface AmericanLiteracySectionProps {
  data: SectionJson;
}

const renderImage = (card: SectionCardJson, isMobile: boolean) => {
  const imageUrl =
    (isMobile ? card.imageMobile?.imageUrl : card.image?.imageMediumLargeUrl) ||
    card.image?.imageUrl ||
    "/mock-image.jpg";
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute left-1/2 z-0 h-52 w-64 -translate-x-1/2 transform rounded-4xl border border-[#9EB2C8] sm:h-64 sm:w-72 xl:h-[480px] xl:w-[530px]" />
      <div className="relative z-10 h-50 w-62 rotate-5 transform sm:h-64 sm:w-72 xl:h-[480px] xl:w-[530px]">
        <Image alt="Picture Frame" src={imageUrl} fill className="rounded-4xl object-cover" priority />
      </div>
      <KnotIcon className="absolute -top-0 -left-2 z-20 h-6 w-6 rotate-y-180" />
    </div>
  );
};

const AmericanLiteracySection = ({ data }: AmericanLiteracySectionProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      <SectionContainer
        vectorChildren={
          <>
            <div className="bg-primary-gray absolute h-[550px] w-9/10 rounded-4xl md:h-[600px] lg:top-8 lg:w-3/5" />
            <div className="bg-primary absolute right-[-28px] bottom-18 hidden h-[640px] w-9/10 rounded-4xl sm:bottom-28 sm:block md:bottom-20 md:hidden" />

            <PatternStroke1 className="absolute bottom-0 -left-20 h-[110px] w-[186px] rotate-60 max-md:hidden lg:bottom-22 lg:left-0 lg:h-[150px] lg:w-[334px] lg:rotate-0" />
            <BookIcon className="absolute bottom-6 left-24 h-5 w-8 rotate-30 max-md:hidden lg:bottom-52 lg:left-82 lg:h-10 lg:w-16" />
          </>
        }
        className="hidden flex-col sm:flex lg:flex-row"
      >
        <div className="z-0 max-w-xl px-8 py-22 text-white md:px-20 md:py-26 md:pt-0 lg:max-w-none lg:pt-26 lg:pl-0 xl:p-30 xl:pl-0">
          <ASBTitle title={data.title ?? ""} className="max-w-md pb-6 text-start" />
          <ASBDescription description={data.description ?? ""} className="max-w-sm sm:max-w-md xl:max-w-xl" />
        </div>

        <div className="md:bg-primary z-10 -mt-15 flex max-w-xl flex-col items-center self-end rounded-4xl p-10 text-white lg:mt-20 lg:-ml-10 lg:max-w-none lg:self-auto xl:-ml-20">
          {data.cards && renderImage(data.cards?.[0], isMobile)}
          <p className="max-w-sm p-10 font-mono text-base tracking-wide md:px-0 md:py-13 xl:max-w-xl">
            {data.cards && data.cards?.[0].description}
          </p>
        </div>
      </SectionContainer>

      <div className="relative flex flex-col pb-30 sm:hidden lg:flex-row lg:justify-start">
        <PatternStroke1 className="absolute bottom-12 -left-20 z-20 h-[110px] w-[186px] rotate-60 lg:bottom-22 lg:left-0 lg:hidden lg:h-[150px] lg:w-[334px] lg:rotate-0" />
        <BookIcon className="absolute bottom-12 left-24 h-5 w-8 rotate-30 lg:bottom-52 lg:left-82 lg:hidden lg:h-10 lg:w-16" />

        <div className="z-0 h-auto max-w-xl lg:max-w-none">
          <div className="bg-primary-gray rounded-4xl px-8 py-22 text-white md:px-20 md:py-26 xl:py-36 xl:pr-34 xl:pl-80">
            <h2 className="text-primary max-w-md pb-6 text-3xl font-semibold md:text-6xl">{data.title}</h2>
            <p className="text-neutral max-w-sm font-mono text-base sm:max-w-md xl:max-w-xl">{data.description}</p>
          </div>
        </div>

        <div className="z-10 h-auto max-w-[90%] self-end lg:max-w-none lg:self-auto">
          <div className="bg-primary -mt-15 flex w-full flex-col items-center rounded-l-4xl p-10 text-white lg:mt-20 lg:-ml-10 lg:rounded-4xl xl:-ml-20">
            {data.cards && renderImage(data.cards?.[0], isMobile)}
            <p className="max-w-sm pt-10 pb-10 font-mono text-base tracking-wide xl:max-w-xl">
              {data.cards && data.cards?.[0].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmericanLiteracySection;
