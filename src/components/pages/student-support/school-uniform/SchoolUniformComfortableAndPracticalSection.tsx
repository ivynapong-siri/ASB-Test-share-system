import HoverCard from "@/components/custom/cards/hover-card";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import StudentSupportTitleSection from "../StudentSupportTitleSection";

interface SchoolUniformComfortableAndPracticalSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function SchoolUniformComfortableAndPracticalSection({
  data,
  breadcrumbData,
}: SchoolUniformComfortableAndPracticalSectionProps) {
  return (
    <StudentSupportTitleSection
      breadcrumbData={breadcrumbData}
      absTitle={data.ribbonText ?? ""}
      headTitle={data.title ?? ""}
      description={data.description ?? ""}
      className="lg:mt-24"
      containerClassName="px-4 max-md:pb-0"
      titleClassName="max-w-2xl"
      descriptionClassName="max-w-2xl mb-16"
      haveLine
    >
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 md:gap-4">
        {data?.cards &&
          data.cards.map((card) => (
            <HoverCard
              isHover={false}
              backgroundContent={
                <Image
                  src={card.image?.imageUrl ?? ""}
                  fill
                  className="object-cover"
                  alt={`school-uniform-${card.id}`}
                />
              }
              key={card.id}
              title={card.title}
              className="col-span-1 w-full max-md:h-52 md:aspect-[589/642]"
              titleClassName="max-md:text-base"
              descriptionClassName="font-mono"
              contentClassName="min-w-0"
            />
          ))}
      </div>
    </StudentSupportTitleSection>
  );
}
