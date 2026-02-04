import { BackPackIcon, ChemistryIcon, KnotIcon, PaintTubeIcon2 } from "@/components/icons";

import IntroSection from "@/components/shared/intro-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SchoolUniformIntroSectionProps {
  data: SectionJson;
}

export default function SchoolUniformIntroSection({ data }: SchoolUniformIntroSectionProps) {
  return (
    <IntroSection
      breadcrumbClickable={true}
      className="lg:pb-32"
      title={data.title}
      description={data.description}
      imageSrc={data.image?.imageUrl ?? ""}
      imageClassName="object-cover rotate-y-180"
      containerClassName="rotate-y-180"
      ribbonText={data.ribbonText}
      showStandardVector={false}
      textClassName="justify-center"
      showBreadcrumb={false}
      topLeftIcon={<PaintTubeIcon2 className="h-[32px] w-[24px] rotate-y-180 lg:h-15 lg:w-8" />}
      topRightIcon={<KnotIcon className="h-[22px] w-[23px] md:h-[25px] md:w-[24px] lg:h-[30px] lg:w-[29px]" />}
      bottomLeftIcon={<ChemistryIcon className="h-[34px] w-[30px] rotate-y-180 lg:h-15 lg:w-12" />}
      bottomRightIcon={<BackPackIcon className="h-[34px] w-[30px] rotate-y-180 lg:h-15 lg:w-14 lg:rotate-12" />}
      topLeftIconClassName="-left-4 top-0 xl:-left-18 xl:top-0"
      topRightIconClassName="-top-4 right-0 md:top-8 xl:-top-4 xl:right-0"
      bottomLeftIconClassName="-bottom-5 -left-5 xl:-bottom-10 xl:-left-20"
      bottomRightIconClassName="bottom-2 -right-5 xl:-bottom-10 xl:-right-8"
    />
  );
}
