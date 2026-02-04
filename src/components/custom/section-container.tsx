import { ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  sectionClassName?: string;
  className?: string;
  vectorChildren?: ReactNode;
}

export const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ sectionClassName, children, vectorChildren, className }, ref) => {
    return (
      <section className={cn("relative", sectionClassName)}>
        {vectorChildren}
        <div ref={ref} className={cn("flex flex-col px-10 py-16 lg:py-20 xl:container xl:mx-auto", className)}>
          {children}
        </div>
      </section>
    );
  }
);

SectionContainer.displayName = "SectionContainer";
