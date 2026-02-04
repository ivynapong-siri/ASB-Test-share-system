import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";

import BlogCard from "@/components/custom/cards/blog-card";
import TitleDescriptionCenterContainer from "@/components/custom/title-description-center-container";
import { SectionJson } from "@/server/serializers/section-serializer";
import { getFormatCardDate } from "@/server/utils/helpers";

interface LatestProgramSectionProps {
  data: SectionJson;
  newsGroupData: NewsGroupJson;
}

export default function AfterSchoolLatestProgramSection({ data, newsGroupData }: LatestProgramSectionProps) {
  const newsItems = [
    ...(newsGroupData.news ?? []),
    ...(newsGroupData.article ?? []),
    ...(newsGroupData.event ?? []),
    ...(newsGroupData.unCategorized ?? []),
  ];
  return (
    <TitleDescriptionCenterContainer title={data.title ?? ""} description={data.description ?? ""}>
      <div className="grid w-full grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-2 xl:grid-cols-3">
        {newsItems &&
          newsItems.map((newsDetail: NewsGroupDetailJson) => {
            const convertDate = newsDetail.date && newsDetail.date != "" ? getFormatCardDate(newsDetail.date) : "";
            const newsUrl = `/our-community/news/detail/${newsDetail.slug}`;
            return (
              <BlogCard
                key={`latest-program-${newsDetail.id}`}
                buttonText={data.viewMoreButtonLabel ?? "read more"}
                learnMoreHref={newsUrl}
                title={newsDetail.title}
                content={newsDetail.descriptionMobile}
                dateTag={convertDate}
                imgSrc={newsDetail.image?.imageMediumLargeUrl || newsDetail.image?.imageUrl || ""}
                classNameCardBody="min-h-auto grow bg-primary-gray"
                classNameContent="grow"
                classNameImg="max-h-[200px] md:max-h-none"
                classNameImagePosition="object-top md:object-center"
                classNameTitle="text-[1.25rem]/[1.625rem]"
              />
            );
          })}
      </div>
    </TitleDescriptionCenterContainer>
  );
}
