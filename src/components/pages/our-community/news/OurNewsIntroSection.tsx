import WideCarousel from "@/components/carousel/wide-curricular-carousel";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { BreadcrumbProps } from "@/server/models/model-types";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface OurNewsIntroSectionProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
  buttonLabel: string;
  breadcrumbData: BreadcrumbProps;
}

const OurNewsIntroSection = ({ data, newsGroupData, buttonLabel, breadcrumbData }: OurNewsIntroSectionProps) => {
  const sliceCards = (newsGroupData.news ?? []).slice(0, 6); // Get only 6 cards

  return (
    <div className="py-20">
      <SectionContainer>
        <BreadcrumbCustom
          data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
        />
        <ASBTitle title={data.title ?? ""} className="pt-18" as="h1" />
      </SectionContainer>
      <WideCarousel
        slides={sliceCards ?? []}
        buttonName="ourNewsFeatured"
        carouselName="ourNewsFeatured"
        isRedButton={false}
        haveArrowActiveCard={false}
        haveButtonActiveCard={true}
        activeCardClassName="px-10 pb-6 lg:px-20 md:pb-8"
        haveBadge={true}
        haveCategoriesBadge={true}
        subjectClassName="px-3"
        buttonLabel={buttonLabel}
      />
    </div>
  );
};

export default OurNewsIntroSection;
