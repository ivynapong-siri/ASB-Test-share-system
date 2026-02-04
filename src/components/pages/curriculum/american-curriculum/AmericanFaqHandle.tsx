"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

import { AltArrowDown } from "@/components/icons";
import { cn } from "@/lib/utils";
import { FAQJson } from "@/server/serializers/faq-serializer";

interface AmericanFaqHandleProps {
  faqs: FAQJson[];
}

export function AmericanFaqHandle({ faqs }: AmericanFaqHandleProps) {
  const [activeFaqId, setActiveFaqId] = useState<string>();

  const handleAccordionToggle = (value: string) => {
    setActiveFaqId(value);
  };

  useEffect(() => {
    if (faqs.length > 0) {
      setActiveFaqId(faqs[0].id.toString()); // open the first by default
    }
  }, [faqs]);

  return (
    <div className="flex w-full">
      <Accordion type="single" className="w-full" value={activeFaqId} onValueChange={handleAccordionToggle}>
        {faqs.map(({ id, question, answer }) => {
          const currentId = id.toString();
          const isActive = activeFaqId === currentId;

          return (
            <AccordionItem
              key={currentId}
              value={currentId}
              className={cn(
                "py-2",
                !isActive && "border-b border-dashed border-[#45A9E0]",
                isActive &&
                  "border-b border-[#45A9E0] bg-gradient-to-b from-transparent via-[#F3F5F6]/10 to-[#F3F5F6]/100"
              )}
            >
              <AccordionTrigger
                className="group gap-4 py-2 text-sm leading-6 hover:no-underline sm:gap-20"
                Icon={
                  <AltArrowDown
                    className={cn(
                      "fill-primary group-hover:fill-secondary group-hover:rotate-180",
                      "border-primary group-hover:border-secondary h-8 w-8 rounded-full border border-dashed p-1 transition-transform duration-200",
                      "group-data-[state=open]:fill-secondary group-data-[state=open]:border-secondary group-data-[state=open]:rotate-180"
                    )}
                  />
                }
              >
                <span className="flex items-center gap-3 lg:max-w-[670px]">
                  <span
                    className={cn(
                      "text-base font-medium md:text-xl",
                      isActive ? "text-secondary-300" : "text-neutral-400"
                    )}
                  >
                    {question}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="mt-4 flex flex-col gap-10 text-start font-mono text-sm font-normal text-neutral-400 lg:max-w-[670px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
