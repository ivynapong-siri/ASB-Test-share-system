import { SectionContainer } from "@/components/custom/section-container";
import { ASBVector } from "@/components/icons";
import { HighlightCircleVector } from "@/components/vectors";
import Image from "next/image";
import { Fragment } from "react";

interface AchieveStriveBelongSectionProps {
  imageSrc: string;
  imageSrc2: string;
  achieves: string;
  highlightText: string;
  description: string;
}

const AchieveStriveBelongSection = ({
  imageSrc,
  imageSrc2,
  achieves,
  highlightText,
  description,
}: AchieveStriveBelongSectionProps) => {
  return (
    <SectionContainer
      sectionClassName="h-[900px] lg:h-[1270px] min-h-fit z-0"
      vectorChildren={
        <>
          <div className="from-primary to-primary/0 absolute top-0 z-10 h-1/3 w-full bg-gradient-to-b" />
          <div className="from-primary to-primary/20 mask-gradient-fade absolute bottom-0 z-20 h-1/3 w-full bg-gradient-to-t" />
          <ASBVector
            fill="#B81E29"
            className="absolute -bottom-5.5 left-0 z-25 h-20 w-fit sm:-bottom-7.5 sm:-left-4 md:-bottom-7.5 md:-left-4 lg:-bottom-10 lg:left-0"
          />
        </>
      }
      className="z-10 h-full items-center justify-between px-10 pt-16 pb-16 text-center font-semibold text-white lg:pt-24 lg:pb-32"
    >
      <Image alt="" src={imageSrc} fill className="z-0 object-cover max-md:object-bottom" priority />
      <p className="z-10 max-w-xs justify-center gap-4 text-center text-6xl md:max-w-fit md:text-nowrap lg:flex-row lg:text-7xl xl:text-8xl 2xl:text-9xl">
        {achieves}
      </p>
      <Image alt="" src={imageSrc2} fill className="z-15 object-cover max-md:object-bottom" priority />

      <p className="z-30 mt-4 w-100 text-[1.75rem]/[2rem] font-semibold tracking-wide md:w-full md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
        {description.split(highlightText).map((part, index, arr) => (
          <Fragment key={index}>
            {part}
            {index < arr.length - 1 && (
              <span className="relative inline-block">
                <HighlightCircleVector className="fill-secondary-100 absolute -top-1 -left-1 h-auto w-32 md:-top-2 md:-left-3 md:w-36 lg:-top-3 lg:w-42 xl:-top-4 xl:-left-4 xl:w-56 2xl:-top-6 2xl:w-70" />
                <span className="relative">{highlightText}</span>
              </span>
            )}
          </Fragment>
        ))}
      </p>
    </SectionContainer>
  );
};

export default AchieveStriveBelongSection;
