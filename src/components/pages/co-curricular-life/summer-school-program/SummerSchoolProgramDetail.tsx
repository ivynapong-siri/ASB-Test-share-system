"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SummerSchoolDifferentProgramSectionProps from "./SummerSchoolDifferentProgramSection";
import SummerSchoolOfferingSection from "./SummerSchoolOfferingSectionOfferingSection";
import SummerSchoolProgramApplySection from "./SummerSchoolProgramApplySection";
import SummerSchoolProgramIntroSection from "./SummerSchoolProgramIntroSection";
import SummerSchoolProgramTitleSection from "./SummerSchoolProgramTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface SummerSchoolProgramDetailProps {
  data: CoCurricularLifeJson;
}

const SummerSchoolProgramDetail = ({ data }: SummerSchoolProgramDetailProps) => {
  const { sections } = data;
  const [introSection, offeringSection, differentProgramSection, applyNowSection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <SummerSchoolProgramTitleSection data={data} />
      <SummerSchoolProgramIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <SummerSchoolOfferingSection data={offeringSection} />
      </LazySection>

      <LazySection>
        <SummerSchoolDifferentProgramSectionProps data={differentProgramSection} />
      </LazySection>

      <LazySection>
        <SummerSchoolProgramApplySection data={applyNowSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="summer-school-program"
          carouselName="summerSchoolProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default SummerSchoolProgramDetail;
