import LinkButton from "@/components/custom/buttons/link-button";
import HoverCard from "@/components/custom/cards/hover-card";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import StudentSupportTitleSection from "../StudentSupportTitleSection";

interface UniversityPreparationCollegeReadyFutureSectionProps {
  data: SectionJson;
}

const UniversityPreparationCollegeReadyFutureSection = ({
  data,
}: UniversityPreparationCollegeReadyFutureSectionProps) => {
  let title;
  if (data.titleLine1 && data.titleLine2) {
    title = `${data.titleLine1 ?? data.titleLine1} ${data.titleLine2 ?? data.titleLine2}`;
  } else {
    title = data.title ?? "";
  }

  return (
    <StudentSupportTitleSection
      absTitle={data.ribbonText ?? ""}
      titleClassName="max-w-3xl"
      descriptionClassName="max-w-2xl"
      headTitle={title ?? ""}
      containerClassName="py-0 pb-10"
      description={data.description ?? ""}
      isPrimaryColor
    >
      <>
        <div className="mt-9 grid w-full grid-cols-1 gap-4 p-4 max-md:pb-8 lg:grid-cols-2 xl:grid-cols-3">
          {data.cards &&
            data.cards.map((card: SectionCardJson) => (
              <HoverCard
                className="col-span-1"
                reduceTitleStyle={true}
                descriptionClassName="font-mono font-normal"
                description={card.description}
                title={card.title}
                backgroundContent={
                  <Image
                    src={card.image?.imageMediumLargeUrl || card.image?.imageUrl || ""}
                    alt={`help-card-${card.id}`}
                    fill
                    className="object-cover"
                    priority
                  />
                }
                key={card.id}
              />
            ))}
        </div>
        <div className="flex h-11 w-full items-center justify-center lg:hidden">
          <LinkButton
            buttonText={data.buttonLabel ?? "View safety and security"}
            href={data.buttonUrl ?? ""}
            linkButtonVariant="secondary"
          />
        </div>
      </>
    </StudentSupportTitleSection>
  );
};

export default UniversityPreparationCollegeReadyFutureSection;
