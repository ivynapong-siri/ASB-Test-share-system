"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SchoolFacilitiesIndoorSection from "./SchoolFacilitiesIndoorSection";
import SchoolFacilitiesOtherSection from "./SchoolFacilitiesOtherSection";
import SchoolFacilitiesOutdoorSection from "./SchoolFacilitiesOutdoorSection";
import SchoolFacilitiesTitleSection from "./SchoolFacilitiesTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface SchoolFacilitiesDetailProps {
  schoolFacilitiesData: AboutUsPageJson;
}

const SchoolFacilitiesDetail = ({ schoolFacilitiesData }: SchoolFacilitiesDetailProps) => {
  const { sections } = schoolFacilitiesData;
  const [indoorSection, outdoorSection, otherSection] = sections as [SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: schoolFacilitiesData, sectionData: indoorSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SchoolFacilitiesTitleSection schoolFacilitiesData={schoolFacilitiesData} />
      <SchoolFacilitiesIndoorSection data={indoorSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <SchoolFacilitiesOutdoorSection data={outdoorSection} />
      </LazySection>

      <LazySection>
        <SchoolFacilitiesOtherSection data={otherSection} />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="school-facilities"
          carouselName="schoolFacilities"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          sectionContainerClassName="bg-primary-gray z-10"
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default SchoolFacilitiesDetail;
