"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { AboutUsPageJson } from "@/server/serializers/pages/about-us-serializer";
import HeadOfSchoolGreetingSection from "./HeadOfSchoolGreetingSection";
import HeadOfSchoolTitleSection from "./HeadOfSchoolTitleSection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface HeadOfSchoolDetailProps {
  data: AboutUsPageJson;
}

const HeadOfSchoolDetail = ({ data }: HeadOfSchoolDetailProps) => {
  const { breadcrumbs1, breadcrumbs2 } = data;
  const breadcrumbData = { breadcrumb1: breadcrumbs1, breadcrumb2: breadcrumbs2 };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeadOfSchoolTitleSection data={data} />
      <HeadOfSchoolGreetingSection data={data} breadcrumbData={breadcrumbData} />

      <LazySection>
        <EnrollmentServiceSection />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          buttonName="head-of-school"
          carouselName="headOfSchool"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default HeadOfSchoolDetail;
