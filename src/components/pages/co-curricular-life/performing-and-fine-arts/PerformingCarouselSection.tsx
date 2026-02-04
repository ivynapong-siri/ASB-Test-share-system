import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import WideCarousel from "@/components/carousel/wide-curricular-carousel";

interface PerformingCarouselSectionProps {
  newsGroupData: NewsGroupJson;
}

const PerformingCarouselSection = ({ newsGroupData }: PerformingCarouselSectionProps) => {
  const newsItems: NewsGroupDetailJson[] = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ];

  return (
    <div className="pt-20 lg:py-26">
      <WideCarousel
        slides={[...newsItems, ...newsItems]}
        buttonName="performing-carousel"
        carouselName="performingCarousel"
        isRedButton={true}
        haveArrowActiveCard={true}
        arrowClassName="lg:hidden"
        haveButtonActiveCard={false}
        activeCardClassName="px-6 lg:px-20 pb-10"
        titleClassName="max-md:text-[1.25rem]/[1.625rem]"
        descriptionClassName="max-md:text-sm-[1.625rem]"
        haveBadge={false}
        haveCategoriesBadge={false}
      />
    </div>
  );
};

export default PerformingCarouselSection;
