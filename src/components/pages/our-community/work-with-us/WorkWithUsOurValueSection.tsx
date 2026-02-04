"use client";

import "@/client/styles/custom-marquee.css";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { Marquee } from "@/components/custom/marquee";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface WorkWithUsOurValueSectionProp {
  data: SectionJson;
}

const RenderImages = ({ images }: { images: SectionCardJson[] }) => {
  return (
    <div className="relative flex w-full rounded-xl md:flex-col">
      {images.map((e, index) => (
        <div key={index} className="relative my-2 h-90 md:w-90 lg:w-[500px] xl:w-[600px]">
          <Image
            src={e.image?.imageUrl || e.image?.imageUrl || ""}
            alt={`Image ${index + 1}`}
            fill
            className="rounded-xl object-cover"
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
          />
        </div>
      ))}
    </div>
  );
};

export default function WorkWithUsOurValueSection({ data }: WorkWithUsOurValueSectionProp) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isVertical = !isTablet;

  const cards = data.cards ?? [];
  const repeat = isMobile ? cards.length : 1;

  return (
    <SectionContainer sectionClassName="bg-primary-300" className="max-lg:px-0 lg:flex-row lg:py-0">
      <div className="h-[760px] w-full overflow-hidden max-lg:hidden">
        <Marquee
          reverse
          pauseOnHover
          vertical={isVertical}
          repeat={repeat}
          className="items-center gap-0 p-0 [--duration:150s] [--gap:0rem]"
        >
          <RenderImages images={cards} />
          <RenderImages images={cards} />
        </Marquee>
      </div>

      <div className="flex w-full items-center max-lg:px-10 md:pl-25 xl:pl-35">
        <div className="flex flex-col max-lg:pb-15">
          <ASBRibbonText title={data.ribbonText ?? ""} />
          <ASBTitle title={data.title ?? ""} className="pb-8 text-start text-white" />
          <ASBDescription description={data.description ?? ""} className="text-white max-sm:max-w-90 sm:w-full" />
        </div>
      </div>

      <div className="lg:hidden">
        <Marquee
          rows={1}
          reverse
          pauseOnHover
          vertical={isVertical}
          repeat={repeat}
          className="items-center gap-10 [--duration:500s] md:gap-0"
        >
          <div className="relative flex w-full gap-5 overflow-x-auto lg:flex-col">
            {cards.map((e, index) => (
              <div key={index} className="relative flex h-55 w-90 px-2">
                <Image
                  src={e.image?.imageUrl ?? ""}
                  alt={`Image ${index + 1}`}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </SectionContainer>
  );
}
