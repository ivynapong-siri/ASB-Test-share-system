"use client";

import { AnimatedFadeInWhenVisible, AnimatedLeftItemSlide, AnimatedRightItemSlide } from "./animation-section";
import { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import LinkButton from "../custom/buttons/link-button";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionContainer } from "../custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { TextHighlight2 } from "../shapes";
import { cn } from "@/lib/utils";

interface HoverCardProgramSectionProps {
  data: SectionJson;
  cardAlignStart?: boolean;
  titleClassName?: string;
  titleLineOneClassName?: string;
  titleLineTwoClassName?: string;
  imageClassName?: string;
  backgroundGradientClassName?: string;
  isChinese?: boolean;
}

const renderCard = (cardData: SectionCardJson[], cardAlignStart?: boolean) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  return cardData.map((card, index) => (
    <Fragment key={index}>
      <div className={cn("flex w-full", cardAlignStart ? "items-start" : "items-center")}>
        <div
          className={cn(
            "hover:text-primary group z-10 flex w-full flex-col justify-between gap-4 rounded-4xl bg-transparent text-white transition-all duration-300 hover:cursor-pointer hover:bg-white hover:py-6 md:px-4",
            expanded === index && "text-primary bg-white px-4 py-6"
          )}
          onClick={() => setExpanded(expanded === index ? null : index)}
        >
          <h5 className="group-hover:text-primary-400 text-white">{card.title}</h5>
          <p className="font-mono text-sm">{card.description}</p>
          <div
            className={cn(
              "hidden transition-opacity duration-300 ease-in-out group-hover:flex",
              expanded === index && "flex"
            )}
          >
            <LinkButton
              buttonText={card.buttonLabel}
              href={card.buttonUrl}
              linkClassName="text-xs py-2 px-6 md:text-sm md:py-7 md:px-6"
              iconClassName="size-7 p-2 md:size-9 md:p-[10px]"
            />
          </div>
        </div>
      </div>
      {index !== cardData.length - 1 && <hr className="h-px border-0 bg-white opacity-20 md:hidden" />}
      {index !== cardData.length - 1 && (
        <div className="hidden h-[250px] min-h-[1em] w-0.5 bg-white opacity-20 md:block" />
      )}
    </Fragment>
  ));
};

const HoverCardProgramSection = ({
  data,
  titleClassName,
  titleLineTwoClassName,
  titleLineOneClassName,
  imageClassName,
  backgroundGradientClassName,
  cardAlignStart,
  isChinese,
}: HoverCardProgramSectionProps) => {
  const { image, title, titleLine1, titleLine2, description, buttonUrl, buttonLabel } = data;

  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");

  useEffect(() => {
    if (!description || description.trim() === "") {
      setLine1("");
      setLine2("");
      return;
    }

    const commaIndex = description.indexOf("，");

    if (commaIndex === -1) {
      setLine1(description);
      setLine2("");
      return;
    }

    const firstLine = description.slice(0, commaIndex + 1);
    const secondLine = description.slice(commaIndex + 1).trimStart();

    setLine1(firstLine);
    setLine2(secondLine);
  }, [description, isChinese]);

  const imageStyle = {
    WebkitMaskImage:
      "linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)",
    maskImage:
      "linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 1),rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)",
  };
  const backgroundStyle = {
    WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgb(0, 0, 0, 0.8)",
    maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1),  rgb(0, 0, 0, 0.8)",
  };

  return (
    <div className="relative h-full min-h-[1000px]">
      <Image
        src={image?.imageUrl ?? "/mock-image.jpg"}
        alt={title ?? ""}
        fill
        className={cn("z-10 object-cover opacity-100 brightness-70 contrast-200 grayscale", imageClassName)}
        style={imageStyle}
      />
      <div
        className={cn(
          "absolute inset-0 bottom-0 z-20 h-full bg-gradient-to-b from-[#0E2C59]/100 to-[#174994]/100 opacity-90",
          backgroundGradientClassName
        )}
        style={backgroundStyle}
      />

      <SectionContainer>
        <div
          className={cn(
            "z-40 flex w-full flex-col items-center gap-8 pb-8 text-[2rem]/[2rem] text-[2rem] text-white md:text-[3rem]/[3.25rem] lg:text-[3.875rem]/[4.375rem]",
            titleClassName
          )}
        >
          <>
            <div className="flex w-full flex-col max-sm:items-center lg:max-w-[1200px]">
              <AnimatedLeftItemSlide className={cn("w-[280px] sm:w-full", titleLineOneClassName)}>
                <h2 className="text-white">{titleLine1}</h2>
              </AnimatedLeftItemSlide>

              <AnimatedRightItemSlide className="flex w-full flex-row justify-end gap-2">
                <TextHighlight2 className="h-24 w-21" />
                <h2 className={cn("w-[200px]sm:w-[400px] text-white md:w-[600px] lg:w-[700px]", titleLineTwoClassName)}>
                  {titleLine2}
                </h2>
              </AnimatedRightItemSlide>
            </div>
          </>
        </div>

        <AnimatedFadeInWhenVisible className="z-40 flex h-auto w-full justify-center pb-14 text-center font-mono text-base text-white lg:pb-52">
          {/* <p className="md:max-w-[590px]">{description}</p> */}
          <p className="md:max-w-[590px]">
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </p>
        </AnimatedFadeInWhenVisible>

        <AnimatedFadeInWhenVisible className="z-40 flex flex-col items-center justify-center gap-12">
          <>
            <div className="flex w-full flex-col gap-4 divide-white md:h-[275px] md:flex-row lg:gap-8">
              {renderCard(data.cards ?? [], cardAlignStart)}
            </div>
            {buttonUrl && buttonLabel && (
              <LinkButton
                buttonText={buttonLabel}
                href={buttonUrl}
                linkClassName="bg-transparent border-white border hover:border-secondary"
              />
            )}
          </>
        </AnimatedFadeInWhenVisible>
      </SectionContainer>
    </div>
  );
};

export default HoverCardProgramSection;
