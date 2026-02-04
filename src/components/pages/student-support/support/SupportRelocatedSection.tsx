import { KnotIcon } from "@/components/icons";
import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SupportRelocatedSectionProps {
  data: SectionJson;
}

const SupportRelocatedSection = ({ data }: SupportRelocatedSectionProps) => {
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
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      topRightIconClassName="-top-1 right-4 md:-top-3 lg:-top-0 xl:-top-2 xl:right-2"
      topRightIcon={<KnotIcon className="h-[19px] w-[18px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
    />
  );
};

export default SupportRelocatedSection;
