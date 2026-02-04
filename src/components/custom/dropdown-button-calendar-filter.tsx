"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { CalendarJson } from "@/server/serializers/pages/calendar-serializer";
import { CustomSlideFilter } from "../icons";
import { ButtonWithIcons } from "./buttons/button-with-icon";

interface FilterDropdownProps {
  tags: CalendarJson["tags"];
  filterLabel: string;
  isMobile?: boolean;
  allLabel?: string;
  minWidth?: string;
}

export const CalendarFilterDropdown = ({ tags, filterLabel, isMobile, allLabel, minWidth }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const allOption = { label: allLabel, key: allLabel?.toLowerCase() };

  const selectedTags = searchParams.getAll("tags");
  const isAllSelected = selectedTags.length === 0;

  const updateButtonWidth = useCallback(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useLayoutEffect(() => {
    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);
    return () => window.removeEventListener("resize", updateButtonWidth);
  }, [updateButtonWidth]);

  const handleTagSelect = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id !== 0) {
      params.set("tags", id.toString());
    } else {
      params.delete("tags");
    }
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ButtonWithIcons
          endIcon={CustomSlideFilter}
          showIcon
          iconClass="size-5 group-hover/button:text-white duration-300 transition-color"
          className={cn("text-primary-400 border bg-white hover:text-white has-[>svg]:pr-5.5 max-md:has-[>svg]:px-3.5")}
          ref={buttonRef}
        >
          {!isMobile && filterLabel}
        </ButtonWithIcons>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-50}
        className="bg-secondary rounded-2xl p-6 text-white"
        style={{ width: buttonWidth ? `${buttonWidth}px` : "auto", minWidth: minWidth }}
      >
        <ul className="flex flex-col gap-2 font-mono">
          <li
            key={allOption.key}
            className={cn(
              "hover:bg-secondary-300 cursor-pointer border-b border-[#c64b54] py-2 text-sm",
              isAllSelected && "bg-secondary-300"
            )}
            onClick={() => handleTagSelect(0)}
          >
            {allOption.label}
          </li>
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id!.toString());
            return (
              <li
                key={tag.id}
                className={cn(
                  "hover:bg-secondary-300 cursor-pointer border-b border-[#c64b54] py-2 text-sm",
                  isSelected && "bg-secondary-300"
                )}
                onClick={() => handleTagSelect(tag.id!)}
              >
                {tag.name}
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
