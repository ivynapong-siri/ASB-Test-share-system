import { BookIcon, KnotIcon, LightBulbIcon, MagnifyIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import IntroSection from "@/components/shared/intro-section";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionJson } from "@/server/serializers/section-serializer";

interface EnglishLanguageLearnerProgramIntroSectionProps {
  introData: SectionJson;
  breadcrumbData: BreadcrumbProps;
}

const EnglishLanguageLearnerProgramIntroSection = ({
  introData,
  breadcrumbData,
}: EnglishLanguageLearnerProgramIntroSectionProps) => {
  return (
    <IntroSection
      ribbonText={introData.ribbonText}
      breadcrumbs1={breadcrumbData.breadcrumb1}
      breadcrumbs2={breadcrumbData.breadcrumb2}
      title={introData.title}
      description={introData.description}
      imageSrc={introData.image?.imageUrl ?? ""}
      topLeftIcon={<LightBulbIcon className="h-8 w-6 lg:h-16 lg:w-12" />}
      topLeftIconClassName="top-0 left-0 lg:-left-4 -translate-x-full"
      topRightIcon={<KnotIcon className="h-[24px] w-[22px] lg:h-8 lg:w-8" />}
      topRightIconClassName="top-4 right-0 -translate-y-full"
      bottomLeftIcon={<BookIcon className="h-[24px] w-[41px] lg:h-8 lg:w-18" />}
      bottomLeftIconClassName="-bottom-4 lg:-bottom-8 -left-8 lg:-left-12"
      bottomRightIcon={<MagnifyIcon className="h-[17px] w-5 lg:h-10 lg:w-10" />}
      bottomRightIconClassName="-bottom-2 lg:-bottom-6 -right-4 lg:-right-8"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute top-12 -right-40 h-32 w-64 lg:-top-20 lg:-right-60 lg:h-[265px] lg:w-[360px] xl:-top-30" />
          <PatternStroke1 className="absolute -bottom-30 -left-13 h-[74px] w-[166px] lg:-bottom-16 lg:h-[148px] lg:w-[333px]" />
        </>
      }
    />
  );
};

export default EnglishLanguageLearnerProgramIntroSection;
