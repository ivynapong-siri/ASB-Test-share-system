import "@/client/styles/iframe.css";

import { PinGreenIcon, SearchELLIcon, YellowPencilIcon } from "@/components/icons";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { PatternStroke1 } from "@/components/shapes";
import { SectionJson } from "@/server/serializers/section-serializer";

interface EnglishLanguageLearnerELLFormProps {
  data: SectionJson;
  jotFormId: string;
}

const EnglishLanguageLearnerELLForm = ({ data, jotFormId }: EnglishLanguageLearnerELLFormProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-primary"
      className="flex-col gap-18 lg:flex-row lg:gap-36 lg:py-32"
      vectorChildren={
        <>
          <PatternStroke1
            className="absolute top-20 -right-24 h-28 w-50 rotate-12 rotate-x-180 lg:top-auto lg:right-auto lg:bottom-20 lg:-left-12 lg:h-[150px] lg:w-[340px] lg:rotate-0 lg:rotate-x-0"
            color="white"
          />
          <PinGreenIcon className="absolute top-8 right-5 h-8 w-6 rotate-y-180 lg:top-auto lg:right-auto lg:bottom-40 lg:left-12 lg:h-16 lg:w-16 lg:rotate-0 lg:rotate-y-0" />
          <SearchELLIcon className="absolute top-25 right-24 h-7 w-8 rotate-y-180 lg:top-auto lg:right-auto lg:bottom-24 lg:left-80 lg:h-14 lg:w-16 lg:rotate-x-0 lg:rotate-y-0" />
          <YellowPencilIcon
            className="absolute top-9 right-21 h-8 w-3 rotate-y-180 lg:top-auto lg:right-auto lg:bottom-58 lg:left-68 lg:h-17 lg:w-6 lg:rotate-y-0"
            color="white"
          />
        </>
      }
    >
      <div className="flex flex-col lg:max-w-[500px]">
        <ASBRibbonText title={data.ribbonText ?? ""} />
        <ASBTitle title={data.title ?? ""} className="pb-8 text-start text-white" />
        <ASBDescription description={data.description ?? ""} className="text-white" />
      </div>
      <div
        className="h-[750px] w-full rounded-4xl p-6 lg:h-[760px] lg:w-[630px]"
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='white' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
          borderRadius: 32,
        }}
      >
        <div className="h-[720px] w-full lg:h-[760px]">
          <iframe
            src={`https://form.jotform.com/${jotFormId}`}
            className="h-full w-full overflow-x-hidden border-none"
            allowFullScreen
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default EnglishLanguageLearnerELLForm;
