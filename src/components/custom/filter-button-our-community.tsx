import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface FilterButtonProps {
  options: Record<string, string>;
  onChange?: (selectedId: string) => void;
  isAnimating?: boolean;
}

const FilterButtonOurCommunity = ({ options, onChange }: FilterButtonProps) => {
  const optionEntries = Object.entries(options).map(([key, value], index) => ({
    id: key,
    title: value,
    index,
  }));
  const [selectedId, setSelectedId] = useState<string>(optionEntries[0].id.toLowerCase());
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicatorStyle = () => {
      const activeButton = containerRef.current?.querySelector<HTMLButtonElement>(`[data-id="${selectedId}"]`);
      if (activeButton) {
        const { offsetLeft, offsetWidth, offsetHeight } = activeButton;
        const containerHeight = containerRef.current?.offsetHeight || 0;
        const topOffset = (containerHeight - offsetHeight) / 2;
        setIndicatorStyle({
          transform: `translateX(${offsetLeft}px)`,
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
          top: `${topOffset}px`,
        });
      }
    };
    updateIndicatorStyle();
  }, [selectedId]);

  const handleButtonClick = (id: string) => {
    setSelectedId(id.toLowerCase());
    onChange?.(id.toLowerCase());
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center space-x-2 rounded-full p-1.5 font-mono text-base")}
    >
      <div
        className="bg-primary absolute left-0 rounded-full transition-transform duration-300"
        style={indicatorStyle}
      />
      {optionEntries.map((option) => (
        <Button
          key={option.id}
          data-id={option.id}
          type="button"
          onClick={() => handleButtonClick(option.id)}
          className={cn(
            "relative z-10 flex items-center justify-between rounded-full bg-white px-2 py-4 text-sm tracking-widest shadow-none transition-colors hover:cursor-pointer xl:px-6",
            "text-primary hover:bg-primary hover:text-white",
            {
              "bg-primary text-white": selectedId === option.id,
            }
          )}
        >
          <span className="uppercase">{option.title}</span>
          <span className="ml-4 text-lg leading-none">+</span>
        </Button>
      ))}
    </div>
  );
};

export default FilterButtonOurCommunity;
