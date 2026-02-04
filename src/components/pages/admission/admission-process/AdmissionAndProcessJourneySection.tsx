import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import ContactBanner from "@/components/custom/contact-banner";
import { SectionContainer } from "@/components/custom/section-container";
import { NavBoxJson } from "@/server/serializers/nav-box-serializer";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import AdmissionAndProcessJourneyStepComponent from "./AdmissionAndProcessJourneyStepComponent";

interface AdmissionAndProcessJourneySectionProps {
  data: SectionWithTabJson;
  navBox: NavBoxJson | null;
}

const AdmissionAndProcessJourneySection = ({ data, navBox }: AdmissionAndProcessJourneySectionProps) => {
  const journeySteps = (data.tabs ?? []).map((tab) => {
    if (tab.cards && tab.cards.length) {
      const card = tab.cards[0] as { title: string; richTextDescription?: string };
      if (card.richTextDescription) {
        return {
          titleText: card.title,
          description: card.richTextDescription,
        };
      }
    }
    return { titleText: tab.title ?? "", description: "" };
  });

  return (
    <SectionContainer className="max-md:pb-0">
      <ASBRibbonText title={data.ribbonText ?? ""} />
      <ASBTitle title={data.title ?? ""} className="my-8 max-w-xl text-start" />
      <AdmissionAndProcessJourneyStepComponent stepsDetail={journeySteps} />
      <ContactBanner buttonText={navBox?.buttonLabel ?? ""} buttonHref={navBox?.buttonUrl ?? ""}>
        <span className="text-center font-mono">
          {navBox?.title ?? ""} <b>{navBox?.subtitle ?? ""}</b>
        </span>
      </ContactBanner>
    </SectionContainer>
  );
};

export default AdmissionAndProcessJourneySection;
