"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import LinkButton from "./buttons/link-button";

interface ContactBannerProps {
  buttonText: string;
  buttonHref: string;
  className?: string;
  children?: ReactNode;
  customRx?: number;
}

export default function ContactBanner({
  buttonHref,
  buttonText,
  children,
  className,
  customRx = 16,
}: ContactBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    const updateBackground = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;
        let rx = customRx;
        if (width > 687) {
          rx = Math.min(width, height) / 2;
        }

        const svg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="none"
            rx="${rx}" ry="${rx}"
            stroke="white" stroke-width="2"
            stroke-dasharray="6,12" stroke-dashoffset="100"
            stroke-linecap="square" />
        </svg>
      `;
        const encoded = encodeURIComponent(svg);
        setBackgroundImage(`url("data:image/svg+xml,${encoded}")`);
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, [customRx]); // fix hydration timing

  return (
    <div ref={ref} className="bg-secondary-200 rounded-full p-2 max-md:rounded-3xl">
      <div
        style={{
          backgroundImage: backgroundImage,
        }}
        className={cn(
          "flex border-spacing-y-10 items-center justify-between rounded-xl bg-transparent px-8 py-5 text-neutral-100 max-md:flex-col max-md:gap-8 md:rounded-3xl xl:rounded-full",
          className
        )}
      >
        {children}
        <LinkButton
          linkClassName="max-lg:h-8 max-lg:py-4 max-lg:text-xs"
          iconClassName="max-lg:size-6 max-lg:p-1"
          buttonText={buttonText}
          href={buttonHref}
          linkButtonVariant="secondary"
        />
      </div>
    </div>
  );
}
