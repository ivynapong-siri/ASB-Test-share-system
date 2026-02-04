"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { AltArrowDown } from "../icons";

interface DropDownListProps {
  lists: { id: number; titleText: string; description: string }[];
  titleClassName?: string;
  defaultActivateIndex?: number;
  descriptionClassName?: string;
  openBehavior?: "single" | "multiple";
}

export default function DropDownList({
  lists,
  titleClassName,
  descriptionClassName,
  defaultActivateIndex,
  openBehavior = "multiple",
}: DropDownListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActivateIndex ?? null);

  return (
    <ul>
      {lists.map((list, index) => (
        <DropDownComponent
          key={list.id}
          titleClassName={titleClassName}
          descriptionClassName={descriptionClassName}
          titleText={list.titleText}
          description={list.description}
          defaultActive={index === defaultActivateIndex}
          isSingleOpen={openBehavior === "single"}
          isActive={openBehavior === "single" ? activeIndex === index : undefined}
          onToggle={
            openBehavior === "single" ? () => setActiveIndex((prev) => (prev === index ? null : index)) : undefined
          }
        />
      ))}
    </ul>
  );
}

interface DropDownComponentProps {
  titleText: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  defaultActive?: boolean;
  isSingleOpen?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
}

function DropDownComponent({
  titleText,
  description,
  titleClassName,
  descriptionClassName,
  defaultActive,
  isSingleOpen = false,
  isActive,
  onToggle,
}: DropDownComponentProps) {
  const [activate, setActivate] = useState<boolean>(defaultActive ?? false);

  function navigateToggle() {
    if (isSingleOpen && onToggle) {
      onToggle();
    } else {
      setActivate((p) => !p);
    }
  }

  const active = isSingleOpen ? isActive : activate;

  return (
    <li className="flex flex-col gap-4 border-b-2 pt-4">
      <div className="flex items-center justify-between py-2">
        <h1 className={`text-primary-400 ${titleClassName || ""}`}>{titleText}</h1>
        <div
          className="rounded-full border border-dashed border-white p-2 transition-transform"
          style={{ transform: `rotate(${(active ? 1 : 0) * 180}deg)` }}
          onClick={navigateToggle}
        >
          <AltArrowDown
            className={cn("fill-secondary", "border-secondary h-8 w-8 rounded-full border border-dashed p-1")}
          />
        </div>
        {/* <div style={{ transform: `rotate(${(active ? -1 : 1) * 90}deg)` }} className="transition-transform">
          <NavigationRoundedButton onClick={navigateToggle} direction="next" navigationName="drop-down" />
        </div> */}
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className={`mb-4 text-neutral-300 lg:mb-7 ${descriptionClassName || ""}`}>{description}</p>
      </motion.div>
    </li>
  );
}
