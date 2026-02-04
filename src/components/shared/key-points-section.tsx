import { getLinkDirection, reorderData, splitIntoColumns } from "@/client/utils/helper";

import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { SectionJson } from "@/server/serializers/section-serializer";
import ASBTitle from "../custom/asb-title";
import KeyPointCard from "../custom/key-point-card";
import { SectionContainer } from "../custom/section-container";

export interface KeyPoint {
  title: string;
  description: string;
  imageSrc: string;
}

interface KeyPointsSectionProps {
  mainData: SectionJson;
  data: KeyPoint[];
}

export default function KeyPointsSection({ mainData, data }: KeyPointsSectionProps) {
  const reorderedData = reorderData(data, [0, 3, 1, 4, 2, 5]);

  return (
    <SectionContainer sectionClassName="bg-primary-300" className="gap-10 lg:gap-20">
      <div className="flex flex-col items-center justify-center">
        <ASBRibbonText title={mainData.ribbonText ?? ""} className="translate-x-8" />
        <ASBTitle title={mainData.title ?? ""} className="text-white" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="hidden w-full grid-cols-2 justify-between gap-10 lg:grid">
          {splitIntoColumns(reorderedData).map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col items-center gap-4">
              {column.map((item, index) => (
                <KeyPointCard key={item.title} link={getLinkDirection(index, column.length)} {...item} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 lg:hidden">
          {reorderedData.map((item, index) => (
            <KeyPointCard key={item.title} link={getLinkDirection(index, reorderedData.length)} {...item} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
