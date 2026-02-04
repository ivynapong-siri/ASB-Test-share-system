"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SchoolUniformComfortableAndPracticalSection from "./SchoolUniformComfortableAndPracticalSection";
import SchoolUniformIntroSection from "./SchoolUniformIntroSection";
import SchoolUniformTitleSection from "./SchoolUniformTitleSection";

interface SchoolUniformDetailsProps {
  data: StudentSupportJson;
}

export default function SchoolUniformDetails({ data }: SchoolUniformDetailsProps) {
  const { sections } = data;
  const [comfortableAndPracticalSection, schoolUniformIntroSection] = sections as [SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: comfortableAndPracticalSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SchoolUniformTitleSection data={data} />
      <SchoolUniformComfortableAndPracticalSection
        data={comfortableAndPracticalSection}
        breadcrumbData={breadcrumbData}
      />
      <SchoolUniformIntroSection data={schoolUniformIntroSection} />
      <EnrollmentServiceSection />
      <SimpleContentCarouselSection
        buttonName="school-uniform"
        carouselName="schoolUniform"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
}
