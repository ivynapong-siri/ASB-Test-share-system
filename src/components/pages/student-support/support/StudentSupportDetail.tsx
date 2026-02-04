"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import LazySection from "@/components/shared/lazy-section";
import { StudentSupportJson } from "@/server/serializers/pages/student-support-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import SimpleContentCarouselSection from "../../../shared/simple-content-carousel-section";
import StudentSupportTitleSection from "./StudentSupportTitleSection";
import SupportIPastoralSection from "./SupportIPastoralSection";
import SupportPrioritySection from "./SupportPrioritySection";
import SupportRelocatedSection from "./SupportRelocatedSection";
import SchoolBusServiceSection from "./SupportSchoolBusSection";
import SupportSchoolUniformSection from "./SupportSchoolUniformSection";
import SupportStorySection from "./SupportStorySection";
import SupportUniversitySection from "./SupportUniversitySection";

// Keep above-the-fold components as regular imports

// Dynamic imports for below-the-fold sections

interface StudentSupportDetailProps {
  data: StudentSupportJson;
}

const StudentSupportDetail = ({ data }: StudentSupportDetailProps) => {
  const { sections } = data;
  const [supportStory, supportPriority, university, schoolUniform, supportRelocated, schoolBus, supportPastoral] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];
  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: supportStory });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <StudentSupportTitleSection data={data} />
      <SupportStorySection data={supportStory} breadcrumbData={breadcrumbData} />
      <SupportPrioritySection data={supportPriority} />
      <LazySection>
        <SupportUniversitySection data={university} />
      </LazySection>
      <LazySection>
        <SupportSchoolUniformSection data={schoolUniform} />
      </LazySection>
      <LazySection>
        <SupportRelocatedSection data={supportRelocated} />
      </LazySection>
      <LazySection>
        <SchoolBusServiceSection data={schoolBus} />
      </LazySection>
      <LazySection>
        <SupportIPastoralSection data={supportPastoral} />
      </LazySection>
      <LazySection>
        <SimpleContentCarouselSection
          buttonName="student-support"
          carouselName="studentSupport"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
};

export default StudentSupportDetail;
