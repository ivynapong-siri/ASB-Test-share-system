"use client";

import { GlobeIcon, YellowPencilIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import LinkButton from "@/components/custom/buttons/link-button";
import DropDownList from "@/components/custom/drop-down-list";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdmissionAndProcessFAQSectionProps {
  faqsSectionData: SectionJson;
}

export default function AdmissionAndProcessFAQSection({ faqsSectionData }: AdmissionAndProcessFAQSectionProps) {
  const dropDownList = (faqsSectionData.faqs || []).map((faq, i) => ({
    id: i,
    titleText: faq.question,
    description: faq.answer,
  }));

  return (
    <SectionContainer
      className="items-center"
      vectorChildren={
        <>
          <YellowPencilIcon className="absolute top-25 left-47 hidden rotate-20 -rotate-y-190 lg:block" />
          <PatternStroke2 className="absolute -top-8 -left-24 w-64 rotate-[58deg] max-lg:hidden" />
          <div className="absolute -top-5 -right-5 -rotate-[25deg] max-lg:hidden">
            <div className="relative">
              <div className="absolute top-7 rotate-2">
                <GlobeIcon className="h-10 w-9" />
              </div>
              <PatternStroke1 className="w-72" />
            </div>
          </div>
        </>
      }
      sectionClassName="bg-muted overflow-hidden"
    >
      <ASBRibbonText className="translate-x-[32px]" title={faqsSectionData.ribbonText ?? ""} />
      <h1 className="text-primary-400 text-6xl font-semibold">{faqsSectionData.title ?? ""}</h1>
      <div className="my-16 w-full rounded-4xl bg-white p-2">
        <BoxBorderDashed color="secondary" stokeWidth={2} className="p-8">
          <DropDownList
            defaultActivateIndex={0}
            titleClassName="font-bold lg:font-semibold text-base lg:text-xl"
            descriptionClassName="font-mono max-md:text-sm/[1.75rem]"
            lists={dropDownList}
            openBehavior="single"
          />
        </BoxBorderDashed>
      </div>
      <LinkButton buttonText={faqsSectionData.buttonLabel ?? ""} href={faqsSectionData.buttonUrl ?? ""} />
    </SectionContainer>
  );
}
