import AdvancedPlacementCourseCarousel from "@/components/carousel/advanced-placement-course-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdvancedPlacementCourseSectionProps {
  courseData: SectionJson;
}

export default function AdvancedPlacementCourseSection({ courseData }: AdvancedPlacementCourseSectionProps) {
  return (
    <>
      <SectionContainer>
        <div className="mb-16 flex items-center gap-8 max-md:flex-col lg:gap-20">
          <ASBTitle title={courseData.title ?? ""} className="text-start" />
          <ASBDescription description={courseData.description ?? ""} className="max-w-md" />
        </div>
        <AdvancedPlacementCourseCarousel cards={courseData.cards ?? []} className="hidden lg:block" isMobile={false} />
      </SectionContainer>
      <AdvancedPlacementCourseCarousel cards={courseData.cards ?? []} className="block lg:hidden" isMobile={true} />
    </>
  );
}
