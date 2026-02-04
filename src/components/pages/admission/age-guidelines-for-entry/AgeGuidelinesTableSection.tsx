import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { SectionContainer } from "@/components/custom/section-container";
import DataTableContent from "@/components/data-table/data-table-content";
import { AltArrowDown } from "@/components/icons";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import { TuitionFees } from "@/server/models/model-types";
import { motion } from "framer-motion";
import { useState } from "react";

interface AgeGuidelinesTableSectionProps {
  data: TuitionFees[];
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
                className="min-w-[600px] items-start overflow-auto lg:items-center"
                requireHeader={item.requireHeader ?? true}
                requireMiddleTable={item.requireMiddleTable ?? false}
                wrapperTableClassName="min-w-[800px] overflow-x-auto overflow-hidden rounded-xl border border-gray-100"
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

const AgeGuidelinesTableSection = ({ data }: AgeGuidelinesTableSectionProps) => {
  const [activeTuitionId, setActiveTuitionId] = useState<number | undefined>(data.length > 0 ? data[0].id : undefined);

  const handleAccordionToggle = (id: string | undefined) => {
    const newId = Number(id);
    setActiveTuitionId(activeTuitionId === newId ? undefined : newId);
  };

  const formattedData = formatTuitionAndFees(data);

  return (
    <>
      <SectionContainer>
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col px-10"
          value={activeTuitionId?.toString()}
          onValueChange={handleAccordionToggle}
          style={{
            backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23B81E29FF' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
            borderRadius: 16,
          }}
        >
          {formattedData.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id.toString()}>
              <AccordionTrigger
                className="gap-4 py-7 text-sm leading-6 group-data-[state=open]:hidden hover:no-underline sm:gap-20"
                Icon={
                  <AltArrowDown
                    data-state={activeTuitionId?.toString() === id.toString() ? "open" : "closed"}
                    className={cn(
                      "fill-secondary group-hover:rotate-180 group-hover:fill-white",
                      "border-secondary group-hover:border-secondary h-8 w-8 rounded-full border border-dashed p-1 transition-transform duration-200",
                      "data-[state=open]:border-secondary data-[state=open]:fill-secondary data-[state=open]:rotate-180"
                    )}
                  />
                }
              >
                <span className="text-primary-400 text-base font-semibold group-data-[state=open]:pl-1 md:text-[20px]">
                  {question}
                </span>
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

export default AgeGuidelinesTableSection;
