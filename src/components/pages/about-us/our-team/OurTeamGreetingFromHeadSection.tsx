import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface OurTeamGreetingFromHeadSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const OurTeamGreetingFromHeadSection = ({ data, breadcrumbData }: OurTeamGreetingFromHeadSectionProps) => {
  const currentData = data.cards?.[0];

  return (
    <SectionContainer
      className="px-0 max-md:pt-0"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute -top-20 -right-60 hidden h-[265px] w-[360px] xl:block" />
          <PatternStroke1 className="absolute top-1/2 -left-12 h-[265px] w-[360px]" />
        </>
      }
    >
      <div className="relative flex flex-col gap-24 px-0 pt-24 pb-0 lg:pt-20 xl:container xl:mx-auto xl:gap-16 xl:px-10 2xl:gap-28">
        <div className="px-10 xl:px-0">
          <BreadcrumbCustom
            data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
          />
        </div>

        <PatternStroke1
          className="absolute bottom-32 left-0 h-[77px] w-[170px] md:h-[150px] md:w-[240px] lg:h-[265px] lg:w-[360px]"
          color="white"
        />

        <div className="absolute -right-6 bottom-0 z-10 h-[350px] w-[230px] sm:h-[450px] sm:w-[300px] md:h-[600px] md:w-[400px] lg:h-[750px] lg:w-[500px] xl:-left-10 xl:rotate-y-180 2xl:left-0 2xl:h-[870px] 2xl:w-[580px]">
          <Image alt="" src={currentData?.image?.imageUrl ?? ""} fill priority />
        </div>

        <div className="bg-primary flex w-full flex-col px-10 py-[4.125rem] pb-[18.75rem] text-white md:pb-[24rem] lg:pr-32 lg:pb-[35rem] xl:container xl:ml-auto xl:w-[950px] xl:rounded-4xl xl:pb-[4.125rem] xl:pl-[12.5rem]">
          <ASBRibbonText title={data.ribbonText ?? ""} ribbonClassName="max-sm:w-40 w-auto" className="pb-6 lg:pb-0" />
          <ASBTitle title={currentData?.title ?? ""} className="text-start text-white" />
          <p
            className="py-8 font-mono"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlContent((currentData?.description ?? "").replace(/\r?\n/g, "<br />")),
            }}
          />
          <LinkButton
            buttonText={currentData?.buttonLabel ?? ""}
            href={currentData?.buttonUrl}
            linkClassName="text-sm py-1 px-4 bg-white text-primary hover:text-white"
            iconClassName="size-6 p-1 border-primary text-secondary group-hover/button:text-white group-hover/button:border-white"
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default OurTeamGreetingFromHeadSection;
