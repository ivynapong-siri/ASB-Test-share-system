"use client";

import { GlobeIcon, YellowPencilIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBFormDescription from "@/components/custom/asb-form-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { ApplicationPortalPageJson } from "@/server/serializers/pages/admission-serializer";
import Image from "next/image";
interface PortalDetailProps {
  data: ApplicationPortalPageJson;
}

export default function ApplicationPortalDetail({ data }: PortalDetailProps) {
  return (
    <SectionContainer
      sectionClassName="overflow-x-hidden overflow-y-hidden"
      className="z-10 items-center pt-72 pb-80 sm:pb-100 lg:pt-60 lg:pb-[700px]"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-48 -left-32 z-1 h-32 w-44 rotate-45 xl:top-40 xl:-left-32 xl:h-[265px] xl:w-[360px]" />
          <YellowPencilIcon className="absolute top-[235px] left-[68px] z-1 h-9 w-5 rotate-12 rotate-y-180 xl:top-[250px] xl:left-[270px] xl:h-[70px] xl:w-[42px]" />

          <PatternStroke1 className="absolute top-40 -right-28 z-1 h-32 w-44 -rotate-16 xl:top-64 xl:-right-32 xl:h-[265px] xl:w-[360px]" />
          <GlobeIcon className="absolute top-[230px] right-12 z-1 h-9 w-5 xl:top-[380px] xl:right-[180px] xl:h-[70px] xl:w-[42px]" />

          <div className="absolute bottom-0 left-1/2 -z-1 h-[400px] w-screen -translate-x-1/2 overflow-hidden sm:h-[650px] lg:h-[1000px] lg:w-[1200px]">
            <Image
              alt=""
              src={
                data.image?.imageUrl ??
                "https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/application-portal-pc-hero-scaled.png"
              }
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center justify-items-center gap-4">
        <div>
          <ASBRibbonText title={data.ribbonText} className="translate-x-8 justify-center" />
          <ASBTitle title={data.title1} title2={data.title2} />
        </div>
        <ASBFormDescription description={data.description} className="my-8 text-center" />
        <BoxBorderDashed color="secondary" stokeWidth={2} className="max-w-4xl p-8">
          {data.instructions.map((instruction, index) => (
            <div key={index}>
              <div className="mb-6">
                <h3 className="text-primary text-xl font-semibold">{instruction.title}</h3>
                <p className="text-primary mt-4 font-mono text-base">{instruction.description}</p>
              </div>
              {data.instructions.length !== index + 1 && <div className="mb-3 border-b border-neutral-200" />}
            </div>
          ))}
        </BoxBorderDashed>

        <div className="flex flex-col items-center justify-items-center gap-4">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlContent((data?.instructionEnd ?? "").replace(/\r?\n/g, "<br />")),
            }}
            className="instruction-text pt-8 text-center font-mono text-base/[1.625rem] text-neutral-400 lg:max-w-xl lg:py-8"
          />
          <LinkButton buttonText={data.buttonLabel} href={data.buttonUrl} />
        </div>
      </div>
    </SectionContainer>
  );
}
