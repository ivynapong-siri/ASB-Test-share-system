import ASBDescription from "@/components/custom/asb-description";
import { AnimatedFadeInWhenVisible } from "@/components/shared/animation-section";
import { SectionIconJson } from "@/server/serializers/icon-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import { Fragment } from "react";
import { Marquee } from "../../custom/marquee";
import { SectionContainer } from "../../custom/section-container";

const AND_TEXT = {
  en: "and",
  th: "และ",
  ja: "と",
  ko: "および",
  cn: "和",
};

interface HomeRecognizeSectionProps {
  recognizeData: SectionJson;
  iconData: SectionIconJson[];
}

const LogoImage = ({ img }: { img: string }) => (
  <figure className="relative mx-3 flex h-fit w-fit cursor-pointer items-center overflow-hidden xl:mx-8">
    <img alt={img} src={img} className="aspect-auto h-10 w-auto object-contain" />
  </figure>
);

const HighlightedText = ({
  text,
  highlightText,
  highlightText2,
}: {
  text: string;
  highlightText: string;
  highlightText2: string;
}) => {
  const andPatterns = ["and", "และ", "および", "및", "和"];
  const regex = new RegExp(`(${highlightText}|${highlightText2}|[^${highlightText}${highlightText2}]+)`, "g");
  const parts = text.match(regex) ?? [];

  return (
    <Fragment>
      {parts.map((part, index) => {
        const trimmed = part.trim();

        if (!trimmed) return null;

        if (trimmed === highlightText || trimmed === highlightText2) {
          return (
            <span key={index} className="bg-secondary inline-flex items-center rounded-full px-2 text-white">
              {part}
            </span>
          );
        }

        if (andPatterns.some((word) => trimmed.includes(word))) {
          return (
            <span key={index} className="text-primary">
              {part}
            </span>
          );
        }

        return (
          <span key={index} className="block md:hidden">
            {part}
          </span>
        );
      })}
    </Fragment>
  );
};

const HeaderContent = ({ recognizeData }: { recognizeData: SectionJson }) => (
  <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 xl:gap-4">
    <div className="relative hidden h-17 w-28 md:flex">
      <Image
        alt="mock-image"
        src={recognizeData.image?.imageMediumLargeUrl || recognizeData.image?.imageUrl || "/mock-image.jpg"}
        fill
        priority
        className="rounded-full object-fill"
      />
    </div>
    <p className="hidden text-wrap md:flex">{`${recognizeData.header2} ${recognizeData.header3}`}</p>
    <div className="flex w-full flex-row items-center justify-center gap-2 md:hidden">
      <div className="relative h-[52px] w-[92px] lg:h-17 lg:w-28">
        <Image
          alt="mock-image"
          src={recognizeData.image?.imageMediumLargeUrl || recognizeData.image?.imageUrl || "/mock-image.jpg"}
          fill
          priority
          className="rounded-full object-fill"
        />
      </div>
      <p className="flex pl-2 text-nowrap md:hidden">{recognizeData.header2}</p>
    </div>
    <p className="block md:hidden">{recognizeData.header3}</p>
  </div>
);

const HomeRecognizeSection = ({ recognizeData, iconData }: HomeRecognizeSectionProps) => {
  const logoImages = iconData.map((e) => ({
    img: e.image?.imageUrl ?? "/mock-image.jpg",
  }));

  return (
    <SectionContainer className="gap-10 xl:py-40">
      <AnimatedFadeInWhenVisible className="flex flex-col items-center justify-center gap-4 text-center xl:px-48">
        <div className="text-primary flex w-full flex-col items-center gap-2 text-4xl font-semibold lg:gap-1 xl:text-6xl">
          <h2 className="text-wrap">{recognizeData.header}</h2>
          <HeaderContent recognizeData={recognizeData} />
          <div className="flex flex-col items-center justify-center text-center text-white sm:flex-row sm:gap-2 sm:leading-normal">
            <HighlightedText
              text={recognizeData.header4 || ""}
              highlightText={recognizeData.highlightText || ""}
              highlightText2={recognizeData.highlightText2 || ""}
            />
          </div>
        </div>
        <AnimatedFadeInWhenVisible delay={0.3}>
          <ASBDescription description={recognizeData.description ?? ""} className="xl:w-[780px]" />
        </AnimatedFadeInWhenVisible>
      </AnimatedFadeInWhenVisible>

      <div className="w-full lg:px-9">
        <Marquee rows={1} fadeBothSides reverse pauseOnHover className="gap-10 [--duration:20s] md:[--duration:30s]">
          {logoImages.map((e, index) => (
            <LogoImage key={index} {...e} />
          ))}
        </Marquee>
      </div>
    </SectionContainer>
  );
};

export default HomeRecognizeSection;
