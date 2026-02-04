"use client";

import { useEffect, useState } from "react";

import { SectionCardJson } from "@/server/serializers/card-serializer";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { NavigationRoundedButton } from "../buttons/navigation-rounded-button";
import SubstractBackground from "../substract-background";

interface GalleryModalProps {
  slides: SectionCardJson[];
  currentIndex: number;
  onClose: () => void;
}

export default function GalleryModal({ slides, currentIndex, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  function handleNavigate(direction: "prev" | "next") {
    setIndex((p) => {
      if (direction === "prev") {
        if (p === 0) return slides.length - 1;
        return p - 1;
      }
      return (p + 1) % slides.length;
    });
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex h-dvh w-full items-center justify-center bg-black/80 p-8">
      <div className="relative w-full max-w-4xl rounded-4xl px-5 pt-16 pb-4 max-md:bg-white md:p-16">
        <div
          onClick={() => onClose()}
          className="bg-primary absolute top-4 right-4 flex size-10 items-center justify-center rounded-full hover:cursor-pointer"
        >
          <XIcon className="size-8 text-white" />
        </div>

        <div className="relative aspect-[913/528] w-full">
          <Image
            src={slides[index].image?.imageUrl ?? ""}
            alt="showing-image"
            fill
            className="rounded-4xl object-cover select-none"
          />
        </div>
        <div className="mt-8 grid grid-cols-5 gap-4 max-md:hidden">
          {[...slides.slice(index + 1), ...slides.slice(0, index)].slice(0, 5).map((slide, inx) => (
            <div key={slide.id} className="relative aspect-square">
              <Image
                src={slide.image?.imageUrl ?? ""}
                alt={`other-image-${inx}`}
                fill
                className="rounded-3xl object-cover select-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 md:hidden">
          {[...slides.slice(index + 1), ...slides.slice(0, index)].slice(0, 3).map((slide, inx) => (
            <div key={slide.id} className="relative aspect-square">
              <Image
                src={slide.image?.imageUrl ?? ""}
                alt={`other-image-${inx}`}
                fill
                className="rounded-3xl object-cover select-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-4 md:hidden">
          <NavigationRoundedButton
            className="flex aspect-square w-14 items-center justify-center"
            onClick={() => {
              handleNavigate("prev");
            }}
            navigationName=""
            direction="prev"
          />
          <NavigationRoundedButton
            className="flex aspect-square w-14 items-center justify-center"
            onClick={() => {
              handleNavigate("next");
            }}
            navigationName=""
            direction="next"
          />
        </div>
        <div className="max-md:hidden">
          <div
            onClick={() => {
              handleNavigate("prev");
            }}
            className="absolute top-[276px] -left-2 aspect-square w-[323px] -translate-1/2"
          >
            <Image src="/arrow-circular.svg" alt="arrow-circular-left" fill className="object-cover" />
          </div>
          <div
            onClick={() => {
              handleNavigate("next");
            }}
            className="absolute top-[278px] -right-2 -z-20 aspect-square w-[323px] translate-x-1/2 -translate-y-1/2"
          >
            <Image src="/arrow-circular.svg" alt="arrow-circular-left" fill className="rotate-180 object-cover" />
          </div>
          <div className="absolute top-0 left-0 -z-10 h-full w-full">
            <SubstractBackground height="154px" topAreaClassName="" />
          </div>
        </div>
      </div>
    </div>
  );
}
