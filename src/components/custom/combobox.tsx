"use client";

import React, { useState } from "react";

import { LucideIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

interface ComboboxProps<T> {
  data: T[];
  selectedItem?: string;
  emptyMessage?: string;
  placeholder?: string;
  commandInputPlaceholder: string;
  onSelect: (data: T | null) => void;
  onSearch?: (query: string) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  displayFunction: (data: T) => string;
  customSelectedDisplayFunction?: (data: T) => string;
  getItemValue: (value: T) => string;
  getItemKey: (value: T) => string;
  startIcon?: LucideIcon;
  iconClass?: string;
  disabled?: boolean;
}

export function Combobox<T>({
  data,
  selectedItem,
  emptyMessage = "No items.",
  placeholder = "Search...",
  commandInputPlaceholder,
  onSelect,
  onSearch,
  onLoadMore,
  isLoadingMore,
  displayFunction,
  customSelectedDisplayFunction,
  getItemValue,
  getItemKey,
  startIcon: StartIcon,
  iconClass,
  disabled = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const debounced = useDebouncedCallback((e: string) => {
    if (e === "") {
      return;
    }

    if (onSearch) {
      onSearch(e);
    }
  }, 300);

  const handleSelect = (value: string) => {
    const selectedItem = data.find((item) => displayFunction(item) === value) || null;
    setOpen(false);
    onSelect(selectedItem);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const listBox = event.currentTarget;
    if (listBox.scrollHeight - listBox.scrollTop === listBox.clientHeight) {
      onLoadMore?.();
    }
  };

  const itemList = () => (
    <Command
      filter={(value, search, keywords) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
      }}
      shouldFilter={onSearch ? false : true}
      value={selectedItem != null ? selectedItem : undefined}
    >
      <CommandInput placeholder={commandInputPlaceholder} onValueChange={(value) => debounced(value)} />
      <CommandList onScroll={handleScroll}>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup>
          {data.map((item) => (
            <CommandItem key={getItemKey(item)} value={displayFunction(item)} onSelect={handleSelect}>
              {displayFunction(item)}
            </CommandItem>
          ))}
          {isLoadingMore && (
            <CommandItem className="flex justify-center" disabled>
              <Spinner size={"small"} />
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  const triggerButton = () => {
    const selected = data.find((item) => getItemValue(item) === selectedItem);
    return (
      <Button variant="outline" disabled={disabled} className="group justify-start truncate whitespace-nowrap">
        {StartIcon && (
          <StartIcon
            className={cn("text-muted-foreground group-hover:text-primary size-4", iconClass ? iconClass : "")}
          />
        )}
        {selected
          ? customSelectedDisplayFunction
            ? customSelectedDisplayFunction(selected)
            : displayFunction(selected)
          : placeholder}
      </Button>
    );
  };

  // if (isDesktop) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton()}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        {itemList()}
      </PopoverContent>
    </Popover>
  );
  // }

  // return (
  //   <Drawer open={open} onOpenChange={setOpen}>
  //     <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
  //     <DrawerContent>
  //       <div className="mt-4 border-t">{itemList()}</div>
  //     </DrawerContent>
  //   </Drawer>
  // );
}
