import React, { ComponentPropsWithoutRef, Fragment } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  repeat?: number;
  fadeBothSides?: boolean;
  rows?: number;
  vertical?: boolean;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  fadeBothSides = false,
  rows = 1,
  vertical = false,
  ...props
}: MarqueeProps) {
  // Convert children into an array so we can slice
  const childArray = React.Children.toArray(children);

  // Split children into rows evenly
  const perRow = Math.ceil(childArray.length / rows);
  const rowChunks = Array.from({ length: rows }).map((_, rowIndex) =>
    childArray.slice(rowIndex * perRow, (rowIndex + 1) * perRow)
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div
        {...props}
        className={cn("group flex gap-4 overflow-hidden p-2", vertical ? "flex-row" : "flex-col", className)}
      >
        {rowChunks.map((rowChildren, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 overflow-hidden">
            {Array.from({ length: repeat }).map((_, i) => (
              <div
                key={i}
                className={cn("animate-marquee flex w-max min-w-30 shrink-0 flex-row justify-around gap-4", {
                  "group-hover:[animation-play-state:paused]": pauseOnHover,
                  "[animation-direction:reverse]": rowIndex % 2 === 0 ? reverse : !reverse,
                  "animate-marquee-vertical flex-col": vertical,
                })}
              >
                {rowChildren}
              </div>
            ))}
          </div>
        ))}
      </div>
      {fadeBothSides && (
        <Fragment>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
        </Fragment>
      )}
    </div>
  );
}
