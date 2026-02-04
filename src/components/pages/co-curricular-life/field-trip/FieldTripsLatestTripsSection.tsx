import { getMinNewsCardJsonLoop } from "@/client/utils/helper";
import WideCarousel from "@/components/carousel/wide-curricular-carousel";
import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import { NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FieldTripsLatestTripsSectionProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
  otherButtonLabel: string;
  className?: string;
}

const FieldTripsLatestTripsSection = ({
  className,
  data,
  newsGroupData,
  otherButtonLabel,
}: FieldTripsLatestTripsSectionProps) => {
  const allCards = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ];

  const result = getMinNewsCardJsonLoop({ cards: allCards });

  return (
    <div className={cn("pb-20 lg:pb-0", className)}>
      <SectionContainer className="px-0 pb-0">
        <div className="flex flex-col items-center px-10 pb-12 text-center lg:pb-18">
          <ASBTitle title={data.title ?? ""} className="pt-6 lg:pt-3" />
          <ASBDescription description={data.description ?? ""} className="pt-4 lg:max-w-lg lg:pt-8 xl:max-w-2xl" />
        </div>
      </SectionContainer>
      <WideCarousel
        slides={result ?? []}
        buttonName="latestTrip"
        carouselName="latestTrip"
        isRedButton={false}
        haveArrowActiveCard={false}
        haveButtonActiveCard={true}
        buttonLabel={otherButtonLabel}
        activeCardClassName="px-10 pb-6 md:px-20 md:pb-8"
        haveBadge={true}
        haveCategoriesBadge={false}
        href="/co-curricular-life/all-detail"
      />
    </div>
  );
};

export default FieldTripsLatestTripsSection;
