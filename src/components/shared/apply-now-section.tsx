"use client";

import { PatternStroke1, TextHighlight1 } from "../shapes";

import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { ASBVector } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { ReactNode } from "react";

interface RenderCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  haveArrow?: boolean;
}

function RenderCard({ title, description, buttonHref, buttonText, haveArrow }: RenderCardProps) {
  return (
    <div className="z-10 w-full flex-col items-center p-12 max-lg:flex max-lg:pb-0 lg:relative lg:mt-48 lg:w-[60%] lg:p-24 lg:pl-48">
      <h2 className="text-primary relative flex text-6xl font-semibold max-md:text-3xl md:w-fit">
        {title}
        {haveArrow && (
          <TextHighlight1 className="absolute aspect-[53/29] h-fit w-18 translate-x-16 max-md:left-[52%] md:top-1/2 md:right-0 md:w-32 md:translate-x-24 md:rotate-12" />
        )}
      </h2>
      <p className="my-10 font-mono text-base/[1.625rem] text-neutral-300 max-lg:text-center max-md:text-sm/[1.25rem]">
        {description}
      </p>
      <LinkButton buttonText={buttonText} href={buttonHref} />
      <div className="bg-muted absolute left-1/2 -z-10 h-[94%] w-[96%] -translate-x-1/2 rotate-2 rounded-4xl border border-[#D5DFE4] max-lg:bottom-0 max-lg:h-[86%] max-lg:w-[85%] lg:top-1/2 lg:-translate-y-1/2"></div>
      <div className="bg-muted absolute left-0 -z-20 h-full w-full rounded-4xl max-lg:bottom-0 max-lg:left-1/2 max-lg:h-[87%] max-lg:w-[85%] max-lg:-translate-x-1/2 lg:top-0"></div>
    </div>
  );
}

interface ApplyNowSectionProps {
  data: SectionJson;
  haveTopRibbon?: boolean;
  haveArrow?: boolean;
  vectorChildren?: ReactNode;
  asbVectorClassName?: string;
  indexImageClassName?: string;
}

export default function ApplyNowSection({
  data,
  haveTopRibbon,
  haveArrow,
  vectorChildren,
  asbVectorClassName,
  indexImageClassName,
}: ApplyNowSectionProps) {
  const isMobile = useIsMobile();

  return (
    <SectionContainer
      vectorChildren={
        <>
          {vectorChildren ? (
            vectorChildren
          ) : (
            <>
              <PatternStroke1 className="absolute top-0 -left-24 h-[75px] w-[170px] lg:top-14 lg:h-[150px] lg:w-[340px]" />
              <PatternStroke1 className="absolute top-0 -right-8 z-0 h-[75px] w-[170px] lg:top-32 lg:-right-0 lg:h-[150px] lg:w-[340px]" />
            </>
          )}

          <div
            className={cn(
              "absolute z-30 h-10 w-full max-lg:-bottom-11.5 max-md:bottom-[1px] max-sm:bottom-[23px] sm:h-20 md:h-15 lg:bottom-6 lg:h-20",
              asbVectorClassName
            )}
          >
            <ASBVector
              fill="var(--secondary-200)"
              className={cn("absolute -right-6 z-30 h-full w-full md:-translate-y-1/4")}
              requireCustomClassName={isMobile ? true : false}
            />
            <div
              className={
                isMobile ? "" : "bg-secondary-200 absolute top-1/2 left-0 h-1/2 w-[80%] -translate-y-1/2 xl:h-[49.7%]"
              }
            />
          </div>
          {haveTopRibbon && (
            <div className="absolute z-30 h-10 max-lg:-top-10 max-md:-top-5 sm:h-20 xl:-top-10">
              <ASBVector fill="var(--secondary-200)" className="absolute h-full" />
            </div>
          )}
        </>
      }
      sectionClassName="p-0"
      className="flex flex-row justify-end p-0 max-lg:relative max-lg:flex-col-reverse max-lg:overflow-hidden max-lg:p-4 max-lg:pt-28"
    >
      <div className={cn("z-20 grow max-lg:aspect-[1079/718] lg:relative", indexImageClassName)}>
        <div className="absolute left-1/2 aspect-[1079/718] -translate-x-1/2 max-lg:w-full lg:bottom-0 lg:aspect-[900/680] lg:h-auto lg:w-[728px] xl:aspect-[1079/718] 2xl:w-[950px]">
          <Image src={data.image?.imageUrl ?? ""} alt="" fill className="object-cover" />
        </div>
      </div>
      <RenderCard
        haveArrow={haveArrow}
        title={data.title ?? ""}
        description={data.description ?? ""}
        buttonText={data.buttonLabel ?? ""}
        buttonHref={data.buttonUrl ?? "#"}
      />
    </SectionContainer>
  );
}
