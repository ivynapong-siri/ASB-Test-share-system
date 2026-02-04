"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

type CardStackCarouselProps<T> = {
  items: T[];
  activeIndex: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  visibleCount?: number;
  className?: string;
  vectorsChildren?: React.ReactNode;
};

const CardStackCarousel = <T,>({
  items,
  activeIndex,
  renderItem,
  visibleCount = 3,
  className = "",
  vectorsChildren,
}: CardStackCarouselProps<T>) => {
  const actualVisibleCount = Math.min(visibleCount, items.length);

  const visibleItems = useMemo(() => {
    const sliced = [];
    for (let i = 0; i < actualVisibleCount; i++) {
      const index = (activeIndex + i) % items.length;
      sliced.push({ item: items[index], position: i });
    }
    return sliced;
  }, [items, activeIndex, actualVisibleCount]);

  const positions = useMemo(() => {
    const basePositions = [
      { left: 0, bottom: 0, z: 3 },
      { left: 20, bottom: 20, z: 2 },
      { left: 40, bottom: 40, z: 1 },
    ];

    return basePositions.slice(0, actualVisibleCount);
  }, [actualVisibleCount]);

  return (
    <div className={cn("relative flex w-fit flex-col items-center justify-center")}>
      <div className={className}>
        {vectorsChildren}
        <AnimatePresence initial={false}>
          {visibleItems.map(({ item, position }, i) => {
            const { left, bottom, z } = positions[position] || {
              left: 0,
              bottom: 0,
              z: 1,
            };
            const isTop = i === 0;

            return (
              <motion.div
                key={(item as any).id ?? i}
                className="absolute h-fit w-fit"
                style={{
                  left,
                  bottom,
                  zIndex: z,
                }}
                initial={isTop ? { opacity: 1, scale: 1 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  isTop
                    ? {
                        opacity: 0,
                        scale: 1.1,
                        y: -50,
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
                transition={{ duration: 0.3 }}
              >
                {renderItem(item, position)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardStackCarousel;
