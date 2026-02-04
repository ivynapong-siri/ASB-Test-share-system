"use client";

import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AdmissionAndProcessJourneyStepComponentProps {
  stepsDetail: {
    titleText: string;
    description: string;
  }[];
}

export function renderHtmlContent(html: string, liClassName?: string) {
  const blocks = [...html.matchAll(/<(p|ul)[^>]*?>(.*?)<\/\1>/gs)];

  const hasParagraph = blocks.some(([_, tag]) => tag === "p");

  return blocks.map(([fullMatch, tag, content], i) => {
    if (tag === "p") {
      const lines = content.split(/<br\s*\/?>/i).filter(Boolean);
      return lines.map((line, j) => {
        const text = line.trim();
        if (text.startsWith("*")) {
          return (
            <p key={`label-${i}-${j}`} className="text-warning font-mono text-sm font-medium">
              {text}
            </p>
          );
        }
        return (
          <p key={`p-${i}-${j}`} className="font-mono text-base text-neutral-300">
            {text}
          </p>
        );
      });
    }

    if (tag === "ul") {
      const liMatches = [...content.matchAll(/<li[^>]*>(.*?)<\/li>/gs)];
      return (
        <ul
          key={`ul-${i}`}
          className={cn("list-disc space-y-2 pl-6 font-mono text-neutral-300", hasParagraph && "py-4")}
        >
          {liMatches.map(([, liContent], j) => (
            <li
              className={liClassName}
              key={`li-${i}-${j}`}
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(liContent.trim()) }}
            />
          ))}
        </ul>
      );
    }

    return null;
  });
}

export default function AdmissionAndProcessJourneyStepComponent({
  stepsDetail,
}: AdmissionAndProcessJourneyStepComponentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const description = stepsDetail[activeIndex].description;

  return (
    <div className="my-12 mb-40 flex justify-center gap-4 max-lg:mb-10 max-lg:flex-col xl:gap-30">
      <ul className="flex flex-col gap-4">
        {stepsDetail.map((step, inx) => (
          <li
            key={inx}
            onClick={() => {
              setActiveIndex(inx);
            }}
          >
            <h6
              className={`cursor-pointer text-lg font-semibold text-neutral-400 2xl:text-xl ${inx === activeIndex ? "text-secondary-100" : ""}`}
            >{`- ${step.titleText}`}</h6>
          </li>
        ))}
      </ul>
      <div className="bg-muted max-w-2xl rounded-[3rem] p-10 pl-14 font-mono text-neutral-300">
        {renderHtmlContent(description)}
      </div>
    </div>
  );
}
