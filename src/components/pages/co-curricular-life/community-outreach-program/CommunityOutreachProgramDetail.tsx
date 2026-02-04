"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import CommunityOutreachProgramCommunityProgramsSection from "./CommunityOutreachProgramCommunityProgramsSection";
import CommunityOutreachProgramIntroSection from "./CommunityOutreachProgramIntroSection";
import CommunityOutreachProgramReadAboutOurProgramsSection from "./CommunityOutreachProgramReadAboutOurProgramsSection";
import CommunityOutreachProgramTitleSection from "./CommunityOutreachProgramTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface CommunityOutreachProgramDetailProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}

const CommunityOutreachProgramDetail = ({ data, newsGroupData }: CommunityOutreachProgramDetailProps) => {
  const { sections } = data;
  const [introSection, ourProgramSection, communityPrograms] = sections as [
    SectionJson,
    SectionJson,
    SectionWithTabJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <CommunityOutreachProgramTitleSection data={data} />
      <CommunityOutreachProgramIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <CommunityOutreachProgramReadAboutOurProgramsSection data={ourProgramSection} newsGroupData={newsGroupData} />
      </LazySection>

      <LazySection>
        <CommunityOutreachProgramCommunityProgramsSection data={communityPrograms} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          sectionContainerClassName="bg-primary-gray"
          buttonName="community-outreach-program"
          carouselName="communityOutreachProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default CommunityOutreachProgramDetail;
