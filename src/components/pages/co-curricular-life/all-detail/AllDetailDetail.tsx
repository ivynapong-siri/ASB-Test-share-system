import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import AllDetailHashTagSection from "./AllDetailHashTagSection";
import AllDetailImageSlideShowSection from "./AllDetailImageSlideShowSection";
import AllDetailLatestNewsSection from "./AllDetailLatestNewsSection";
import AllDetailSharedWrapper from "./AllDetailSharedWrapper";
import AllDetailTitleSection from "./AllDetailTitleSection";
import LazySection from "@/components/shared/lazy-section";
import { NewsJson } from "@/server/serializers/pages/news-serializer";
import { NewsSharedSettingJson } from "@/server/serializers/page-settings";

interface AllDetailDetailProps {
  data: NewsJson;
  newsGroupData: NewsGroupJson;
  otherSection: {
    otherLabel: string;
    cardButtonLabel: string;
  };
    bannerSharedSection: NewsSharedSettingJson;
  
}
/**
 * Server Component for Co-Curricular Detail
 * Content is rendered server-side for SEO
 */
export default function AllDetailDetail({ data, newsGroupData, otherSection, bannerSharedSection }: AllDetailDetailProps) {
  const allItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ] as NewsGroupDetailJson[];
  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Server-rendered content for SEO */}
      <AllDetailTitleSection data={data} />
      <AllDetailHashTagSection data={data} />
      {data.galleries.length > 0 && <AllDetailImageSlideShowSection data={data.galleries} />}
      {/* Client component for share functionality */}
      <AllDetailSharedWrapper data={bannerSharedSection} />
      <LazySection>
        <AllDetailLatestNewsSection data={allItems ?? []} otherSection={otherSection} />
      </LazySection>
    </div>
  );
}
