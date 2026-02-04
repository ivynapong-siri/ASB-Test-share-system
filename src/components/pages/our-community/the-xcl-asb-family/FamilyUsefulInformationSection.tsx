"use client";

import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface FamilyUsefulInformationSectionProps {
  data: SectionJson;
}

const RenderSectionDetail = ({ card }: { card: SectionCardJson }) => {
  return (
    <>
      <div className="flex flex-col border-b-1">
        <h5 className="text-primary pb-4 text-3xl font-bold">{card.title}</h5>
        <p className="text-neutral pb-8 font-mono text-sm">{card.description}</p>
        <div className="mb-6">
          <LinkButton buttonText={card.buttonLabel} href={card.buttonUrl} linkClassName="has-[>svg]:pl-8" />
        </div>
      </div>
    </>
  );
};

const FamilyUsefulInformationSection = ({ data }: FamilyUsefulInformationSectionProps) => {
  return (
    <SectionContainer sectionClassName="bg-primary-gray" className="pb-0">
      <ASBTitle title={data.title ?? ""} className="pb-8 text-start" />
      <div className="flex flex-col gap-16 md:gap-20 md:pt-16 lg:gap-30 xl:flex-row">
        <div className="relative h-86 w-full md:h-140 xl:h-180 xl:flex-1">
          <Image alt="useful" src={data.image?.imageUrl ?? ""} fill className="rounded-t-4xl object-cover" priority />
        </div>

        <div className="grid grid-cols-1 gap-6 divide-y-1 xl:w-120">
          {data.cards && data.cards.map((e) => <RenderSectionDetail card={e} key={e.id} />)}
        </div>
      </div>
    </SectionContainer>
  );
};

export default FamilyUsefulInformationSection;
