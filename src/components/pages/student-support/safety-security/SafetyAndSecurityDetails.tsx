"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SafetyAndSecurityIntroSection from "./SafetyAndSecurityIntroSection";
import SafetyAndSecurityKeyPointSection from "./SafetyAndSecurityKeyPointSection";
import SafetyAndSecurityTitleSection from "./SafetyAndSecurityTitleSection";

interface SafetyDetailsProps {
  data: StudentSupportJson;
}

export default function SafetyAndSecurityDetails({ data }: SafetyDetailsProps) {
  const { sections } = data;
  const [safetyAndSecurityIntroSection, safetyAndSecurityKeyPointSection] = sections as [SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: safetyAndSecurityIntroSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SafetyAndSecurityTitleSection data={data} />
      <SafetyAndSecurityIntroSection data={safetyAndSecurityIntroSection} breadcrumbData={breadcrumbData} />
      <SafetyAndSecurityKeyPointSection data={safetyAndSecurityKeyPointSection} />
      <EnrollmentServiceSection className="mt-24" />
      <SimpleContentCarouselSection
        buttonName="safety-and-security"
        carouselName="safetyAndSecurity"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
}
