import { PatternStroke1, PatternStroke2, PatternStroke3 } from "@/components/shapes";

import ASBDescription from "@/components/custom/asb-description";
import EducationCard from "@/components/custom/cards/education-card";
import { AnimatedFadeInWhenVisible } from "@/components/shared/animation-section";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import ASBRibbonText from "../../custom/asb-ribbon-text";
import LinkButton from "../../custom/buttons/link-button";
import { SectionContainer } from "../../custom/section-container";

interface HomeEducationNetworkProps {
  educationNetworkData: SectionJson;
}

const renderEducationCard = (cardData: SectionCardJson[]) => {
  return cardData.map((e, index) => <EducationCard key={e.id} data={e} index={index} />);
};

const HomeEducationNetworkSection = ({ educationNetworkData }: HomeEducationNetworkProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-white"
      className="pt-20 pb-30 lg:pt-30 lg:pb-52"
      vectorChildren={
        <>
          <PatternStroke2 className="absolute bottom-[450px] -left-20 h-[150px] w-[250px] md:bottom-1/4 lg:h-[265px] lg:w-[360px]" />
          <PatternStroke3
            className="text-primary absolute top-0 right-0 h-16 w-10 rotate-60 md:top-20 lg:h-[114px] lg:w-[72px]"
            color="#1A245C"
          />
          <PatternStroke1 className="absolute -right-4 -bottom-12 h-[100px] w-[220px] md:-bottom-10 lg:-right-10 lg:h-[150px] lg:w-[335px]" />
        </>
      }
    >
      <AnimatedFadeInWhenVisible className="flex flex-col gap-4 pb-8 md:justify-between xl:flex-row">
        <>
          <div className="flex flex-col gap-4">
            <ASBRibbonText title={educationNetworkData.ribbonText ?? ""} />
            <h2 className="pb-8">{educationNetworkData.header ?? ""}</h2>
            <ASBDescription description={educationNetworkData.description ?? ""} className="xl:max-w-1/2" />
          </div>
          <div className="flex flex-col justify-end">
            <LinkButton
              buttonText={educationNetworkData.buttonLabel ?? "No data"}
              href={educationNetworkData.buttonUrl ?? "/"}
              linkClassName="text-xs py-2 px-6 md:text-sm md:py-7 md:px-6 bg-primary-200"
            />
          </div>
        </>
      </AnimatedFadeInWhenVisible>

      <AnimatedFadeInWhenVisible className="grid grid-cols-1 place-items-center gap-8 pt-10 md:h-full md:grid-cols-2 md:gap-10 xl:grid-cols-3">
        {renderEducationCard(educationNetworkData.cards ?? [])}
      </AnimatedFadeInWhenVisible>
    </SectionContainer>
  );
};

export default HomeEducationNetworkSection;
