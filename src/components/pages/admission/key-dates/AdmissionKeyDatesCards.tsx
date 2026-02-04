import { AdmissionKeyDateCardJson, AdmissionKeyDateJson } from "@/server/serializers/admission-key-date-serializer";

import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import AdmissionCard from "../../../custom/cards/admission-card";

interface AdmissionKeyDatesCardsProps {
  data: AdmissionKeyDateJson;
  search: string;
}

const renderBlock = (data: AdmissionKeyDateCardJson[]) =>
  data.map((item) => (
    <AdmissionCard
      key={item.id}
      title={item.title}
      grade={item.grade}
      description={item.description}
      fromDate={item.from}
      toDate={item.to}
      badge={item.badge}
      badgeClassName="tracking-widest"
      dateClassName="pt-0"
    />
  ));

const AdmissionKeyDateRenderBlock = ({
  title,
  data,
  isLast,
}: {
  title: string;
  data: AdmissionKeyDateCardJson[];
  isLast?: boolean;
}) => (
  <div className={cn("py-12", isLast && "max-md:pb-0")}>
    <h5 className="text-primary-400 pb-6 text-[28px] font-semibold max-md:text-center">{title}</h5>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{renderBlock(data)}</div>
  </div>
);

const AdmissionKeyDatesCards = ({ data, search }: AdmissionKeyDatesCardsProps) => {
  const { earlyYears, elementary, highSchool, middleSchool } = data;
  const sections = [
    { title: earlyYears.title, data: earlyYears.contents },
    { title: elementary.title, data: elementary.contents },
    { title: middleSchool.title, data: middleSchool.contents },
    { title: highSchool.title, data: highSchool.contents },
  ];

  const filteredSections = sections.map((section) => ({
    ...section,
    data: !search.trim()
      ? section.data
      : section.data?.filter(
          (item) =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.grade?.toLocaleLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLocaleLowerCase().includes(search.toLowerCase())
        ),
  }));

  return (
    <SectionContainer className="divide-y-[1px] divide-[#12326D]/20 py-0 max-md:pt-0">
      {filteredSections.map(({ title, data }, index) => {
        {
          if (data?.length != 0)
            return (
              <AdmissionKeyDateRenderBlock
                key={title}
                title={title}
                data={data ?? []}
                isLast={index === filteredSections.length - 1}
              />
            );
        }
      })}
    </SectionContainer>
  );
};

export default AdmissionKeyDatesCards;
