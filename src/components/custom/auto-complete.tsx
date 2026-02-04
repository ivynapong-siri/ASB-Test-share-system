import { useRef, useState } from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Spinner } from "../ui/spinner";

type AutoCompleteProps<T> = {
  data: T[];
  selectedItem: T | null;
  searchValue?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  isLoadingMore?: boolean;
  shouldFilter?: boolean;
  displayFunction?: (value: T) => string;
  getItemValue: (value: T) => string;
  onSelect: (value: T | null) => void;
  onSearch?: (value: string) => void;
  onLoadMore?: () => void;
  filterFunction?: (value: T, searchValue: string) => boolean;
  valueKey: keyof T;
  displayKey: keyof T;
};

export function AutoComplete<T>({
  selectedItem,
  onSelect,
  searchValue,
  onSearch,
  data,
  isLoading,
  emptyMessage = "No items.",
  placeholder = "Search...",
  onLoadMore,
  isLoadingMore,
  displayFunction,
  getItemValue,
  shouldFilter = true,
  filterFunction,
  valueKey,
  displayKey,
}: AutoCompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    onSearch?.(" ");
    onSelect(null);
  }

  const onSelectItem = (inputValue: string) => {
    const newSelectedItem = data.find((item) => getItemValue(item) === inputValue);
    if (newSelectedItem) {
      onSelect(newSelectedItem);
      onSearch?.(displayFunction ? displayFunction(newSelectedItem) : String(newSelectedItem[displayKey]));
    }
    setOpen(false);
  };

  function onScroll(event: React.SyntheticEvent) {
    const listboxNode = event.currentTarget as HTMLElement;
    if (Math.round(listboxNode.scrollTop + listboxNode.clientHeight) === listboxNode.scrollHeight) {
      onLoadMore?.();
    }
  }

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      selectedItem && onSearch?.(getItemValue(selectedItem) ?? "");
    }
  }

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <Command shouldFilter={shouldFilter} onKeyDown={onScroll} {...(filterFunction && { filterFunction })}>
          <PopoverPrimitive.Anchor>
            <div className="relative w-full">
              <PopoverTrigger asChild onClick={() => setOpen(true)}>
                <CommandPrimitive.Input
                  asChild
                  value={searchValue}
                  onKeyDown={(e) => setOpen(e.key !== "Escape")}
                  onValueChange={onSearch}
                >
                  <Input placeholder={placeholder} className="w-full pr-20" ref={inputRef} />
                </CommandPrimitive.Input>
              </PopoverTrigger>
              <div className="absolute top-0 right-2 bottom-0 flex h-full items-center gap-2 overflow-hidden">
                {selectedItem && searchValue && (
                  <Button
                    className="h-6 w-6 rounded-full"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={reset}
                    onKeyDown={(e: { key: string }) => {
                      if (e.key === "Enter") {
                        reset();
                      }
                    }}
                  >
                    <X />
                  </Button>
                )}
                <PopoverTrigger asChild>
                  <Button
                    className="h-6 w-6 rounded-full"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => inputRef.current?.focus()}
                    onKeyDown={(e: { key: string }) => {
                      inputRef.current?.focus();
                      setOpen(e.key !== "Escape");
                    }}
                  >
                    <ChevronDown className={cn("h-4 w-4", open ? "rotate-180 transform" : "")} />
                  </Button>
                </PopoverTrigger>
              </div>
            </div>
          </PopoverPrimitive.Anchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e: { preventDefault: () => any }) => e.preventDefault()}
            onInteractOutside={(event) => {
              if (event.target instanceof Element && event.target.hasAttribute("cmdk-input")) {
                event.preventDefault();
              }
            }}
            className="w-[200px] p-0"
            align="start"
          >
            {open && (
              <CommandList onScroll={onScroll}>
                {isLoading && (
                  <div className="flex justify-center p-4">
                    <Spinner size={"small"} />
                  </div>
                )}
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={getItemValue(item)}
                      value={getItemValue(item)}
                      onMouseDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                      onSelect={onSelectItem}
                      className="flex w-full items-center justify-start"
                    >
                      <span>{displayFunction ? displayFunction(item) : String(item[displayKey])}</span>
                      <Check
                        className={cn(
                          "ml-2 h-4 w-4",
                          selectedItem && displayFunction
                            ? displayFunction(selectedItem) === displayFunction(item)
                            : selectedItem && String(selectedItem[displayKey]) === String(item[displayKey])
                              ? "opacity-100"
                              : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                  {isLoadingMore && (
                    <CommandItem className="flex justify-center" disabled>
                      <Spinner size={"small"} />
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            )}
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
