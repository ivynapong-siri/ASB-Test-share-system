"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  textClassName?: string;
  titleRef?: (el: HTMLHeadingElement | null) => void;
  maxTitleHeight?: number;
  cardRef?: (el: HTMLHeadingElement | null) => void;
  maxCardHeight?: number;
  descriptionRef?: (el: HTMLHeadingElement | null) => void;
  maxDescriptionHeight?: number;
}

export default function IconCard({
  icon,
  title,
  textClassName,
  description,
  className,
  maxTitleHeight,
  titleRef,
  cardRef,
  maxCardHeight,
  descriptionRef,
  maxDescriptionHeight,
}: IconCardProps) {
  return (
    <div
      ref={cardRef}
      className={cn("bg-muted flex h-full flex-col justify-between rounded-4xl p-8", className)}
      style={{ minHeight: maxCardHeight || undefined }}
    >
      {icon}
      <div className={cn("mt-12 flex flex-1 flex-col md:mt-24", textClassName)}>
        <h5
          ref={titleRef}
          style={{ minHeight: maxTitleHeight || undefined }}
          className="text-primary-300 text-xl font-semibold md:text-3xl"
        >
          {title}
        </h5>
        <p
          ref={descriptionRef}
          style={{ minHeight: maxDescriptionHeight || undefined }}
          className="mt-4 font-mono text-sm md:mt-8"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
