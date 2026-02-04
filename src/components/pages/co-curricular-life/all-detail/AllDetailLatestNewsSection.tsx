"use client";

import OtherLatestNewsCarousel from "@/components/carousel/other-latest-news-carousel";
import { SectionContainer } from "@/components/custom/section-container";
import { NewsGroupDetailJson } from "@/server/serializers/news-group-serializer";

interface AllDetailLatestNewsSectionProps {
  data: NewsGroupDetailJson[];
  otherSection: {
    otherLabel: string;
    cardButtonLabel: string;
  };
}

export default function AllDetailLatestNewsSection({ data, otherSection }: AllDetailLatestNewsSectionProps) {
  return (
    <>
      <SectionContainer sectionClassName="bg-primary-gray lg:block hidden">
        <OtherLatestNewsCarousel
          title={otherSection.otherLabel}
          buttonLabel={otherSection.cardButtonLabel}
          cardData={data ?? []}
          buttonName="otherLatestNews"
          groupedCardsChunkArrayIndex={3}
        />
      </SectionContainer>
      <div className="bg-primary-gray block w-full py-20 pl-10 lg:mx-auto lg:hidden">
        <OtherLatestNewsCarousel
          title={otherSection.otherLabel}
          buttonLabel={otherSection.cardButtonLabel}
          cardData={data ?? []}
          buttonName="otherLatestNews"
          groupedCardsChunkArrayIndex={3}
          isMobile={true}
        />
      </div>
    </>
  );
}
