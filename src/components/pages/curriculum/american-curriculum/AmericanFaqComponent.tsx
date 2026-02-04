"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { FAQJson } from "@/server/serializers/faq-serializer";
import { SectionTabJson } from "@/server/serializers/tab-serializer";
import { AmericanFaqHandle } from "./AmericanFaqHandle";

interface AmericanFaqComponentProps {
  stepsDetail: SectionTabJson[];
}

export default function AmericanFaqComponent({ stepsDetail }: AmericanFaqComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  const activeData = activeIndex !== null ? (stepsDetail[activeIndex]?.cards as FAQJson[]) : [];

  return (
    <div className="flex w-full justify-center max-lg:flex-col lg:items-start">
      <ul className="bg-primary-300 flex flex-col rounded-[2rem] lg:rounded-tr-none lg:rounded-br-none">
        {stepsDetail.map((step, inx) => {
          const isActive = inx === activeIndex;
          const firstIndex = inx === 0;
          const lastIndex = inx === stepsDetail.length - 1;

          return (
            <li
              key={inx}
              onClick={() => setActiveIndex(inx)}
              className={`cursor-pointer items-center justify-center px-0 font-semibold text-white lg:px-7 ${isActive ? "text-secondary-300 bg-primary-200" : ""} ${isActive && firstIndex ? "rounded-tl-[2rem] rounded-tr-[2rem] lg:rounded-tr-none" : ""} ${isActive && lastIndex ? "rounded-br-[2rem] rounded-bl-[2rem] lg:rounded-br-none" : ""} `}
            >
              <div className="flex w-full items-center py-6 text-start text-xl max-lg:justify-center max-lg:text-center lg:min-w-[380px] lg:py-10">
                <h6 className="max-w-[210px] text-white lg:max-w-none">{step.title}</h6>
              </div>

              {isActive ? (
                <div
                  className={cn(
                    "border-primary flex w-full border bg-white px-6 pt-4 pb-18 text-neutral-300 lg:hidden lg:max-w-2xl lg:px-10 lg:pl-14",
                    lastIndex && "rounded-br-[2rem] rounded-bl-[2rem]"
                  )}
                >
                  <AmericanFaqHandle faqs={activeData ?? []} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="border-primary-300 hidden grow rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[2rem] border px-10 pt-4 pb-18 pl-14 text-neutral-300 lg:block lg:max-w-[893px]">
        <AmericanFaqHandle faqs={activeData ?? []} />
      </div>
    </div>
  );
}
