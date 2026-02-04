import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import DataTableContent from "@/components/data-table/data-table-content";
import { SchoolBusRouteJson } from "@/server/serializers/pages/student-support-serializer";

interface SchoolBusServiceRouteProps {
  data: SchoolBusRouteJson | null;
}

const SchoolBusServiceRouteSection = ({ data }: SchoolBusServiceRouteProps) => {
  const renderVector = () => {
    return (
      <>
        <PatternStroke1 className="absolute -top-8 right-0 h-19 w-42 translate-x-3/4 translate-y-2/4 md:h-28 md:w-63 md:translate-x-1/2 md:-translate-y-1/4 lg:h-38 lg:w-84" />
        <PatternStroke2 className="absolute -top-7 left-0 h-33 w-45 -translate-x-3/4 translate-y-3/4 rotate-24 md:-top-20 md:h-50 md:w-68 md:-translate-x-1/2 md:translate-y-1/2 lg:-top-27 lg:h-67 lg:w-90" />
      </>
    );
  };

  const convertToMockBusRouteServiceTable = (tableData: SchoolBusRouteJson["table"]) => {
    return tableData
      ? Object.keys(tableData)
          .filter((key) => key.startsWith("row"))
          .map((key) => tableData[key as keyof typeof tableData])
          .filter((row): row is any => row !== null && "busNumber" in row && "region1" in row && "region2" in row)
      : [];
  };

  const busRouteServiceData = convertToMockBusRouteServiceTable(data?.table ?? null) ?? [];

  return (
    <SectionContainer vectorChildren={renderVector()} className="items-center">
      <ASBRibbonText
        title={data?.ribbonText ?? ""}
        ribbonClassName="w-fit max-sm:w-41 max-w-84 text-center py-0"
        className="translate-x-8"
      />
      <ASBTitle title={data?.title ?? ""} className="max-w-[855px]" />
      <ASBDescription description={data?.description ?? ""} className="max-w-[855px] pt-7 pb-23 text-center lg:pb-25" />
      <DataTableContent data={busRouteServiceData} />
    </SectionContainer>
  );
};

export default SchoolBusServiceRouteSection;
