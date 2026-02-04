"use client";

import { slideBottomCarouselBreakPoints } from "@/client/configs/slide-carousel-config";
import { getBreadcrumbs } from "@/client/utils/helper";
import ApplyNowSection from "@/components/shared/apply-now-section";
import LazySection from "@/components/shared/lazy-section";
import SimpleContentCarouselSection from "@/components/shared/simple-content-carousel-section";
import { CurriculumPageJson } from "@/server/serializers/pages/curriculum-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import ProjectBasedAcrossSection from "./ProjectBasedAcrossSection";
import ProjectBasedBenefitSection from "./ProjectBasedBenefitSection";
import ProjectBasedIntroSection from "./ProjectBasedIntroSection";
import ProjectBasedOtherSection from "./ProjectBasedOtherSection";
import ProjectBasedProjectsSection from "./ProjectBasedProjectsSection";
import ProjectBasedTitleSection from "./ProjectBasedTitleSection";

// Keep above-the-fold components as regular imports

// Import all components

interface ProjectBasedDetailProps {
  data: CurriculumPageJson;
}

export default function ProjectBasedDetail({ data }: ProjectBasedDetailProps) {
  const { sections } = data;

  const [introSection, benefitSection, acrossSection, projectSection, otherProgramSection, applyNowSection] =
    sections as [SectionJson, SectionJson, SectionJson, SectionJson, SectionJson, SectionJson];

  const breadcrumbData = getBreadcrumbs({ pageData: data, sectionData: introSection });

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ProjectBasedTitleSection titleData={data} />
      <ProjectBasedIntroSection introData={introSection} breadcrumbData={breadcrumbData} />

      <LazySection>
        <ProjectBasedBenefitSection benefitData={benefitSection} />
      </LazySection>

      <LazySection>
        <ProjectBasedAcrossSection acrossData={acrossSection} />
      </LazySection>

      <LazySection>
        <ProjectBasedProjectsSection projectsData={projectSection} />
      </LazySection>

      <LazySection>
        <ProjectBasedOtherSection otherProgramData={otherProgramSection} />
      </LazySection>

      <LazySection>
        <ApplyNowSection data={applyNowSection} haveArrow asbVectorClassName="max-sm:-bottom-[8px]" />
      </LazySection>

      <LazySection>
        <SimpleContentCarouselSection
          carouselName="project-based-learner-program"
          buttonName="projectBasedLearnerProgram"
          breakPoints={slideBottomCarouselBreakPoints}
          isProfile
          isBottomCarousel
          contentClassName="min-w-0"
        />
      </LazySection>
    </div>
  );
}
