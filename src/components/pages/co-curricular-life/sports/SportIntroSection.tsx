import { BasketBallIcon, FootBallIcon, KnotIcon, VolleyBallIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SportIntroSectionProps {
  data: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

export default function SportIntroSection({ data, breadcrumbData }: SportIntroSectionProps) {
  return (
    <IntroSection
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      imageClassName="rotate-y-180"
      containerClassName="rotate-y-180"
      imageSrc={data.image?.imageUrl || ""}
      title={data.title}
      description={data.description}
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-14 -right-10 h-[132px] w-[130px] rotate-x-180 rotate-y-180 lg:-top-32 lg:-right-36 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke1 className="absolute bottom-24 -left-20 z-10 h-19 w-42 rotate-30 max-sm:translate-y-full lg:top-[450px] lg:rotate-30 xl:top-[420px] xl:-left-18 xl:h-38 xl:w-84 xl:rotate-35 2xl:top-[590px]" />
        </>
      }
      className="pb-32"
      ribbonText={data.ribbonText ?? ""}
      topLeftIcon={<FootBallIcon className="h-[30px] w-[30px] xl:h-15 xl:w-15" />}
      topLeftIconClassName="top-0 -left-4 xl:-top-8 xl:-left-10"
      topRightIcon={<KnotIcon className="h-[23px] w-[22px] md:h-6 md:w-6 xl:h-8 xl:w-8" />}
      topRightIconClassName="-top-4 xl:-top-5 right-0"
      bottomRightIcon={<BasketBallIcon className="h-[26px] w-[26px] md:h-10 md:w-10 xl:h-14 xl:w-14" />}
      bottomRightIconClassName="rotate-y-180 xl:-bottom-8 -bottom-4 -right-6 xl:-right-12 md:-right-12"
      bottomLeftIcon={<VolleyBallIcon className="h-[27px] w-[27px] md:h-9 md:w-9 xl:h-14 xl:w-14" />}
      bottomLeftIconClassName="-bottom-2 xl:-bottom-10 -left-4 xl:-left-20 md:-left-8"
    />
  );
}
