"use client";

import { PatternStroke1, PatternStroke3 } from "@/components/shapes";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import AchieveStriveBelongSection from "@/components/shared/achieve-strive-belong-section";
import InformationCarouselSection from "@/components/shared/information-carousel-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import HistoryExpandingOpportunities from "./HistoryExpandingOpportunities";
import HistorySliderWrapper from "./HistorySliderWrapper";
import HistoryTitleSection from "./HistoryTitleSection";
import HistoryXCLASBLegacy from "./HistoryXCLASBLegacy";

interface HistoryDetailsProps {
  historyData: AboutUsPageJson;
}

const HistoryDetails = ({ historyData }: HistoryDetailsProps) => {
  const { sections } = historyData;

  const [historySlideSection, expandingOpportunitiesSection, informationData, legacySection, achieveStriveBelongData] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: historyData, sectionData: historySlideSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HistoryTitleSection historyData={historyData} />
      <HistorySliderWrapper data={historySlideSection} breadcrumbData={breadcrumbData} />
      <HistoryExpandingOpportunities data={expandingOpportunitiesSection} />
      <InformationCarouselSection
        data={informationData}
        vectorChildren={
          <>
            <PatternStroke1
              color="white"
              className="absolute -top-8 -right-18 h-[88px] w-[200px] -rotate-15 lg:top-0 lg:right-0 lg:h-[178px] lg:w-[390px] lg:rotate-0"
            />
            <PatternStroke3 className="absolute bottom-0 h-14 w-9 lg:h-28 lg:w-18" />
          </>
        }
      />
      <HistoryXCLASBLegacy data={legacySection} />
      <AchieveStriveBelongSection
        imageSrc={achieveStriveBelongData.image?.imageUrl ?? "/mock-image.jpg"}
        imageSrc2={achieveStriveBelongData.image2?.imageUrl ?? "/mock-image.jpg"}
        achieves={achieveStriveBelongData.title ?? ""}
        highlightText={achieveStriveBelongData.highlightText ?? ""}
        description={achieveStriveBelongData.titleLine1 ?? ""}
      />
      <SimpleContentCarouselSection
        buttonName="history"
        carouselName="history"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default HistoryDetails;
