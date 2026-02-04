import { mapTuitionFeesTable } from "@/client/utils/helper";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import DataTableContent from "@/components/data-table/data-table-content";
import { PatternStroke1 } from "@/components/shapes";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdmissionAndProcessTuitionFeeSectionProps {
  data: SectionJson;
}

const AdmissionAndProcessTuitionFeeSection = ({ data }: AdmissionAndProcessTuitionFeeSectionProps) => {
  const tuitionFeeTable = data.tuitionAndFees ? mapTuitionFeesTable(data.tuitionAndFees) : null;
  return (
    <SectionContainer
      sectionClassName="py-6 sm:py-12"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-24 -left-28 w-80 -rotate-[34deg] rotate-y-180 max-lg:-left-52 max-md:top-22 max-md:-left-36 max-md:w-52" />
          <PatternStroke1 className="absolute top-32 -right-32 w-80 -rotate-[35deg] rotate-y-180 max-lg:hidden" />
        </>
      }
      className="relative items-center gap-8 lg:gap-12"
    >
      <ASBTitle title={data.title ?? ""} />
      <ASBDescription description={data.description ?? ""} className="mb-8 max-w-xl text-center" />
      <DataTableContent
        mergeKey="Division"
        data={tuitionFeeTable?.annual.table ?? []}
        tableHeaderTitle={data.titleLine1 ?? ""}
        showHeader={data.titleLine1 ? true : false}
      />
      <DataTableContent
        mergeKey="Division"
        data={tuitionFeeTable?.semester.table ?? []}
        tableHeaderTitle={data.titleLine2 ?? ""}
        showHeader={data.titleLine1 ? true : false}
      />
      <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? ""} />
    </SectionContainer>
  );
};

export default AdmissionAndProcessTuitionFeeSection;
