import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { SectionTabJson } from "@/server/serializers/tab-serializer";
import { Button } from "../ui/button";

interface FilterButtonProps {
  options: SectionTabJson[];
  defaultOption?: number;
  onChange?: (selectedId: number) => void;
  variant?: "primary" | "secondary";
  buttonClassName?: string;
  className?: string;
  customMinusTopOffset?: number;
}

const FilterButton = ({
  options,
  onChange,
  defaultOption,
  variant = "primary",
  buttonClassName,
  className,
  customMinusTopOffset = 2,
}: FilterButtonProps) => {
  const [selectedId, setSelectedId] = useState<number>(defaultOption ?? options[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicatorStyle = () => {
      const activeButton = containerRef.current?.querySelector<HTMLButtonElement>(`[data-id="${selectedId}"]`);
      const container = containerRef.current;

      if (activeButton && container) {
        const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeButton;
        const containerTop = container.getBoundingClientRect().top;
        const buttonTop = activeButton.getBoundingClientRect().top;
        const topOffset = buttonTop - containerTop;

        setIndicatorStyle({
          transform: `translateX(${offsetLeft}px)`,
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
          top: `${topOffset - customMinusTopOffset}px`,
        });
      }
    };

    updateIndicatorStyle();
    window.addEventListener("resize", updateIndicatorStyle);
    return () => window.removeEventListener("resize", updateIndicatorStyle);
  }, [selectedId]);

  const handleButtonClick = (id: number) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center space-x-2 rounded-full p-1 font-mono text-base",
        variant == "primary" ? "bg-[#254069]" : "border border-[#254069]/20 bg-white",
        className
      )}
    >
      <div
        className="bg-secondary absolute left-0 rounded-full transition-transform duration-300"
        style={indicatorStyle}
      />
      {options.map((option) => (
        <Button
          key={option.id}
          data-id={option.id}
          type="button"
          onClick={() => handleButtonClick(option.id)}
          className={cn(
            "hover:bg-primary relative z-10 rounded-full bg-transparent px-4 py-6 text-sm tracking-widest shadow-none transition-colors hover:cursor-pointer",
            variant == "primary" ? "" : "text-primary hover:text-white",
            {
              "text-white hover:bg-transparent": selectedId === option.id,
            },
            buttonClassName
          )}
        >
          {option.title.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default FilterButton;
