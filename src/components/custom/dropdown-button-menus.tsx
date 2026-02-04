"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { SectionTabJson } from "@/server/serializers/tab-serializer";
import { AltArrowDown } from "../icons";
import { Button } from "../ui/button";

interface DropdownButtonMenusProps {
  options: SectionTabJson[];
  headerContent: string;
  showHeaderContent?: boolean;
  iconIsBorder?: boolean;
  onOptionSelect?: (selectedId: number) => void;
  buttonClassName?: string;
  containerClassName?: string;
  variant?: "default" | "secondary";
}

const DropdownButtonMenus = ({
  options,
  headerContent,
  showHeaderContent = true,
  iconIsBorder,
  onOptionSelect,
  buttonClassName,
  containerClassName,
  variant = "secondary",
}: DropdownButtonMenusProps) => {
  const [selectedOption, setSelectedOption] = useState<SectionTabJson>(options[0]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateButtonWidth = useCallback(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateButtonWidth();
    window.addEventListener("resize", updateButtonWidth);
    return () => {
      window.removeEventListener("resize", updateButtonWidth);
    };
  }, [updateButtonWidth]);

  return (
    <div className={cn("flex w-full rounded-full bg-[#254069] p-1.5", containerClassName)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={variant}
            ref={buttonRef}
            className={cn(
              "flex w-full min-w-[270px] items-center justify-between rounded-full px-6 py-2 font-mono text-white md:min-w-[360px]",
              buttonClassName
            )}
          >
            {selectedOption.title}
            <div className="rounded-full border border-dashed border-white p-2">
              <AltArrowDown
                className={cn(
                  "fill-white",
                  iconIsBorder && "h-5 w-5 rounded-full border border-dashed border-white p-1"
                )}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={-65}
          alignOffset={-80}
          className="bg-secondary rounded-2xl p-6 text-white"
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}
        >
          {showHeaderContent && (
            <div
              onClick={() => setIsPopoverOpen(false)}
              className="mb-6 flex items-center justify-between gap-4 border-b border-white pb-6"
            >
              <p className="font-medium text-white">{headerContent}</p>
              <div className="rounded-full border border-dashed border-white p-2">
                <AltArrowDown
                  className={cn(
                    "rotate-180 fill-white",
                    iconIsBorder && "h-5 w-5 rounded-full border border-dashed border-white p-1"
                  )}
                />
              </div>
            </div>
          )}
          <ul className="flex flex-col gap-2 font-mono">
            {options.map((option) => (
              <li
                key={option.id}
                className="hover:bg-secondary cursor-pointer border-b py-2 text-sm"
                onClick={() => {
                  setIsPopoverOpen(false);
                  setSelectedOption(option);
                  onOptionSelect?.(option.id);
                }}
              >
                <span>{option.title}</span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownButtonMenus;
