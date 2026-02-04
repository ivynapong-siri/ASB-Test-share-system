import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import LazySection from "@/components/shared/lazy-section";
import { NewsSharedSettingJson } from "@/server/serializers/page-settings";
import { NewsJson } from "@/server/serializers/pages/news-serializer";
import NewsDetailContent from "./NewsDetailContent";
import NewsDetailHashTagSection from "./NewsDetailHashTagSection";
import NewsDetailImageSlideShowSection from "./NewsDetailImageSlideShowSection";
import NewsDetailLatestNewsSection from "./NewsDetailLatestNewsSection";
import NewsDetailSharedWrapper from "./NewsDetailSharedWrapper";

interface NewsDetailDetailsProps {
  data: NewsJson;
  newsGroupData: NewsGroupJson;
  otherSection: {
    otherLabel: string;
    cardButtonLabel: string;
  };
  bannerSharedSection: NewsSharedSettingJson;
}

/**
 * Server Component for News Detail
 * Content is rendered server-side for SEO
 */
export default function NewsDetailDetails({
  data,
  newsGroupData,
  otherSection,
  bannerSharedSection,
}: NewsDetailDetailsProps) {
  const allItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ] as NewsGroupDetailJson[];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Server-rendered content for SEO */}
      <NewsDetailContent data={data} />
      <NewsDetailHashTagSection data={data} />
      {data.galleries.length > 0 && <NewsDetailImageSlideShowSection data={data.galleries} />}
      {/* Client component for share functionality */}
      <NewsDetailSharedWrapper data={bannerSharedSection} />
      <LazySection>
        <NewsDetailLatestNewsSection data={allItems ?? []} otherSection={otherSection} />
      </LazySection>
    </div>
  );
}
