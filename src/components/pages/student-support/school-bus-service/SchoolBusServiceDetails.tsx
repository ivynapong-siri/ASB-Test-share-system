"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import EnrollmentServiceSection from "@/components/shared/enrollment-service-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SchoolBusServiceIntroSection from "./SchoolBusServiceIntroSection";
import SchoolBusServiceRouteSection from "./SchoolBusServiceRouteSection";
import SchoolBusServiceTitleSection from "./SchoolBusServiceTitleSection";

interface SchoolBusServiceDetailsProps {
  data: StudentSupportJson;
}

const SchoolBusServiceDetails = ({ data }: SchoolBusServiceDetailsProps) => {
  const { schoolBusRoute, sections } = data;

  const [schoolBusServiceSection] = sections as [SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: schoolBusServiceSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SchoolBusServiceTitleSection data={data} />
      <SchoolBusServiceIntroSection data={schoolBusServiceSection} breadcrumbData={breadcrumbData} />
      <SchoolBusServiceRouteSection data={schoolBusRoute} />
      <EnrollmentServiceSection />
      <SimpleContentCarouselSection
        buttonName="bus-service"
        carouselName="busService"
        breakPoints={slideBottomCarouselBreakPoints}
        isProfile
        isBottomCarousel
        contentClassName="min-w-0"
      />
    </div>
  );
};

export default SchoolBusServiceDetails;
