"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import ApplyNowSection from "@/components/shared/apply-now-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import EnglishLanguageLearnerProgramAcrossSection from "./EnglishLanguageLearnerProgramAcrossSection";
import EnglishLanguageLearnerProgramBenefitSection from "./EnglishLanguageLearnerProgramBenefitSection";
import EnglishLanguageLearnerProgramIntroSection from "./EnglishLanguageLearnerProgramIntroSection";
import EnglishLanguageLearnerProgramTitleSection from "./EnglishLanguageLearnerProgramTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface EnglishLanguageLearnerProgramDetailProps {
  data: CurriculumPageJson;
}

const EnglishLanguageLearnerProgramDetail = ({ data }: EnglishLanguageLearnerProgramDetailProps) => {
  const { sections } = data;
  const [introSection, benefitSection, acrossSection, ellSection, applyNowSection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <EnglishLanguageLearnerProgramTitleSection titleData={data} />
      <EnglishLanguageLearnerProgramIntroSection introData={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <EnglishLanguageLearnerProgramBenefitSection benefitData={benefitSection} />
      </LazySection>

      <LazySection>
        <EnglishLanguageLearnerProgramAcrossSection acrossData={acrossSection} />
      </LazySection>

      {/* <EnglishLanguageLearnerELLForm data={ellSection} jotFormId={data.jotFormId} /> */}

      <LazySection>
        <ApplyNowSection data={applyNowSection} haveArrow asbVectorClassName="max-sm:-bottom-[8px]" />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="english-learner-program"
          carouselName="englishLearnerProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default EnglishLanguageLearnerProgramDetail;
