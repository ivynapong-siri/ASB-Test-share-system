"use client";

import "@/client/styles/active-carousel.css";

import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ActiveCardProps {
  children: ReactNode;
  buttonChildren: ReactNode;
  contentChildren: ReactNode;
  image: string;
  cardClassName?: string;
  curveColor?: string;
  onClick?: () => void;
}

export default function ActiveCard({
  children,
  buttonChildren,
  contentChildren,
  image,
  cardClassName,
  curveColor: childrenClassName,
  onClick,
}: ActiveCardProps) {
  const [tagElementWidth, setTagElementWidth] = useState<number | null>(null);

  useEffect(() => {
    const calculateTagElementWidth = () => {
      const tagElement = document.querySelector<HTMLDivElement>(".tag");
      if (tagElement) {
        setTagElementWidth(tagElement.clientWidth);
      }
    };
    calculateTagElementWidth();
  }, [children]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
      className={cn("relative h-fit w-fit", onClick && "cursor-pointer")}
    >
      <div
        className={cn(
          "relative h-[432px] w-[358px] overflow-hidden rounded-4xl xl:h-[590px] xl:w-[470px]",
          cardClassName
        )}
      >
        <Image
          src={image}
          alt="Active Card"
          className="object-cover"
          fill
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={"/blur-image.jpg"}
        />
        <div className="via-primary/30 to-primary absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent" />
      </div>
      <div className="absolute bottom-18 left-0 w-fit px-4 text-white">{contentChildren}</div>
      <div
        className="absolute right-0 bottom-6 left-4 w-fit xl:right-4 xl:bottom-4 xl:left-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {buttonChildren}
      </div>
      <div
        className="tag hidden border-0 xl:flex"
        style={
          {
            backgroundColor: childrenClassName,
            "--shadow-color": childrenClassName ?? "white",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
      <div
        className="curve_one hidden xl:flex"
        style={
          {
            left: (tagElementWidth ?? 0) - 1,
            "--shadow-color": childrenClassName ?? "white",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
