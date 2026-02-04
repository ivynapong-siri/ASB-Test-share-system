import { KnotIcon } from "@/components/icons";
import { PatternStroke2 } from "@/components/shapes";
import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SupportIPastoralSectionProps {
  data: SectionJson;
}

const SupportIPastoralSection = ({ data }: SupportIPastoralSectionProps) => {
  return (
    <IntroSection
      className="lg:gap-[180px]"
      title={data.title}
      description={data.description}
      ribbonText={data.ribbonText}
      imageSrc={data.image?.imageUrl ?? ""}
      showStandardVector={false}
      showBreadcrumb={false}
      haveButton={true}
      buttonConfig={{
        buttonText: data.buttonLabel ?? "",
        href: data.buttonUrl ?? "",
      }}
      vectorChildren={
        <PatternStroke2 className="absolute top-80 -right-20 h-[132px] w-[180px] rotate-210 md:-top-48 md:-right-24 md:h-[265px] md:w-[360px]" />
      }
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      topRightIconClassName="-top-1 right-4 md:-top-3 lg:-top-4 xl:-top-2 xl:right-2"
      topRightIcon={<KnotIcon className="h-[19px] w-[18px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
    />
  );
};

export default SupportIPastoralSection;
