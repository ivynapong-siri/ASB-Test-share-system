"use client";

import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import OtherLatestNewsCarousel from "@/components/carousel/other-latest-news-carousel";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";

interface FamilyLatestNewsProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
}

export default function FamilyLatestNewsSection({ data, newsGroupData }: FamilyLatestNewsProps) {
  const allItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ] as NewsGroupDetailJson[];

  return (
    <>
      <SectionContainer sectionClassName="lg:block hidden">
        <OtherLatestNewsCarousel
          buttonLabel={data.buttonLabel ?? "No data yet"}
          buttonUrl={data.buttonUrl ?? "/"}
          cardData={allItems ?? []}
          title={data.title ?? ""}
          buttonName="latestNews"
          groupedCardsChunkArrayIndex={3}
          variant="secondary"
          cardClassName="bg-muted"
          viewMoreButtonLabel={data.viewMoreButtonLabel ?? "No main button label data yet"}
          viewMoreButtonUrl={data.viewMoreButtonUrl ?? "/"}
          description={data.description ?? ""}
          ribbonLabel={data.ribbonText ?? ""}
          titleClassName="text-[1.75rem]/[2rem]"
        />
      </SectionContainer>
      <div className="block w-full py-20 pl-10 lg:mx-auto lg:hidden">
        <OtherLatestNewsCarousel
          buttonLabel={data.buttonLabel ?? "No data yet"}
          buttonUrl={data.buttonUrl ?? "/"}
          cardData={allItems ?? []}
          title={data.title ?? ""}
          buttonName="latestNews"
          groupedCardsChunkArrayIndex={3}
          variant="secondary"
          cardClassName="bg-muted"
          viewMoreButtonLabel={data.viewMoreButtonLabel ?? "No main button label data yet"}
          viewMoreButtonUrl={data.viewMoreButtonUrl ?? "/"}
          description={data.description ?? ""}
          ribbonLabel={data.ribbonText ?? ""}
          isMobile={true}
          titleClassName="text-[1.75rem]/[2rem]"
          textBoxClassName="pr-10"
          requiredPadding
        />
      </div>
    </>
  );
}
