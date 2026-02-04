import ProjectsBasedLearningProjectCarousel from "@/components/carousel/projects-based-learning-project-carousel";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProjectBasedProjectsSectionProps {
  projectsData: SectionJson;
}

export default function ProjectBasedProjectsSection({ projectsData }: ProjectBasedProjectsSectionProps) {
  return (
    <SectionContainer className="gap-8 max-md:items-center max-md:pt-4 max-md:pb-26">
      <div className="flex items-center gap-4 pb-0 max-lg:flex-col md:items-end md:pb-15 xl:gap-20">
        <div className="flex flex-col max-lg:items-center">
          <ASBRibbonText title={projectsData.ribbonText ?? ""} className="max-lg:translate-x-8" />
          <ASBTitle title={projectsData.title ?? ""} className="max-w-[690px] pb-4 text-center lg:text-start" />
        </div>
        <p className="font-mono text-neutral-300 max-lg:text-center lg:max-w-96">{projectsData.description}</p>
      </div>
      <ProjectsBasedLearningProjectCarousel projects={projectsData.cards ?? []} />
    </SectionContainer>
  );
}
