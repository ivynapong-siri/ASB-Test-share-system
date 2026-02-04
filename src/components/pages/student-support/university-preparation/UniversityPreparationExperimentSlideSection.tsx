import { ASBVector, DoubleQuote } from "@/components/icons";

import SlideBackgroundImageCarousel from "@/components/carousel/slide-background-image-carousel";
import ASBDescription from "@/components/custom/asb-description";
import { SectionJson } from "@/server/serializers/section-serializer";

interface UniversityPreparationExperimentSlideSectionProps {
  experimentData: SectionJson;
}

const SlideComponent = ({ description, subtitle, title }: { description: string; title: string; subtitle: string }) => {
  return (
    <div className="flex w-full flex-col gap-2 text-white lg:gap-8">
      <DoubleQuote className="h-9 w-12 max-md:h-[20px] max-md:w-[28px]" />
      <div>
        <ASBDescription
          description={description}
          className="max-w-3xl font-sans text-[1.25rem]/[1.625rem] text-white lg:text-[1.75rem]/[2.25rem]"
        />
        <p className="pt-6 font-mono text-[1.125rem] font-medium tracking-widest text-white uppercase lg:pt-28">
          {title}
        </p>
        <p className="font-mono text-sm/[1.25rem] text-white">{subtitle}</p>
      </div>
    </div>
  );
};

const UniversityPreparationExperimentSlideSection = ({
  experimentData,
}: UniversityPreparationExperimentSlideSectionProps) => {
  return (
    <div className="relative w-full max-md:mb-5">
      <SlideBackgroundImageCarousel
        headerClassName="max-w-lg"
        descriptionComponent={SlideComponent}
        slides={experimentData.cards ?? []}
        ribbonText={experimentData.ribbonText ?? ""}
        titleLine1={experimentData.titleLine1 ?? ""}
        titleLine2={experimentData.titleLine2 ?? ""}
        buttonClassName="gap-4"
        mainTitleClassName="text-end justify-end items-end max-md:items-start max-md:justify-start max-md:text-start"
      />
      <div className="absolute -bottom-[15px] z-20 h-10 w-full translate-y-1/2 max-md:-bottom-0 max-md:-translate-x-[5%] max-sm:bottom-0 sm:h-20 md:h-15 md:-translate-x-1/4 lg:h-17.5 xl:-bottom-9.5 xl:translate-y-1/6">
        <ASBVector
          fill="var(--secondary-200)"
          className="absolute -right-6 h-full w-full md:-translate-y-1/4 lg:left-1/4"
        />
        <div className="bg-secondary-200 absolute top-1/2 left-0 h-1/2 w-[50%] -translate-y-[40%] max-md:-translate-y-[1%] md:-translate-y-1/2 lg:hidden" />
      </div>
    </div>
  );
};

export default UniversityPreparationExperimentSlideSection;
