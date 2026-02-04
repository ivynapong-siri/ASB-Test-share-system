"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import DataTableContent from "@/components/data-table/data-table-content";
import { SectionContainer } from "@/components/custom/section-container";
import { TabArrowUpIcon } from "@/components/icons";
import { TuitionFees } from "@/server/models/model-types";
import { motion } from "framer-motion";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { useState } from "react";

interface TuitionAndFeesSectionProps {
  tuitionData: TuitionFees[];
}

function decodeHtmlEntities(html: string): string {
  if (typeof window === "undefined") return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function formatTuitionAndFees(data: TuitionFees[]) {
  return data.map((item) => {
    return {
      id: item.id,
      question: item.question,
      answer:
        item.type === "table" ? (
          <div className="flex flex-col space-y-5">
            {item.answer.description && (
              <p
                className="font-mono text-sm text-neutral-300 lg:text-base"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlContent(decodeHtmlEntities(item.answer.description)),
                }}
              />
            )}
            <div className="flex flex-col">
              <p className="text-primary-400 py-4 text-xl font-medium">{item.answer.header}</p>
              <DataTableContent
                data={item.answer.data}
                tableHeaderTitle={item.answer.header}
                mergeKey={item.answer.mergeKey}
                tableHeaderClassName="font-sans lg:font-semibold font-bold text-base lg:text-[20px]"
                className="items-start overflow-auto md:min-w-[600px] lg:items-center"
                requireHeader={item.requireHeader ?? true}
                requireMiddleTable={item.requireMiddleTable ?? false}
                wrapperTableClassName="min-w-[800px] overflow-x-auto"
                showHeader={false}
              />
            </div>
          </div>
        ) : item.type === "bullet" ? (
          <div>
            {item.answer.description && (
              <p
                className="font-mono text-sm text-neutral-300 lg:text-base"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlContent(decodeHtmlEntities(item.answer.description)),
                }}
              />
            )}
            <ul className="py-4">
              {item.answer.sections.map((bulletItem, index) => (
                <li key={index} className="font-mono text-sm lg:text-base">
                  {bulletItem.title && (
                    <p className="font-sans text-base font-bold lg:text-[20px]">{bulletItem.title}: </p>
                  )}
                  <ul className="list-disc py-4 pl-10 text-neutral-300">
                    {bulletItem.data.map((bullet, subIndex) => (
                      <li key={subIndex}>{bullet}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p
            className="font-mono text-sm text-neutral-300 lg:text-base"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlContent(decodeHtmlEntities(item.answer)),
            }}
          />
        ),
    };
  });
}

const TuitionAndFeesSection = ({ tuitionData }: TuitionAndFeesSectionProps) => {
  const [activeTuitionId, setActiveTuitionId] = useState<number | undefined>(
    tuitionData.length > 0 ? tuitionData[0].id : undefined
  );

  const handleAccordionToggle = (id: string | undefined) => {
    const newId = Number(id);
    setActiveTuitionId(activeTuitionId === newId ? undefined : newId);
  };

  const formattedData = formatTuitionAndFees(tuitionData);

  return (
    <>
      <SectionContainer>
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col lg:px-10"
          value={activeTuitionId?.toString()}
          onValueChange={handleAccordionToggle}
        >
          {formattedData.map(({ id, question, answer }) => (
            <AccordionItem
              key={id}
              value={id.toString()}
              className="data-[state=open]:rounded-2xl data-[state=open]:border-b-0 data-[state=open]:[background-image:var(--dash-bg)] data-[state=open]:bg-[length:100%_100%] data-[state=open]:bg-no-repeat data-[state=open]:p-10 [&:has(+_*[data-state=open])]:border-b-0"
              style={{
                ["--dash-bg" as any]: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23B81E29FF' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
              }}
            >
              <AccordionTrigger
                className="gap-4 py-7 text-sm leading-6 group-data-[state=open]:hidden hover:no-underline sm:gap-20"
                Icon={
                  <TabArrowUpIcon
                    className="bg-secondary h-8 w-8 shrink-0 rounded-full p-1.5 text-white transition-transform duration-300 md:h-10 md:w-10"
                    fill="#ffffff"
                  />
                }
              >
                <h6 className="text-primary-400 text-base/[1.5rem] font-semibold group-data-[state=open]:pl-1 md:text-[1.25rem]/[1.625rem]">
                  {question}
                </h6>
              </AccordionTrigger>
              <AccordionContent asChild>
                <motion.div
                  initial={{ opacity: 1, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="transition-all duration-300 ease-in-out"
                >
                  <div className="text-primary-400 w-full flex-col items-start gap-6 text-sm md:gap-9 lg:text-base">
                    {answer}
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContainer>
    </>
  );
};

export default TuitionAndFeesSection;
