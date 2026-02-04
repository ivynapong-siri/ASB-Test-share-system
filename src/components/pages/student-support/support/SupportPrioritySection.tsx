import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import LinkButton from "../../../custom/buttons/link-button";

interface SupportPrioritySectionProps {
  data: SectionJson;
}

const renderRedCard = (data: SectionCardJson[]) => {
  return (
    <>
      {data.map((item, index) => (
        <HoverCard
          className="col-span-1"
          descriptionClassName="font-mono font-normal"
          description={item.description}
          title={item.title}
          backgroundContent={<Image src={item.image?.imageUrl ?? ""} alt={`${index}`} fill className="object-cover" />}
          key={index}
          contentClassName="min-w-0"
          contentStyleTranslation={-16}
        />
      ))}
    </>
  );
};

const SupportPrioritySection = ({ data }: SupportPrioritySectionProps) => {
  return (
    <SectionContainer sectionClassName="bg-primary" className="items-center px-4 pb-20 md:px-10">
      <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
      <ASBTitle title={data.title ?? ""} className="text-white" />
      <ASBDescription
        description={data.description ?? ""}
        className="pt-4 text-center text-white lg:max-w-lg lg:pt-8 xl:max-w-2xl"
      />

      <div className="mt-9 grid w-full grid-cols-1 gap-4 p-4 pb-8 md:grid-cols-2 lg:pb-12 xl:grid-cols-3">
        {renderRedCard(data.cards ?? [])}
      </div>

      <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? ""} linkButtonVariant="secondary" />
    </SectionContainer>
  );
};

export default SupportPrioritySection;
