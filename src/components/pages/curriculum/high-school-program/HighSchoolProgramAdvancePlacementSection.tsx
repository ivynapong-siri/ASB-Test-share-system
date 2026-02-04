"use client";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BlogCard from "@/components/custom/cards/blog-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface HighSchoolProgramAdvancePlacementSectionProps {
  data: SectionJson;
}

const RenderCards = ({ card, index }: { card: SectionCardJson; index: number }) => {
  const paddingIndex = (index + 1).toString().padStart(2, "0");
  const [firstPart] = card.title.split("XCL ASB Sukhumvit");

  return (
    <BlogCard
      title={!!firstPart ? firstPart : card.title}
      secondTitle="XCL ASB Sukhumvit"
      content={card.description}
      imgSrc={card.image?.imageUrl ?? ""}
      learnMoreHref={card.buttonUrl ?? "#"}
      badgeOnImage={true}
      badgeOnImageText={paddingIndex}
      classNameImg="max-md:h-60"
      classNameBadge="md:top-88 top-52 translate-y-1/2 z-20 h-8 w-16 justify-center flex bg-primary-200 text-white -rotate-3 text-base items-center"
      classNameFooter="mt-auto"
      classNameCardBody="min-h-auto grow bg-primary-gray rounded-b-4xl"
      buttonText={card.buttonLabel}
      classNameContentText="line-clamp-none"
      requiredSplitTitle={true}
    />
  );
};

export default function HighSchoolProgramAdvancePlacementSection({
  data,
}: HighSchoolProgramAdvancePlacementSectionProps) {
  return (
    <SectionContainer className="flex items-center justify-center max-md:pb-0 md:flex-col">
      <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
      <div className="flex w-full flex-col items-center gap-8 text-center lg:max-w-[910px] xl:max-w-[1080px]">
        <ASBTitle title={data.title ?? ""} className="max-md:max-w-[300px]" />
        <ASBDescription description={data.description ?? ""} className="" />
      </div>
      <div className="grid-col-1 grid w-full gap-8 pt-15 lg:grid-cols-2 lg:gap-4 lg:pt-8">
        {data.cards && data.cards.map((card, index) => <RenderCards key={card.id} card={card} index={index} />)}
      </div>
    </SectionContainer>
  );
}
