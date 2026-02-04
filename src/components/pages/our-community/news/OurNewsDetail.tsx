"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import OurNewsIntroSection from "./OurNewsIntroSection";
import OurNewsLatestNewsSection from "./OurNewsLatestNewsSection";
import OurNewsTitleSection from "./OurNewsTitle";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface OurNewDetailProps {
  mainData: OurCommunityPageJson;
  newsGroupData: NewsGroupJson;
}

const OurNewDetail = ({ mainData, newsGroupData }: OurNewDetailProps) => {
  const { sections } = mainData;
  const [introSection, latestNewsSection] = sections as [SectionJson, SectionWithTabJson];

  const breadcrumbData = getBreadcrumbs({ pageData: mainData, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <OurNewsTitleSection data={mainData} />
      <OurNewsIntroSection
        data={introSection}
        newsGroupData={newsGroupData}
        buttonLabel={mainData.newsCardButtonLabel ?? ""}
        breadcrumbData={breadcrumbData}
      />

      <LazySection>
        <OurNewsLatestNewsSection data={latestNewsSection} newsGroupData={newsGroupData} mainData={mainData} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="our-news-detail"
          carouselName="ourNewsDetail"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};
export default OurNewDetail;
