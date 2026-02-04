"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import AcademicsActivitiesAdditionalProgramsSection from "./AcademicsActivitiesAdditionalProgramsSection";
import AcademicsActivitiesIntroSection from "./AcademicsActivitiesIntroSection";
import AcademicsActivitiesTitleSection from "./AcademicsActivitiesTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface AcademicActivitiesDetailsProps {
  data: CoCurricularLifeJson;
}

const AcademicActivitiesDetail = ({ data }: AcademicActivitiesDetailsProps) => {
  const { sections } = data;
  const [introSection, additionalProgramsSection] = sections as [SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AcademicsActivitiesTitleSection data={data} />
      <AcademicsActivitiesIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <AcademicsActivitiesAdditionalProgramsSection data={additionalProgramsSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="academic-activities"
          carouselName="academicActivities"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default AcademicActivitiesDetail;
