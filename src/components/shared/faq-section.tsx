"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import ASBRibbonText from "../custom/asb-ribbon-text";
import { BoxBorderDashed } from "../custom/box-border-dashed";
import BreadcrumbCustom from "../custom/breadcrumb-custom";
import { SectionContainer } from "../custom/section-container";
import { TabArrowDownIcon } from "../icons";

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  ribbonText?: string;
  ribbonClassName?: string;
  showBreadcrumb?: boolean;
  vectorChildren?: ReactNode;
  title?: string;
  questionClassName?: string;
  answerClassName?: string;
  faqListClassName?: string;
  customIcon?: ReactNode;
  faqs: Faq[];
  variant?: "primary" | "secondary";
  breadcrumbs1?: string;
  breadcrumbs2?: string;
  activeFirstQuestion?: boolean;
  borderDashClassName?: string;
  className?: string;
}

export function FaqSection({
  ribbonText,
  ribbonClassName,
  showBreadcrumb,
  faqs,
  title,
  questionClassName,
  customIcon,
  answerClassName,
  faqListClassName,
  vectorChildren,
  variant = "secondary",
  breadcrumbs1,
  breadcrumbs2,
  activeFirstQuestion = false,
  borderDashClassName,
  className,
}: FaqSectionProps) {
  const [activeFaqId, setActiveFaqId] = useState<number | undefined>(() => {
    if (activeFirstQuestion && faqs.length > 0) {
      return faqs[0].id;
    }
    return undefined;
  });

  useEffect(() => {
    if (activeFirstQuestion && faqs.length > 0) {
      setActiveFaqId(faqs[0].id);
    } else {
      setActiveFaqId(undefined);
    }
  }, [ribbonText, activeFirstQuestion, faqs]);

  const handleAccordionToggle = (id: string | undefined) => {
    const newId = Number(id);
    setActiveFaqId(activeFaqId === newId ? undefined : newId);
  };

  return (
    <SectionContainer vectorChildren={vectorChildren} className={cn("gap-10 max-md:pb-0 lg:gap-20", className)}>
      {showBreadcrumb && <BreadcrumbCustom data={{ breadcrumbs1: breadcrumbs1, breadcrumbs2: breadcrumbs2 }} />}
      <div className="flex w-full flex-col items-center gap-2">
        {ribbonText && <ASBRibbonText title={ribbonText} className={cn("w-fit lg:translate-x-8", ribbonClassName)} />}
        <h1 className="text-primary w-fit text-[2rem]/[2rem] font-semibold lg:text-[3.875rem]/[4.375rem]">
          {title || "FAQ"}
        </h1>
      </div>
      <BoxBorderDashed
        className={cn("relative", borderDashClassName)}
        color={variant === "primary" ? "white" : "secondary"}
        borderRadius={50}
        stokeWidth={2}
      >
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={activeFaqId?.toString()}
          onValueChange={handleAccordionToggle}
        >
          {faqs.map(({ id, question, answer }, index) => (
            <AccordionItem
              key={id}
              value={id.toString()}
              className={cn("py-2", index === faqs.length - 1 && "border-0", faqListClassName)}
            >
              <AccordionTrigger
                className="gap-4 py-2 text-sm leading-6 hover:no-underline sm:gap-20"
                Icon={
                  customIcon || (
                    <TabArrowDownIcon
                      className="bg-secondary h-8 min-w-10 rounded-full p-1 text-white transition-transform duration-200 md:h-10 md:w-10 md:p-1.5"
                      fill="#ffffff"
                    />
                  )
                }
              >
                <h6 className={cn("text-primary text-base font-medium md:text-lg", questionClassName)}>{question}</h6>
              </AccordionTrigger>
              <AccordionContent
                className={cn("text-primary mt-4 flex flex-col gap-10 font-mono text-sm lg:text-base", answerClassName)}
              >
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {variant === "primary" && (
          <div className="bg-primary-400 outline-primary-400 absolute inset-0 -z-10 rounded-4xl outline-8" />
        )}
      </BoxBorderDashed>
    </SectionContainer>
  );
}
