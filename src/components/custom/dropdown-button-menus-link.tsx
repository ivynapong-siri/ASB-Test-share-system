"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { MenuItemJson } from "@/server/serializers/page-settings";
import { AltArrowDown } from "../icons";
import { Button } from "../ui/button";

interface DropdownButtonMenusLinkProps {
  options: MenuItemJson[];
  headerContent: string;
  showHeaderContent?: boolean;
  iconIsBorder?: boolean;
  onOptionSelect?: (selectedId: number) => void;
  buttonClassName?: string;
  selected: MenuItemJson | null;
}

const DropdownButtonMenusLink = ({
  options,
  headerContent,
  showHeaderContent = true,
  iconIsBorder,
  selected,
  buttonClassName,
}: DropdownButtonMenusLinkProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [linkWidth, setLinkWidth] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateLinkWidth = useCallback(() => {
    if (buttonRef.current) {
      setLinkWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateLinkWidth();
    window.addEventListener("resize", updateLinkWidth);
    return () => {
      window.removeEventListener("resize", updateLinkWidth);
    };
  }, [updateLinkWidth]);

  return (
    <div className="flex w-full p-1.5">
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => {
          setIsPopoverOpen(open);
          if (open) updateLinkWidth();
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant={"secondary"}
            ref={buttonRef}
            className={cn(
              "group flex w-full min-w-[270px] items-center justify-between truncate rounded-3xl border border-white/50 px-4 py-2 font-mono text-sm text-white hover:bg-red-900 hover:opacity-100",
              buttonClassName
            )}
          >
            {selected?.title || "Select Option"}
            <div className="rounded-full border border-dashed border-white p-2 transition-all group-hover:rotate-180">
              <AltArrowDown
                className={cn(
                  "fill-white",
                  iconIsBorder && "h-5 w-5 rounded-full border border-dashed border-white p-1 group-hover:rotate-180"
                )}
              />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          sideOffset={-70}
          className="bg-secondary rounded-2xl p-6 text-white"
          style={{ width: linkWidth ? `${linkWidth}px` : "auto" }}
        >
          {showHeaderContent && (
            <div
              onClick={() => setIsPopoverOpen(false)}
              className="mb-6 flex items-center justify-between gap-4 border-b border-white pb-6"
            >
              <div className="font-medium text-white">{headerContent}</div>
              <AltArrowDown
                className={cn(
                  "rotate-180 fill-white",
                  iconIsBorder && "h-5 w-5 rounded-full border border-dashed border-white p-1"
                )}
              />
            </div>
          )}
          <ul className="flex flex-col gap-2 font-mono">
            {options.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer border-b border-[#c64b54] py-2 text-sm hover:bg-red-900"
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              >
                <a href={option.url} className="text-white no-underline">
                  {option.title}
                </a>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DropdownButtonMenusLink;
