"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
}

const LazySection = memo(
  ({ children, fallback, className, threshold = 0.1, rootMargin = "50px", minHeight = "400px" }: LazySectionProps) => {
    const { elementRef, isIntersecting } = useIntersectionObserver({
      threshold,
      rootMargin,
      triggerOnce: true,
    });

    const defaultFallback = <div className="animate-pulse bg-gray-50" style={{ minHeight }} />;

    return (
      <div ref={elementRef} className={cn("w-full", className)}>
        {isIntersecting ? children : fallback || defaultFallback}
      </div>
    );
  }
);

LazySection.displayName = "LazySection";

export default LazySection;
