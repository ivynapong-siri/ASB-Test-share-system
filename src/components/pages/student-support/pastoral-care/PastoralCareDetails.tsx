"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import PastoralCareIntroSection from "./PastoralCareIntroSection";
import PastoralCareTitleSection from "./PastoralCareTitleSection";

interface PastoralCareDetailsProps {
  data: StudentSupportJson;
}

export default function PastoralCareDetails({ data }: PastoralCareDetailsProps) {
  const { sections } = data;
  const [pastoralCareIntroSection] = sections as [SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: pastoralCareIntroSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <PastoralCareTitleSection data={data} />
      <PastoralCareIntroSection data={pastoralCareIntroSection} breadcrumbData={breadcrumbData} />
      <EnrollmentServiceSection />
      <SimpleContentCarouselSection
        buttonName="pastoral-care"
        carouselName="pastoralCare"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
}
