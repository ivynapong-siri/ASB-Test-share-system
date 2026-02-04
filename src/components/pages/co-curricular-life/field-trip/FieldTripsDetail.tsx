"use client";

import { SectionJson, SectionWithTabJson } from "@/server/serializers/section-serializer";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { CoCurricularLifeJson } from "@/server/serializers/pages/co-curricular-life-serializer";
import FieldTripsCalendarSection from "./FieldTripsCalendarSection";
import FieldTripsIntroSection from "./FieldTripsIntroSection";
import FieldTripsLatestTripsSection from "./FieldTripsLatestTripsSection";
import FieldTripsTitleSection from "./FieldTripTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface FieldTripsDetailProps {
  data: CoCurricularLifeJson;
  newsGroupData: NewsGroupJson;
}

const FieldTripsDetails = ({ data, newsGroupData }: FieldTripsDetailProps) => {
  const { sections } = data;
  const [introSection, latestFieldTripsSection, fieldTripCalendarSection] = sections as [
    SectionJson,
    SectionJson,
    SectionWithTabJson,
  ];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <FieldTripsTitleSection data={data} />
      <FieldTripsIntroSection data={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <FieldTripsLatestTripsSection
          data={latestFieldTripsSection}
          newsGroupData={newsGroupData}
          otherButtonLabel={latestFieldTripsSection.viewMoreButtonLabel ?? "read more"}
          className="max-md:pb-0"
        />
      </LazySection>

      <LazySection>
        <FieldTripsCalendarSection data={fieldTripCalendarSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="field-trips"
          carouselName="fieldTrips"
          sectionContainerClassName="bg-[#F3F5F6]"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default FieldTripsDetails;
