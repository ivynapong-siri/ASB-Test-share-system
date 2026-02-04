import { transformTuitionAndFeesToQA } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import DataTableContent from "@/components/data-table/data-table-content";
import { PatternStroke1 } from "@/components/shapes";
import { SectionJson } from "@/server/serializers/section-serializer";

interface ProgramTuitionAndFeesSectionProps {
  data: SectionJson;
}

export default function ProgramTuitionAndFeesSection({ data }: ProgramTuitionAndFeesSectionProps) {
  const { annualTuitionFees, tuitionFeePerSemester } = data.curriculumTuitionAndFees;

  const transformTuitionData = [
    annualTuitionFees && transformTuitionAndFeesToQA(annualTuitionFees, 1),
    tuitionFeePerSemester && transformTuitionAndFeesToQA(tuitionFeePerSemester, 2),
  ];

  return (
    <SectionContainer
      sectionClassName="py-6 sm:py-12"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-28 -left-32 h-[90px] w-[200px] -rotate-[30deg] rotate-y-180 lg:top-0 lg:left-0 lg:h-[180px] lg:w-80 lg:-rotate-[34deg]" />
          <PatternStroke1 className="absolute top-20 -right-32 h-22 w-50 -rotate-[35deg] rotate-y-180 lg:-right-40 lg:h-45 lg:w-96" />
        </>
      }
      className="relative items-center gap-8 lg:gap-12"
    >
      <ASBTitle title={data?.title ?? ""} />
      <ASBDescription description={data?.description ?? ""} className="mb-8 max-w-xl text-center" />

      {transformTuitionData.map(
        (data) =>
          data && (
            <DataTableContent
              data={data.answer.data}
              tableHeaderTitle={data.answer.header}
              mergeKey={data.answer.mergeKey}
              showHeader={true}
            />
          )
      )}

      <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "#"} />
    </SectionContainer>
  );
}
