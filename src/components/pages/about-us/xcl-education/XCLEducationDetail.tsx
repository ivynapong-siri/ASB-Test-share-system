"use client";

import { convertKeyPoints, getBreadcrumbs } from "@/client/utils/helper";

import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import KeyPointsSection from "@/components/shared/key-points-section";
import LazySection from "@/components/shared/lazy-section";
import { SectionJson } from "@/server/serializers/section-serializer";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import XCLEducationIntroSection from "./XCLEducationIntroSection";
import XCLEducationOurPreviousActivity from "./XCLEducationOurPreviousActivity";
import XCLEducationTitleSection from "./XCLEducationTitleSection";
import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";

interface XCLEducationDetailProps {
  data: AboutUsPageJson;
}

const XCLEducationDetail = ({ data }: XCLEducationDetailProps) => {
  const { sections } = data;

  const [aboutXCLEducation, ourCommitmentsSection, ourPreviousActivitySection] = sections as [
    SectionJson,
    SectionJson,
    SectionJson,
  ];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: aboutXCLEducation });

  const keyPoints = convertKeyPoints(ourCommitmentsSection.cards ?? []);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <XCLEducationTitleSection titleData={data} />
      <XCLEducationIntroSection sectionData={aboutXCLEducation} breadcrumbData={breadcrumbData} />

      <LazySection>
        <KeyPointsSection data={keyPoints} mainData={ourCommitmentsSection} />
      </LazySection>

      <LazySection>
        <XCLEducationOurPreviousActivity sectionData={ourPreviousActivitySection} />
      </LazySection>

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="xcl-education"
          carouselName="XCLEducation"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default XCLEducationDetail;
