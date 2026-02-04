import { otherProjectBreakPoints } from "@/client/configs/slide-carousel-config";
import ProjectOtherProgramCarousel from "@/components/carousel/project-other-program-carousel";
import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProjectBasedOtherSectionProps {
  otherProgramData: SectionJson;
}

export default function ProjectBasedOtherSection({ otherProgramData }: ProjectBasedOtherSectionProps) {
  return (
    <TitleDescriptionCenterContainer
      title={otherProgramData.title ?? ""}
      titleClassName="text-white"
      ribbonText={otherProgramData.ribbonText ?? ""}
      description={otherProgramData.description ?? ""}
      descriptionClassName="text-white max-w-xl px-10"
      sectionClassName="bg-primary-300"
      className="px-0"
      headerClassName="px-10"
    >
      <ProjectOtherProgramCarousel
        carouselName="other-project"
        cards={otherProgramData.cards ?? []}
        breakPoint={otherProjectBreakPoints}
      />
    </TitleDescriptionCenterContainer>
  );
}
