import InformationSlideCarouselSection from "@/components/shared/information-slide-carousel-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface PerformingBenefitProps {
  data: SectionJson;
}

export default function PerformingBenefitSection({ data }: PerformingBenefitProps) {
  return (
    <div className="lg:py-20">
      <InformationSlideCarouselSection
        title={data.title ?? ""}
        description={data.description ?? ""}
        slides={data.cards ?? []}
      />
    </div>
  );
}
