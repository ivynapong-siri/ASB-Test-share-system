"use client";

import { useEffect, useRef, useState } from "react";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { SectionContainer } from "@/components/custom/section-container";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
type HistoryXCLASBLegacyProps = {
  data: SectionJson;
};

const HistoryXCLASBLegacy = ({ data }: HistoryXCLASBLegacyProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hightRef, setHightRef] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setHightRef(height);
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--height", `${hightRef}px`);
    }
  }, [hightRef]);

  return (
    <SectionContainer className="relative items-center justify-center gap-6 py-24 md:gap-16">
      <div className="flex flex-col gap-2 text-start lg:items-center lg:justify-center lg:text-center">
        <ASBRibbonText className="w-fit translate-x-8" title={data.ribbonText ?? ""} />
        <div className="text-primary w-fit text-3xl font-bold text-nowrap lg:text-wrap xl:text-6xl">
          {data.titleLine1} <br />
          {data.titleLine2}
        </div>
      </div>
      <div ref={ref} className="relative flex flex-col gap-16 2xl:gap-24">
        <div
          className="absolute inset-0 top-0 z-0 hidden w-22 xl:top-20 xl:block"
          style={{ left: "calc(50% - 2.5rem)" }}
        >
          <Image alt="History background" src="/history-line.svg" className="object-contain" fill priority />
        </div>
        <div className="absolute inset-0 top-0 -left-6 z-0 w-22 sm:left-0 xl:hidden">
          <Image alt="History background" src="/history-line-mobile.svg" className="object-contain" fill priority />
        </div>
        {data.cards?.map((item, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <div
              key={index}
              className={cn(
                "ml-20 flex max-w-lg flex-col-reverse justify-between gap-6 sm:ml-40 xl:ml-0 xl:max-w-none xl:gap-40 xl:gap-65 2xl:gap-100",
                isOdd ? "xl:flex-row-reverse" : "xl:flex-row"
              )}
            >
              <div className="relative h-[143px] w-full min-w-[266px] sm:min-w-96 md:h-[200px] xl:h-[274px] xl:min-w-[42rem] xl:min-w-[508px]">
                <Image
                  alt="Head of School Background"
                  src={item.image?.imageMediumLargeUrl || item.image?.imageUrl || ""}
                  className="rounded-[2.5rem] object-cover object-top"
                  fill
                  priority
                />
              </div>
              <div key={item.id} className="text-primary flex w-full flex-col gap-2 xl:min-w-[285px]">
                <h3 className="max-xl:text-[1.75rem]/[2rem]">{item.title}</h3>
                <h6 className="">{item.subtitle}</h6>
                <p
                  className="max-w-3xl font-mono text-xs text-gray-600 xl:text-sm 2xl:max-w-4xl"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlContent(item.description.replace(/\r\n\r\n/g, "<br /><br />")),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default HistoryXCLASBLegacy;
