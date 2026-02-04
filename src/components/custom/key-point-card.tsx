import { KeyPointHorizontalLine, KeyPointHorizontalLineMobile } from "../vectors";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment } from "react";

interface KeyPointCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link?: "left" | "right";
}

export default function KeyPointCard({ imageSrc, title, description, link }: KeyPointCardProps) {
  const renderHorizontalLine = () => {
    if (!link) return null;
    const isLeft = link === "left";
    return (
      <Fragment>
        <div
          className={cn(
            "absolute top-1/1 -z-1 hidden h-full w-full md:block",
            isLeft ? "right-6 rotate-y-180 lg:right-8" : "left-6 lg:left-8"
          )}
        >
          <KeyPointHorizontalLine />
        </div>
        <div
          className={cn(
            "absolute -bottom-41 -z-1 w-full sm:-bottom-28 md:-bottom-41 md:hidden",
            isLeft ? "-left-2 rotate-y-180" : "-right-2"
          )}
        >
          <KeyPointHorizontalLineMobile className="h-auto sm:h-28 md:h-auto" />
        </div>
      </Fragment>
    );
  };

  return (
    <div className="relative flex h-full items-center">
      <div className="bg-primary relative z-20 rounded-full border border-white p-2">
        <div className="flex aspect-square h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white lg:h-19 lg:w-19">
          <div className="relative h-10 w-10 lg:h-12 lg:w-12">
            <Image src={imageSrc} alt="icon" className="object-contain" fill />
          </div>
        </div>
        {renderHorizontalLine()}
      </div>
      <div className="flex h-full max-w-md flex-col items-start gap-2 rounded-4xl border border-white px-4 py-4 text-white sm:px-6 lg:rounded-[40px] lg:p-6">
        <h1 className="mb-2 text-base font-semibold text-white sm:text-lg lg:text-xl xl:text-xl">{title}</h1>
        <p className="font-mono text-xs font-light">{description}</p>
      </div>
    </div>
  );
}
