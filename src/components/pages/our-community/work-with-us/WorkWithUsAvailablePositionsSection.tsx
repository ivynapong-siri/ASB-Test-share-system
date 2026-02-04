"use client";

import { AltArrowDown, BuildingIcon, LocationIcon } from "@/components/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import { renderHtmlContent } from "../../admission/admission-process/AdmissionAndProcessJourneyStepComponent";

interface WorkWithUsAvailablePositionsSectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
}

function AddNewLineChar(text: string) {
  const index = text.search(/\?/);
  if (index === -1) {
    return text;
  }
  return text.slice(0, index + 1) + "\n" + text.slice(index + 1, text.length);
}

function extractEmail(text: string): string | null {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : null;
}

const Banner = ({ navBox }: { navBox: NavBoxJson | null }) => {
  const email = extractEmail(navBox?.buttonLabel ?? "");

  const handleEmailClick = (email: string | null) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="bg-secondary-300 mt-15 w-full">
      <div className="my-5 w-full border-y border-dashed border-white py-9">
        <div className="mx-auto flex w-96 flex-col items-center justify-center gap-10 px-10 max-sm:w-full lg:w-[992px] lg:flex-row xl:container">
          <p className="text-center font-sans font-semibold whitespace-pre-line text-white lg:hidden lg:text-xl">
            {AddNewLineChar(navBox?.title ?? "")}
          </p>
          <p className="text-center font-sans font-semibold whitespace-pre-line text-white max-lg:hidden lg:text-xl/[1.625rem]">
            {navBox?.title}
          </p>
          <LinkButton
            onClick={(e) => {
              e?.preventDefault();
              handleEmailClick(email);
            }}
            buttonText={navBox?.buttonLabel ?? ""}
            href={navBox?.buttonUrl ?? ""}
            linkButtonVariant="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default function WorkWithUsAvailablePositionsSection({
  data,
  navBox,
}: WorkWithUsAvailablePositionsSectionProps) {
  const [activeCardId, setActiveCardId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setActiveCardId(undefined);
  }, []);

  const handleAccordionToggle = (id: string | undefined) => {
    const newId = Number(id);
    setActiveCardId(activeCardId === newId ? undefined : newId);
  };

  return (
    <>
      <SectionContainer sectionClassName="bg-linear-to-b from-[#F3F5F6] to-[#F3F5F600]">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <div className="flex w-full flex-col gap-8 pb-15 xl:flex-row xl:gap-30">
          <ASBTitle title={data.title ?? ""} className="text-start text-nowrap" />
          <ASBDescription
            description={data.description ?? ""}
            className="w-auto lg:text-sm/[1.25rem] xl:max-w-[500px]"
          />
        </div>

        <div className="flex w-full flex-col">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={activeCardId?.toString()}
            onValueChange={handleAccordionToggle}
          >
            {data.cards &&
              data.cards.map(
                ({ id, title, subtitle, subject, description, richTextDescription, buttonLabel, buttonUrl }) => {
                  const convertedText = renderHtmlContent(richTextDescription);
                  return (
                    <AccordionItem key={id} value={id.toString()} className="border-0 py-1">
                      <AccordionTrigger className="gap-4 py-2 hover:no-underline sm:gap-20" Icon={<></>}>
                        <div className="group flex w-full max-lg:flex-col">
                          <div
                            className="relative border border-dashed border-[#9EB2C8] px-6 py-8 group-hover:border-solid data-[state=open]:border-solid max-lg:rounded-t-[50px] max-lg:border-b-0 lg:w-full lg:rounded-l-[50px] lg:border-r-0 lg:px-25"
                            data-state={activeCardId?.toString() === id.toString() ? "open" : "closed"}
                          >
                            <h6 className="text-primary-400 pb-6 font-sans text-xl font-semibold">{title}</h6>
                            <div className="flex gap-2 pb-3">
                              <LocationIcon className="h-5 w-5" />
                              <p className="text-neutral font-mono text-sm font-normal">{subtitle}</p>
                            </div>
                            <div className="flex gap-2 lg:pb-6">
                              <BuildingIcon className="h-5 w-5" />
                              <p className="text-neutral font-mono text-sm font-normal">{subject}</p>
                            </div>
                            <AccordionContent childrenClassName="max-md:pb-0">
                              {richTextDescription ? (
                                <>
                                  <p className="text-neutral font-mono text-sm font-normal">{description}</p>
                                  <ul className="text-neutral list-disc pl-5 font-mono text-sm font-normal">
                                    {convertedText.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <p className="text-neutral font-mono text-sm font-normal">{description}</p>
                              )}
                              <div className="pt-6">
                                <LinkButton buttonText={buttonLabel} href={buttonUrl} />
                              </div>
                            </AccordionContent>
                          </div>
                          <div
                            className="group-hover:bg-primary-300 data-[state=open]:bg-primary-300 flex items-center justify-center border border-solid border-[#9EB2C8] px-6 py-3.5 max-lg:rounded-b-[50px] lg:w-21 lg:rounded-r-[50px] lg:py-8"
                            data-state={activeCardId?.toString() === id.toString() ? "open" : "closed"}
                          >
                            <AltArrowDown
                              data-state={activeCardId?.toString() === id.toString() ? "open" : "closed"}
                              className={cn(
                                "fill-secondary group-hover:rotate-180 group-hover:fill-white",
                                "border-secondary h-8 w-8 rounded-full border border-dashed p-1 transition-transform duration-200 group-hover:border-white",
                                "data-[state=open]:rotate-180 data-[state=open]:border-white data-[state=open]:fill-white"
                              )}
                            />
                          </div>
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  );
                }
              )}
          </Accordion>
        </div>
      </SectionContainer>
      <Banner navBox={navBox} />
    </>
  );
}
