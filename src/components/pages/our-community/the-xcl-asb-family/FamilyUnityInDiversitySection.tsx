"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import ContactBanner from "@/components/custom/contact-banner";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface FamilyUnityInDiversitySectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
}

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}

const Counter = ({ from = 0, to, duration = 5, suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const frameRate = 1000 / 60;
    const totalFrames = Math.round((duration * 1000) / frameRate);
    let frame = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 5);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      setCount(Math.round(from + (to - from) * progress));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [to, from, duration, isInView]);

  return (
    <motion.span ref={ref}>
      {count} {suffix}
    </motion.span>
  );
};

const RenderDetailSection = ({ card }: { card: SectionCardJson }) => {
  const splitTitle = card.title.split("+");

  return (
    <>
      <div className="h-px w-52 bg-gradient-to-r from-white/100 to-white/10 sm:w-full md:hidden" />
      <div className="hidden h-80 w-[2px] bg-gradient-to-b from-white/100 to-white/10 md:block" />

      <div className="flex flex-col gap-3 max-md:max-w-[210px] md:px-2 lg:px-4 xl:pr-26">
        <h2 className="text-start text-[2rem]/[2.25rem] font-semibold text-white md:text-[3.875rem]/[4.375rem]">
          <Counter to={parseInt(splitTitle[0] ?? "0")} suffix={card.title?.replace(/[0-9]/g, "")} duration={4} />
        </h2>
        <p className="font-mono text-sm/[1.25rem] font-normal lg:max-w-xs">{card.description}</p>
      </div>
    </>
  );
};

const FamilyUnityInDiversitySection = ({ data, navBox }: FamilyUnityInDiversitySectionProps) => {
  const dieCutImageUrl = "https://dcb9450325.nxcli.io/wp-content/uploads/2025/08/Unity-in-Diversity-die-cut.svg";

  return (
    <SectionContainer
      sectionClassName="h-[1000px] md:h-[1300px] lg:h-[1200px] xl:h-[1300px] "
      className="h-full justify-between pt-8 text-white md:pt-20"
    >
      <div className="bg-primary-300 absolute top-0 right-0 left-0 z-10 hidden h-[75px] w-full md:block xl:hidden" />
      <Image
        src={data.image?.imageUrl ?? "/mock-image.jpg"}
        alt="Background"
        fill
        className="z-0 object-cover max-md:[object-position:28%_50%]"
        priority
      />

      <div className="absolute bottom-0 left-0 z-10 h-[780px] w-full md:z-30 md:h-[1020px] lg:h-[940px] xl:bottom-0 xl:h-[1016px] 2xl:bottom-0 2xl:h-[1015px]">
        <Image
          src={data.image2?.imageUrl ?? dieCutImageUrl}
          alt="Die-Cut image"
          fill
          className="z-35 object-cover max-md:[object-position:28%_50%] md:z-30"
        />

        <div className="from-primary/80 absolute inset-0 z-30 bg-gradient-to-r to-transparent md:hidden" />
      </div>

      <div className="bg-primary absolute top-0 left-0 z-30 h-full w-9 md:hidden" />
      <div className="from-primary-300/100 via-primary-300/80 to-primary-300/0 absolute top-0 bottom-0 left-9 z-20 w-[78%] bg-[linear-gradient(to_left,rgba(14,44,89,0)_0%,rgba(14,44,89,0.83)_29%,var(--primary-300)_100%)] md:top-[74px] md:h-1/2 md:w-full md:bg-gradient-to-b xl:top-0" />

      <div className="z-20 flex flex-col pb-20 md:items-center md:pb-0">
        <div className="flex flex-col items-center">
          <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
          <ASBTitle title={data.title ?? ""} className="text-white md:pt-6" />
        </div>

        <div className="flex flex-col gap-6 pt-16 max-md:items-start max-md:justify-start md:flex-row">
          {data.cards && data.cards.map((e) => <RenderDetailSection card={e} key={e.id} />)}
        </div>
      </div>

      <div className="relative z-30 w-full max-md:text-center">
        <ContactBanner buttonText={navBox?.buttonLabel ?? ""} buttonHref={navBox?.buttonUrl ?? ""}>
          <p className="font-mono">{navBox?.title}</p>
        </ContactBanner>
      </div>
    </SectionContainer>
  );
};

export default FamilyUnityInDiversitySection;
