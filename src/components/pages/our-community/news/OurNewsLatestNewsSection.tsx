"use client";

import { NewsGroupDetailJson, NewsGroupJson } from "@/server/serializers/news-group-serializer";
import { useEffect, useState } from "react";

import ASBTitle from "@/components/custom/asb-title";
import DropdownButtonMenusNews from "@/components/custom/dropdown-button-menus-news";
import FilterButtonOurCommunity from "@/components/custom/filter-button-our-community";
import LatestNewsCarousel from "@/components/carousel/latest-news-carousel";
import { OurCommunityPageJson } from "@/server/serializers/pages/our-community-serializer";
import { SectionContainer } from "@/components/custom/section-container";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";

interface OurNewsLatestNewsSectionProps {
  mainData: OurCommunityPageJson;
  data: SectionWithTabJson;
  newsGroupData: NewsGroupJson;
}

const OurNewsLatestNewsSection = ({ data, newsGroupData, mainData }: OurNewsLatestNewsSectionProps) => {
  const [selectedCategoryId, setCategoryId] = useState<string>("all");
  const [selectedFilterId, setSelectedFilterId] = useState<string>("all-news");
  const [isDropdownSelected, setIsDropdownSelected] = useState<boolean>(false);
  const [currentCards, setCurrentCards] = useState<NewsGroupDetailJson[]>();

  const { latestNews, filterBy } = mainData;

  const flattenNewsGroup = () => {
    const allItems = [
      ...(newsGroupData.news ?? []),
      ...(newsGroupData.article ?? []),
      ...(newsGroupData.event ?? []),
      ...(newsGroupData.unCategorized ?? []),
    ];
    return allItems;
  };

  const normalizeLabelObject = (obj: Record<string, string | { title: string; slug: string }>) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "string") {
        return { id: key, title: value, slug: key };
      }
      return {
        id: key,
        title: value.title,
        slug: value.slug,
      };
    });
  };

  const filterNewsGroups = (categoryId: string, filterId: string) => {
    let items = flattenNewsGroup();

    if (categoryId !== "all") {
      items = items.filter((item) => String(item.newsType ?? "").toLowerCase() === categoryId);
    }

    if (filterId !== "all-news") {
      items = items.filter((item) => String(item.newsFilter ?? "").toLowerCase() === filterId);
    }

    return items;
  };

  useEffect(() => {
    const filtered = filterNewsGroups(selectedCategoryId, selectedFilterId);
    setCurrentCards(filtered);
  }, [selectedCategoryId, selectedFilterId, newsGroupData]);

  return (
    <SectionContainer sectionClassName="bg-primary-gray" className="lg:pb-0">
      <ASBTitle title={data.title ?? ""} className="pb-8 md:pb-18" />
      <div className="flex w-full flex-col lg:flex-row-reverse lg:justify-between">
        <div className="z-10 flex pb-6 lg:hidden">
          <div className="flex w-full flex-col">
            <p className="text-primary-400 pb-4 text-base/[1.5rem] font-bold">{data.tabsText}</p>
            {latestNews && latestNews.newsTypeLabel && (
              <DropdownButtonMenusNews
                headerContent={data.selectedTitle ?? ""}
                options={normalizeLabelObject(latestNews.newsTypeLabel)}
                onOptionSelect={(id) => {
                  setCategoryId(id.toLowerCase());
                  setIsDropdownSelected(false);
                }}
                buttonClassName="h-14 rounded-xl font-bold font-sans"
                containerClassName="bg-transparent"
                variant="default"
                isNewsButton={true}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center">
          <p className="text-primary-400 pb-4 text-base/[1.5rem] font-bold lg:pr-4 lg:pb-0 xl:pr-8">
            {latestNews?.filterLabel}
          </p>
          <div className="z-10 flex">
            <DropdownButtonMenusNews
              headerContent={data.selectedTitle ?? ""}
              options={filterBy ?? []}
              onOptionSelect={(id) => {
                // const slug = id.replace(/^news-/, "");
                // use category under news category
                const slug = id;
                setSelectedFilterId(slug);
                setIsDropdownSelected(true);
              }}
              buttonClassName="h-14 rounded-xl font-bold font-sans"
              containerClassName="bg-transparent"
              isNewsButton={true}
            />
          </div>
        </div>
        <div className="item-center z-1 hidden flex-row lg:flex">
          <div className="flex items-center">
            <p className="text-primary-400 text-base/[1.5rem] font-bold lg:pr-4 xl:pr-8">{latestNews?.categoryLabel}</p>
            {latestNews?.newsTypeLabel && (
              <FilterButtonOurCommunity
                options={latestNews.newsTypeLabel}
                onChange={(id) => {
                  setCategoryId(id.toLowerCase());
                  setIsDropdownSelected(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 h-[1px] w-full rounded-full bg-[#D5DFE4]" />
      {mainData && (
        <div className="-mt-10 h-full w-full overflow-x-auto overflow-y-hidden md:-mt-0">
          <LatestNewsCarousel
            buttonLabel={mainData.newsCardButtonLabel ?? ""}
            cardData={currentCards ?? []}
            buttonName="communityOurVoiceLatestNews"
            paginateClassName="lg:w-[min(100%,365px)]"
          />
        </div>
      )}
    </SectionContainer>
  );
};

export default OurNewsLatestNewsSection;
