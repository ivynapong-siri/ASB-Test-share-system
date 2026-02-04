import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";

interface AgeGuidelinesTitleSectionProps {
  data: AdmissionPageJson;
}

const AgeGuidelinesTitleSection = ({ data }: AgeGuidelinesTitleSectionProps) => {
  const fallbackBreadcrumbs = {
    breadcrumbs1: [{ name: "Admissions", url: "/admission" }],
    breadcrumbs2: [{ name: "Age Guidelines for Entry", url: "#" }],
  };

  return (
    <SectionContainer sectionClassName="pt-45" className="pb-0">
      <BreadcrumbCustom
        data={{
          breadcrumbs1: data.breadcrumbs1 ?? fallbackBreadcrumbs.breadcrumbs1,
          breadcrumbs2: data.breadcrumbs2 ?? fallbackBreadcrumbs.breadcrumbs2,
        }}
      />
      <div className="flex flex-col items-center gap-4 pt-16 lg:gap-2 lg:pt-20">
        {data.ribbonText && <ASBRibbonText title={data.ribbonText} className="translate-x-8" />}
        <ASBTitle title={data.title || "Age Guidelines for Entry"} as="h1" />
      </div>
    </SectionContainer>
  );
};

export default AgeGuidelinesTitleSection;
