import { PatternStroke1 } from "@/components/shapes";
import ApplyNowSection from "@/components/shared/apply-now-section";
import { SectionJson } from "@/server/serializers/section-serializer";

interface SummerSchoolProgramApplySectionProps {
  data: SectionJson;
}

const SummerSchoolProgramApplySection = ({ data }: SummerSchoolProgramApplySectionProps) => {
  return (
    <ApplyNowSection
      data={data}
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-0 -left-24 h-[75px] w-[170px] lg:top-14 lg:h-[150px] lg:w-[340px]" />
          <PatternStroke1 className="absolute top-0 -right-8 z-0 h-[75px] w-[170px] lg:top-32 lg:-right-0 lg:h-[150px] lg:w-[340px] xl:top-22" />
        </>
      }
      asbVectorClassName="max-sm:-bottom-[7.7px]"
    />
  );
};

export default SummerSchoolProgramApplySection;
