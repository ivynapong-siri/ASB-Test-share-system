"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import FamilyCareerSection from "./FamilyCareerSection";
import FamilyIntroSection from "./FamilyIntroSection";
import FamilyInvolvementSection from "./FamilyInvolvementSection";
import FamilyLatestNewsSection from "./FamilyLatestNewsSection";
import FamilyOurVoiceSection from "./FamilyOurVoiceSection";
import FamilySuccessStoriesSection from "./FamilySuccessStoriesSection";
import FamilyTitleSection from "./FamilyTitleSection";
import FamilyUnityInDiversitySection from "./FamilyUnityInDiversitySection";
import FamilyUsefulInformationSection from "./FamilyUsefulInformationSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface FamilyDetailProps {
  data: OurCommunityPageJson;
  newsGroupData: NewsGroupJson;
}

const FamilyDetail = ({ data, newsGroupData }: FamilyDetailProps) => {
  const { sections, navBox1, navBox2 } = data;

  const [
    introSection,
    latestNewSection,
    inDiverSection,
    ourVoiceSection,
    parentSection,
    successStoriesSection,
    careerSection,
    usefulInformationSection,
  ] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
    SectionWithTabJson,
    SectionJson,
    SectionJson,
    SectionJson,
    SectionJson,
  ];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <FamilyTitleSection data={data} />
      <FamilyIntroSection data={introSection} breadcrumbData={breadcrumbData} />
      <FamilyLatestNewsSection data={latestNewSection} newsGroupData={newsGroupData} />
      <LazySection>
        <FamilyUnityInDiversitySection data={inDiverSection} navBox={navBox1} />
      </LazySection>
      <LazySection>
        <FamilyOurVoiceSection data={ourVoiceSection} />
      </LazySection>
      <LazySection>
        <FamilyInvolvementSection data={parentSection} />
      </LazySection>
      <LazySection>
        <FamilySuccessStoriesSection data={successStoriesSection} navBox={navBox2} />
      </LazySection>
      <LazySection>
        <FamilyCareerSection data={careerSection} />
      </LazySection>
      <LazySection>
        <FamilyUsefulInformationSection data={usefulInformationSection} />
      </LazySection>
      <LazySection>
        <SimpleContentCarouselSection
          buttonName="xcl-asb-sukhumvit-family"
          carouselName="XCLASBSukhumvitFamily"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};
export default FamilyDetail;
