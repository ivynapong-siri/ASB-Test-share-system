import { KnotIcon } from "@/components/icons";
import { PatternStroke1 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SchoolBusServiceSectionProps {
  data: SectionJson;
}

const SchoolBusServiceSection = ({ data }: SchoolBusServiceSectionProps) => {
  return (
    <IntroSection
      className="max-md:pb-0 lg:gap-[180px]"
      title={data.title}
      titleClassName="max-w-sm"
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl ?? ""}
      showStandardVector={false}
      showBreadcrumb={false}
      reverse={true}
      haveButton={true}
      buttonConfig={{
        buttonText: data.buttonLabel ?? "",
        href: data.buttonUrl ?? "",
      }}
      vectorChildren={
        <PatternStroke1 className="absolute top-93 -left-30 h-[75px] w-[170px] -rotate-30 rotate-y-180 md:-top-50 md:-left-32 lg:-top-32 lg:-left-32 lg:h-[265px] lg:w-[360px] xl:-top-50 xl:-left-32" />
      }
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      topRightIconClassName="-top-1 right-4 md:-top-3 lg:top-1 xl:-top-2 xl:right-2"
      topRightIcon={<KnotIcon className="h-[19px] w-[18px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
    />
  );
};

export default SchoolBusServiceSection;
