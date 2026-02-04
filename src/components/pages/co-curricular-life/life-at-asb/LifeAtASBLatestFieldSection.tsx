import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import LinkButton from "@/components/custom/buttons/link-button";
import BlogCard from "@/components/custom/cards/blog-card";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";

interface AdditionalProgramsSectionProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
}

const RenderNewsCards = ({
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
      key={`news-detail-${newsDetail.id}`}
      badgeDate={convertDate}
      isBadgeDate={true}
      learnMoreHref={newsUrl}
      title={newsDetail.title}
      content={newsDetail.descriptionMobile}
      badgeOnImage={true}
      badgeOnImageText={newsDetail.subcategory}
      imgSrc={newsDetail.image?.imageMediumLargeUrl || newsDetail.image?.imageUrl || ""}
      classNameCardBody="min-h-auto grow bg-[#F3F5F6]"
      classNameContent="grow"
      classNameTitle="text-[1.75rem]/[2rem]"
      classNameImg="max-md:max-h-[369px] aspect-[358/369]"
      buttonText={viewMoreButtonLabel || "Read More"}
    />
  );
};

const LifeAtASBLatestFieldSection = ({ data, newsGroupData }: AdditionalProgramsSectionProps) => {
  const newsItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ] as NewsGroupDetailJson[];

  return (
    <SectionContainer className="items-center pb-0 lg:pb-0 xl:py-20">
      <ASBRibbonText title={data.ribbonText ?? ""} className="translate-x-8" />
      <ASBTitle title={data.title ?? ""} className="max-w-[900px]" />
      <ASBDescription description={data.description ?? ""} className="max-w-[580px] pt-8 pb-14 text-center" />

      <div className="grid w-full max-w-7xl grid-cols-1 flex-col gap-5 pb-8 lg:grid-cols-2 xl:grid-cols-3 xl:pb-16">
        {newsItems &&
          newsItems.map((d, index) => (
            <RenderNewsCards key={index} newsDetail={d} viewMoreButtonLabel={data.viewMoreButtonLabel ?? ""} />
          ))}
      </div>

      <LinkButton buttonText={data.buttonLabel ?? ""} href={data.buttonUrl ?? "/"} linkClassName="bg-primary-200" />
    </SectionContainer>
  );
};

export default LifeAtASBLatestFieldSection;
