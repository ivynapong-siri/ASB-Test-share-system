"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import LifeAtASBAcademicSection from "./LifeAtASBAcademicSection";
import LifeAtASBAdditionSection from "./LifeAtASBAdditionSection";
import LifeAtASBFineArtSection from "./LifeAtASBFineArtSection";
import LifeAtASBIntroSection from "./LifeAtASBIntroSection";
import LifeAtASBLatestFieldSection from "./LifeAtASBLatestFieldSection";
import LifeAtASBSportClubSection from "./LifeAtASBSportClubSection";
import LifeAtASBStorySection from "./LifeAtASBStorySection";
import LifeAtASBTitleSection from "./LifeAtASBTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections
interface LifeAtASBDetailsProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}
const LifeAtASBDetails = ({ data, newsGroupData }: LifeAtASBDetailsProps) => {
  const { sections } = data;
  const [
    introSection,
    academicSection,
    sportClubSection,
    fineArtSection,
    additionSection,
    latestFieldSection,
    storySection,
  ] = sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <LifeAtASBTitleSection data={data} />
      <LifeAtASBIntroSection data={introSection} breadcrumbData={breadcrumbData} />
      <LifeAtASBAcademicSection data={academicSection} />
      <LazySection>
        <LifeAtASBSportClubSection data={sportClubSection} />
      </LazySection>
      <LazySection>
        <LifeAtASBFineArtSection data={fineArtSection} />
      </LazySection>
      <LazySection>
        <LifeAtASBAdditionSection data={additionSection} />
      </LazySection>
      <LazySection>
        <LifeAtASBLatestFieldSection data={latestFieldSection} newsGroupData={newsGroupData} />
      </LazySection>
      <LazySection>
        <LifeAtASBStorySection data={storySection} />
      </LazySection>
      <LazySection>
        <SimpleContentCarouselSection
          buttonName="life-at-asb"
          carouselName="lifeAtASB"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};
export default LifeAtASBDetails;
