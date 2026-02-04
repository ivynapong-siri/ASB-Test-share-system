import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import BlogCard from "@/components/custom/cards/blog-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface AcademicsActivitiesAdditionalProgramsSectionProps {
  data: SectionJson;
}

const RenderBlogCards = ({ card }: { card: SectionCardJson }) => {
  return (
    <BlogCard
      title={card.title}
      badgeOnImageText={card.badge}
      content={card.description}
      imgSrc={card.image?.imageUrl?.trim() ? card.image.imageUrl : "/mock-image.jpg"}
      learnMoreHref={card.buttonUrl}
      buttonText={card.buttonLabel ?? "Learn More"}
      badgeOnImage={true}
      classNameTitle="text-[1.75rem]/[2rem]"
      classNameFooter="mt-auto"
      classNameCardBody="min-h-auto grow"
      classNameImg="max-md:max-h-[369px] aspect-[358/369]"
    />
  );
};

const AcademicsActivitiesAdditionalProgramsSection = ({ data }: AcademicsActivitiesAdditionalProgramsSectionProps) => {
  return (
    <SectionContainer sectionClassName="bg-primary-gray">
      <ASBRibbonText title={data.ribbonText ?? ""} className="justify-center pl-10" />
      <div className="flex flex-col items-center gap-7 pb-15 text-center xl:pb-13">
        <ASBTitle title={data.title ?? ""} className="max-w-[900px]" />
        <ASBDescription description={data.description ?? ""} className="max-w-[580px]" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.cards && data.cards.map((data) => <RenderBlogCards key={data.id} card={data} />)}
      </div>
      <div className="flex flex-col items-center pt-8 md:pt-12 md:pb-8">
        <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "/"} linkClassName="bg-primary-200" />
      </div>
    </SectionContainer>
  );
};

export default AcademicsActivitiesAdditionalProgramsSection;
