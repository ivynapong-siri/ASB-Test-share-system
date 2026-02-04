import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface HighSchoolProgramRobustDynamicSectionProps {
  data: SectionJson;
}

const RenderCards = ({ card }: { card: SectionCardJson }) => {
  return (
    <div className="bg-primary-gray flex w-full gap-4 rounded-4xl px-9 py-8 max-md:flex-col md:items-center lg:gap-6">
      <div className="relative h-13 w-12 md:pl-20 lg:h-25 lg:w-24">
        <Image alt="clock" src={card.image2?.imageUrl ?? ""} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-primary-400 font-sans text-2xl font-semibold">{card.title}</p>
        <p className="text-neutral font-mono text-sm">{card.description}</p>
      </div>
    </div>
  );
};

export default function HighSchoolProgramRobustDynamicSection({ data }: HighSchoolProgramRobustDynamicSectionProps) {
  return (
    <SectionContainer
      className="items-center"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute -top-8 right-6 h-20 w-40 translate-x-1/2 -rotate-14 lg:-top-19 lg:right-15 lg:h-37 lg:w-83" />
          <PatternStroke2 className="absolute top-0 left-4 h-36 w-49 -translate-x-1/2 rotate-12 max-md:hidden lg:h-72 lg:w-[392px]" />
        </>
      }
    >
      <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
      <div className="flex w-full max-w-[662px] flex-col gap-8 text-center">
        <ASBTitle title={data.title ?? ""} className="" />
        <ASBDescription description={data.description ?? ""} className="pb-15" />
      </div>
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="relative h-64 w-full lg:col-span-3 lg:h-auto">
          <Image src={data.image?.imageUrl ?? ""} alt="" fill className="rounded-[50px] object-cover" />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          {data.cards && data.cards.map((card) => <RenderCards key={card.id} card={card} />)}
        </div>
      </div>
    </SectionContainer>
  );
}
