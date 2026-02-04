"use client";

import { AlarmClockIcon, BackPackIcon, KnotIcon, SchoolBusIcon } from "@/components/icons";

import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FamilyInvolvementSectionProps {
  data: SectionJson;
}

const FamilyInvolvementSection = ({ data }: FamilyInvolvementSectionProps) => {
  return (
    <IntroSection
      className="max-md:pt-5"
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      showBreadcrumb={false}
      haveButton={true}
      buttonConfig={{
        buttonText: data.buttonLabel ?? "",
        href: data.buttonUrl ?? "",
      }}
      reverse={true}
      imageSrc={data.image?.imageUrl || ""}
      title={data.title}
      description={data.description}
      ribbonText={data.ribbonText}
      topLeftIcon={<SchoolBusIcon className="h-[32px] w-[42px] lg:h-[48px] lg:w-[70px]" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] lg:h-[38px] lg:w-[36px]" />}
      bottomLeftIcon={<AlarmClockIcon className="h-[32px] w-[28px] lg:h-[64px] lg:w-[49px]" />}
      bottomRightIcon={<BackPackIcon className="h-[28px] w-[25px] lg:h-[55px] lg:w-[48px]" />}
      topLeftIconClassName="-left-7 top-0 lg:-left-15 xl:-left-16 lg:-top-4 xl:top-5 rotate-y-180 rotate-14"
      topRightIconClassName="-top-4 right-0 lg:-top-4 lg:right-0"
      bottomLeftIconClassName="-bottom-4 -left-0 lg:-bottom-10 lg:-left-6 rotate-y-180"
      bottomRightIconClassName="-bottom-2 -right-6 lg:-bottom-12 lg:-right-8 xl:-right-12 rotate-24"
      showStandardVector={false}
    />
  );
};

export default FamilyInvolvementSection;
