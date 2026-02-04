"use client";

import OurVoicesCarousel from "@/components/carousel/our-voices-carousel";
import OurVoicesCarouselMobile from "@/components/carousel/our-voices-carousel-mobile";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import DropdownButtonMenus from "@/components/custom/dropdown-button-menus";
import FilterButton from "@/components/custom/filter-button";
import { SectionContainer } from "@/components/custom/section-container";
import { useIsLaptop } from "@/hooks/use-laptops";
import { BreadcrumbProps } from "@/server/models/model-types";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import { useState } from "react";

interface OurVoiceFilterSectionProps {
  data: SectionWithTabJson;
  breadcrumbData: BreadcrumbProps;
}

const OurVoiceFilterSection = ({ data, breadcrumbData }: OurVoiceFilterSectionProps) => {
  const [selectedTabId, setSelectedTabId] = useState<number>(data.tabs?.[0]?.id ?? 0);
  const isTablet = useIsLaptop();

  return (
    <>
      <SectionContainer className="px-0 max-lg:pb-0">
        <div className="max-xl:px-10 md:pb-18">
          <BreadcrumbCustom
            data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
          />
        </div>

        <div className="-mt-10 h-full w-full overflow-y-hidden pb-10 max-md:pb-20 md:-mt-0">
          {!isTablet ? (
            <OurVoicesCarousel
              filterContent={
                <>
                  <div className="item-center z-10 hidden flex-row lg:flex">
                    <FilterButton
                      options={data.tabs ?? []}
                      onChange={(id) => setSelectedTabId(id)}
                      variant="secondary"
                    />
                  </div>
                  <div className="z-10 flex w-full px-10 max-md:pt-20 lg:hidden">
                    <DropdownButtonMenus
                      headerContent={data.selectedTitle ?? ""}
                      options={data.tabs ?? []}
                      onOptionSelect={(id) => setSelectedTabId(id)}
                      buttonClassName="h-16"
                      containerClassName="bg-white"
                    />
                  </div>
                </>
              }
              profileCardData={data.tabs?.find((e) => e.id === selectedTabId)?.cards ?? ([] as any)}
              badgeLabel={data.tabs?.find((e) => e.id == selectedTabId)?.title ?? ""}
              buttonName="communityOurVoiceCarousel"
            />
          ) : (
            <OurVoicesCarouselMobile
              filterContent={
                <>
                  <div className="item-center z-10 hidden flex-row pr-10 lg:flex">
                    <FilterButton
                      options={data.tabs ?? []}
                      onChange={(id) => setSelectedTabId(id)}
                      variant="secondary"
                    />
                  </div>
                  <div className="z-10 flex w-full px-10 max-md:pt-20 lg:hidden">
                    <DropdownButtonMenus
                      headerContent={data.selectedTitle ?? ""}
                      options={data.tabs ?? []}
                      onOptionSelect={(id) => setSelectedTabId(id)}
                      buttonClassName="h-16"
                      containerClassName="bg-white"
                    />
                  </div>
                </>
              }
              profileCardData={data.tabs?.find((e) => e.id === selectedTabId)?.cards ?? ([] as any)}
              badgeLabel={data.tabs?.find((e) => e.id == selectedTabId)?.title ?? ""}
            />
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default OurVoiceFilterSection;
