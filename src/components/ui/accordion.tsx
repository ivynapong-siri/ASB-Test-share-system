"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { AnimatePresence, motion } from "framer-motion"; // Added import

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItemContext = React.createContext<{ isOpen: boolean }>({ isOpen: false });

export function useAccordionItemContext() {
  return React.useContext(AccordionItemContext);
}

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item ref={ref} value={value} className={cn("border-border border-b", className)} {...props}>
        {children}
      </AccordionPrimitive.Item>
    );
  }
);

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  Icon?: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, AccordionTriggerProps>(
  ({ className, children, Icon, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-left font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {Icon ? (
          <React.Fragment>{Icon}</React.Fragment>
        ) : (
          <ChevronDownIcon
            width={16}
            height={16}
            strokeWidth={2}
            className="shrink-0 opacity-60 transition-transform duration-200"
            aria-hidden="true"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  childrenClassName?: string;
}

const AccordionContent = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, AccordionContentProps>(
  ({ className, children, childrenClassName, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!contentRef.current) return;
      const observer = new MutationObserver(() => {
        const state = contentRef.current?.parentElement?.getAttribute("data-state");
        setIsOpen(state === "open");
      });

      observer.observe(contentRef.current.parentElement!, {
        attributes: true,
        attributeFilter: ["data-state"],
      });

      // Initial state
      const initialState = contentRef.current.parentElement?.getAttribute("data-state");
      setIsOpen(initialState === "open");

      return () => observer.disconnect();
    }, []);

    return (
      <AccordionPrimitive.Content ref={ref} asChild forceMount {...props}>
        <div ref={contentRef}>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="accordion-content"
                initial={{ height: 0, opacity: 1 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 1 }}
                transition={{
                  height: { duration: 0.4, ease: "easeInOut" },
                  opacity: { duration: 0.3, delay: 0.1 },
                }}
                className={cn("overflow-hidden text-sm", className)}
              >
                <div className={cn("pt-0 pb-4 transition", childrenClassName)}>{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AccordionPrimitive.Content>
    );
  }
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
