"use client";
import ASBFormDescription from "@/components/custom/asb-form-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { SectionContainer } from "@/components/custom/section-container";
import LazySection from "@/components/shared/lazy-section";
import { ContactUsPageJson } from "@/server/serializers/pages/contact-us-serializer";
// Keep above-the-fold components as regular imports
import ContactUsFormSection from "./ContactUsFormSection";
import ContactUsTitleSection from "./ContactUsTitleSection";
interface ContactUsDetailProps {
  data: ContactUsPageJson;
}
const ContactUsDetail = ({ data }: ContactUsDetailProps) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <ContactUsTitleSection data={data} />
      <SectionContainer className="gap-8" sectionClassName="bg-white lg:py-16 lg:pb-0">
        <ASBRibbonText className="relative z-10" title={data.ribbonText} />
        <h2 className="text-primary-400 text-start text-[2rem]/[2.25rem] font-semibold md:text-[3.875rem]/[4.375rem]">
          {data.title}
        </h2>
        <LazySection>
          <ASBFormDescription description={data.description} className="text-start" />
        </LazySection>
        <LazySection>
          <ContactUsFormSection data={data} />
        </LazySection>
      </SectionContainer>
    </div>
  );
};
export default ContactUsDetail;
