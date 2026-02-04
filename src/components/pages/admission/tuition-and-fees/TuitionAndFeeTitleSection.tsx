import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";

interface TuitionAndFeeTitleSectionProps {
  data: AdmissionPageJson;
}

const TuitionAndFeeTitleSection = ({ data }: TuitionAndFeeTitleSectionProps) => {
  const { breadcrumbs1, breadcrumbs2 } = data;

  return (
    <SectionContainer sectionClassName="pt-45" className="pb-0">
      <BreadcrumbCustom data={{ breadcrumbs1: breadcrumbs1, breadcrumbs2: breadcrumbs2 }} />
      <div className="flex flex-col items-center gap-4 pt-16 lg:gap-2 lg:pt-20">
        <ASBRibbonText title={data.ribbonText} className="translate-x-8" />
        <ASBTitle title={data.title} as="h1" />
      </div>
    </SectionContainer>
  );
};

export default TuitionAndFeeTitleSection;
