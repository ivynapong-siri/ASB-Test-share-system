"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import UniversityPreparationApplySection from "./UniversityPreparationApplySection";
import UniversityPreparationCollegeReadyFutureSection from "./UniversityPreparationCollegeReadyFutureSection";
import UniversityPreparationExperimentSlideSection from "./UniversityPreparationExperimentSlideSection";
import UniversityPreparationIntroSection from "./UniversityPreparationIntroSection";
import UniversityPreparationTitleSection from "./UniversityPreparationTitleSection";

type UniversityPreparationTitleSectionProps = {
  data: StudentSupportJson;
};

const UniversityPreparationDetail = ({ data }: UniversityPreparationTitleSectionProps) => {
  const { sections } = data;

  const [universityPreparationIntroSection, collegeReadyFutureSection, experimentSlideSection, applySection] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: universityPreparationIntroSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <UniversityPreparationTitleSection data={data} />
      <UniversityPreparationIntroSection data={universityPreparationIntroSection} breadcrumbData={breadcrumbData} />
      <UniversityPreparationCollegeReadyFutureSection data={collegeReadyFutureSection} />
      <UniversityPreparationExperimentSlideSection experimentData={experimentSlideSection} />
      <UniversityPreparationApplySection applySectionData={applySection} />
      <SimpleContentCarouselSection
        buttonName="university-preparation"
        carouselName="universityPreparation"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default UniversityPreparationDetail;
