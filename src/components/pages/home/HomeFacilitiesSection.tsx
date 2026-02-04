import ASBDescription from "@/components/custom/asb-description";
import { AnimatedFadeInWhenVisible } from "@/components/shared/animation-section";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
import ASBRibbonText from "../../custom/asb-ribbon-text";
import LinkButton from "../../custom/buttons/link-button";
import HoverCard from "../../custom/cards/hover-card";
import { SectionContainer } from "../../custom/section-container";

interface HomeFacilitiesSectionProps {
  facilitiesData: SectionJson;
}

const renderCard = (data: SectionCardJson[]) => {
  return data?.map((value) => {
    return (
      <div key={value.id} className="flex w-full">
        <HoverCard
          key={`Hover-Card-${value.id}`}
          className="w-full"
          title={value.title}
          backgroundContent={
            <Image
              key={value.image?.id}
              alt={value.title}
              src={value.image?.imageMediumLargeUrl || value.image?.imageLink || "/mock-image.jpg"}
              fill
              className="rounded-2xl object-cover transition-all duration-300 ease-out group-hover:scale-120"
              priority
            />
          }
          customBackground
          backgroundClassName="via-70%"
          isHover={false}
        />
      </div>
    );
  });
};

const HomeFacilitiesSection = ({ facilitiesData }: HomeFacilitiesSectionProps) => {
  const splitTitle = (facilitiesData.header ?? "").split("Our");

  return (
    <SectionContainer>
      <AnimatedFadeInWhenVisible>
        <>
          <ASBRibbonText title={facilitiesData.ribbonText ?? ""} />
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-10 2xl:gap-28">
            {splitTitle.length > 1 ? (
              <div className="flex flex-col xl:min-w-[668px] 2xl:max-w-[600px]">
                <h2>{splitTitle[0]}</h2>
                <h2 className="">{`Our ${splitTitle[1]}`}</h2>
              </div>
            ) : (
              <h2>{facilitiesData.header ?? ""}</h2>
            )}
            <ASBDescription description={facilitiesData.description ?? ""} className="lg:max-w-[500px] xl:max-w-full" />
          </div>
        </>
      </AnimatedFadeInWhenVisible>

      <AnimatedFadeInWhenVisible className="flex flex-col items-center justify-center gap-8 pt-16 xl:gap-12 xl:pt-20">
        <>
          {facilitiesData.cards && (
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderCard(facilitiesData.cards)}
            </div>
          )}
          <LinkButton buttonText={facilitiesData.buttonLabel ?? ""} href={facilitiesData.buttonUrl ?? "/"} />
        </>
      </AnimatedFadeInWhenVisible>
    </SectionContainer>
  );
};

export default HomeFacilitiesSection;
