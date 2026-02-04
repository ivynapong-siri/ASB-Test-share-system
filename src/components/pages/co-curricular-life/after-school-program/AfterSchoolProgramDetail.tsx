"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import AfterSchoolDifferentProgramSection from "./AfterSchoolDifferentProgramSection";
import AfterSchoolLatestProgramSection from "./AfterSchoolLatestProgramSection";
import AfterSchoolProgramInformationSlideSection from "./AfterSchoolProgramInformationSlideSection";
import AfterSchoolProgramIntroSection from "./AfterSchoolProgramIntroSection";
import AfterSchoolProgramTitleSection from "./AfterSchoolProgramTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface AfterSchoolProgramDetailProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}

export default function AfterSchoolProgramDetail({ data, newsGroupData }: AfterSchoolProgramDetailProps) {
  const { sections } = data;
  const [introSection, differentProgramSection, programInformationSection, latestProgramSection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <AfterSchoolProgramTitleSection data={data} />
      <AfterSchoolProgramIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <AfterSchoolDifferentProgramSection data={differentProgramSection} />
      </LazySection>

      <LazySection>
        <AfterSchoolProgramInformationSlideSection data={programInformationSection} />
      </LazySection>

      <LazySection>
        <AfterSchoolLatestProgramSection data={latestProgramSection} newsGroupData={newsGroupData} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="after-school-program"
          carouselName="afterSchoolProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
