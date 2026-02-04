import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import ASBDescription from "@/components/custom/asb-description";
import ASBTitle from "@/components/custom/asb-title";
import BlogCard from "@/components/custom/cards/blog-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";

interface CommunityOutreachProgramReadAboutOurProgramsSectionProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
}

const RenderBlogCards = ({
  newsDetail,
  viewMoreButtonLabel,
}: {
  newsDetail: NewsGroupDetailJson;
  viewMoreButtonLabel: string;
}) => {
  const convertDate = newsDetail.date && newsDetail.date != "" ? getFormatCardDate(newsDetail.date) : "";
  const newsUrl = `/our-community/news/detail/${newsDetail.slug}`;
  return (
    <BlogCard
      key={newsDetail.id}
      title={newsDetail.title}
      content={newsDetail.descriptionMobile}
      imgSrc={newsDetail.image?.imageMediumLargeUrl || newsDetail.image?.imageUrl || ""}
      learnMoreHref={newsUrl}
      classNameTitle="text-xl md:text-3xl"
      classNameFooter="mt-auto"
      classNameCardBody="min-h-auto grow bg-primary-gray rounded-b-4xl"
      classNameImg="max-md:h-50"
      isBadgeDate={true}
      badgeDate={convertDate}
      buttonText={viewMoreButtonLabel}
      badgeOnImageText={newsDetail.subcategory}
      badgeOnImage={true}
      classNameContentText="max-md:line-clamp-2"
    />
  );
};

const CommunityOutreachProgramReadAboutOurProgramsSection = ({
  data,
  newsGroupData,
}: CommunityOutreachProgramReadAboutOurProgramsSectionProps) => {
  const newsItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ];
  return (
    <SectionContainer className="items-center gap-7">
      <ASBTitle title={data.title ?? ""} className="max-w-[855px]" />
      <ASBDescription description={data.description ?? ""} className="max-w-[590px] pb-10 text-center lg:pb-14" />
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {newsItems &&
          newsItems.map((e) => (
            <RenderBlogCards key={e.id} newsDetail={e} viewMoreButtonLabel={data.viewMoreButtonLabel ?? "read more"} />
          ))}
      </div>
    </SectionContainer>
  );
};

export default CommunityOutreachProgramReadAboutOurProgramsSection;
