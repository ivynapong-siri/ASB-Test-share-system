import ContactBanner from "@/components/custom/contact-banner";
import { SectionContainer } from "@/components/custom/section-container";
import InformationCarouselSection from "@/components/shared/information-carousel-section";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AdmissionAndProcessVoiceOfXCLSectionProps {
  data: SectionJson;
  navBox: NavBoxJson | null;
  buttonLabel: string;
  buttonUrl: string;
}

export default function AdmissionAndProcessVoiceOfXCLSection({
  data,
  navBox,
  buttonLabel,
  buttonUrl,
}: AdmissionAndProcessVoiceOfXCLSectionProps) {
  return (
    <>
      <InformationCarouselSection
        descriptionClassname="font-sans text-[1.25rem]/[1.625rem] lg:text-[1.75rem]/[2rem]"
        data={data}
        slideClassname="xl:gap-40 2xl:justify-between 2xl:px-10"
        className="pb-12 lg:pb-0"
      />
      <SectionContainer sectionClassName="bg-primary-300" className="pt-0">
        <ContactBanner buttonText={buttonLabel} buttonHref={buttonUrl} className="flex flex-col md:flex-row">
          <div className="font-mono max-md:hidden">
            <p>{navBox?.title}</p>
            <p>{navBox?.subtitle}</p>
          </div>
          <p className="text-center font-mono md:hidden">
            {navBox?.title}
            {navBox?.subtitle}
          </p>
        </ContactBanner>
      </SectionContainer>
    </>
  );
}
