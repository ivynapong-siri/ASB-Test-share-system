import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import { listConvert } from "@/client/utils/helper";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import ContactBanner from "@/components/custom/contact-banner";
import { SectionContainer } from "@/components/custom/section-container";

interface CardProps {
  titleText: string;
  grade: string;
  lists: { headText: string; description: string }[];
}

function Card({ titleText, grade, lists }: CardProps) {
  return (
    <BoxBorderDashed color="primary" className="z-10 bg-white p-8">
      <p className="bg-primary-300 w-fit rounded-full p-1 pr-2.5 pl-2 font-mono tracking-widest text-white">
        {grade.toUpperCase()}
      </p>
      <h5 className="text-primary-400 my-6 text-2xl font-semibold">{titleText}</h5>
      <ol className="text-primary-400 flex list-decimal flex-col items-start gap-2 pl-5 font-mono font-semibold whitespace-pre-line">
        {lists.map((list, index) => (
          <li className="" key={index + 1}>
            <b className="inline">{list.headText}</b> <p className="inline font-normal">{list.description}</p>
          </li>
        ))}
      </ol>
    </BoxBorderDashed>
  );
}

interface ScholarshipOpportunitiesSectionProps {
  categoriesSectionData: {
    ribbonText: string | null;
    title: string | null;
  };
  categoriesCards: {
    titleText: string;
    grade: string;
    lists: string;
  }[];
  contactBanner: {
    buttonHref: string;
    buttonText: string;
    description: string[];
  };
}

const ScholarshipOpportunitiesSection = ({
  categoriesSectionData,
  categoriesCards,
  contactBanner,
}: ScholarshipOpportunitiesSectionProps) => {
  return (
    <SectionContainer
      sectionClassName="bg-muted"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute top-1/2 -left-32 z-0 max-md:hidden" />
          <PatternStroke1 className="absolute top-1/6 -right-16 z-0 -rotate-6 max-md:hidden" />
          <PatternStroke2 className="absolute -right-4 -bottom-12 z-0 -rotate-6 max-md:hidden" />
        </>
      }
      className="items-center"
    >
      <ASBRibbonText className="translate-x-8" title={categoriesSectionData.ribbonText ?? ""} />
      <h1 className="text-primary-400 my-4 mb-24 max-w-4xl text-center text-3xl font-semibold md:text-6xl">
        {categoriesSectionData.title ?? ""}
      </h1>
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {categoriesCards.map((card, index) => {
          return <Card key={index + 1} titleText={card.titleText} grade={card.grade} lists={listConvert(card.lists)} />;
        })}
      </div>
      <div className="z-10 mt-24 w-full">
        <ContactBanner buttonHref={contactBanner.buttonHref} buttonText={contactBanner.buttonText}>
          <p className="flex flex-col text-base/[1.625rem] max-lg:items-center max-lg:text-center">
            <p className="max-md:max-w-[200px]">{contactBanner.description[0]}</p>
            <p>{contactBanner.description[1]}</p>
          </p>
        </ContactBanner>
      </div>
    </SectionContainer>
  );
};

export default ScholarshipOpportunitiesSection;
