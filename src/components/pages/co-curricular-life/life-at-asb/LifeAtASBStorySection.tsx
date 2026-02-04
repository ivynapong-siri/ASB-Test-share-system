import { BluePencil, GlueTube, HighlightPen, KnotIcon } from "@/components/icons";

import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface LifeAtASBStorySectionProps {
  data: SectionJson;
}

const LifeAtASBStorySection = ({ data }: LifeAtASBStorySectionProps) => {
  return (
    <IntroSection
      textClassName="xl:max-w-[600px]"
      imageSrc={data.image?.imageUrl || ""}
      title={data.title}
      description={data.description}
      ribbonText={data.ribbonText}
      showBreadcrumb={false}
      reverse={true}
      haveButton={true}
      buttonConfig={{
        buttonText: data.buttonLabel ?? "",
        href: data.buttonUrl ?? "/",
      }}
      className="max-md:pt-24"
      ribbonClassName="max-md:max-w-[190px]"
      containerClassName="rotate-y-180"
      imageClassName="rotate-y-180"
      showStandardVector={false}
      topLeftIcon={<BluePencil className="h-[42px] w-[23px] md:h-[42px] md:w-[24px] xl:h-[52px] xl:w-[29px]" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] xl:h-[30px] xl:w-[29px]" />}
      bottomLeftIcon={
        <HighlightPen className="h-[24px] w-[25px] rotate-y-180 md:h-[25px] md:w-[24px] xl:h-[56px] xl:w-[63px]" />
      }
      bottomRightIcon={
        <GlueTube className="h-[22px] w-[23px] rotate-y-180 md:h-[25px] md:w-[24px] xl:h-[57px] xl:w-[35px]" />
      }
      topLeftIconClassName="-left-10 top-0 lg:-left-10 lg:top-5 rotate-y-180"
      topRightIconClassName="-top-4 right-0 lg:top-8 xl:-top-4 xl:right-0"
      bottomLeftIconClassName="-bottom-8 -left-8 md:bottom-4 md:-left-8 lg:bottom-4 lg:left-0 xl:-bottom-10 xl:-left-10 rotate-y-180"
      bottomRightIconClassName="-bottom-10 right-0 md:bottom-0 md:-right-6 lg:bottom-4 lg:-right-6 xl:-bottom-10 xl:-right-10 rotate-y-180"
    />
  );
};

export default LifeAtASBStorySection;
