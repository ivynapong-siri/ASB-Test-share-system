import { PatternStroke2 } from "@/components/shapes";
import OurMagicalSection from "@/components/shared/our-magical-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface VisionAndMissionOurMagicalSectionProps {
  hoveredId: number;
  setHoveredId: React.Dispatch<React.SetStateAction<number>>;
  data: SectionJson;
}

const VisionAndMissionOurMagicalSection = ({
  hoveredId,
  setHoveredId,
  data,
}: VisionAndMissionOurMagicalSectionProps) => {
  return (
    <OurMagicalSection
      data={data}
      setHoveredId={setHoveredId}
      hoveredId={hoveredId}
      vectorChildren={
        <>
          <PatternStroke2
            className="absolute bottom-16 -left-44 h-[265px] w-[360px] rotate-[70deg] lg:-bottom-24 lg:-left-4 lg:rotate-0"
            color="#B81E29"
          />
          <PatternStroke2 className="absolute -top-32 -right-58 z-0 hidden h-[260px] w-[360px] lg:block" />
        </>
      }
    />
  );
};

export default VisionAndMissionOurMagicalSection;
