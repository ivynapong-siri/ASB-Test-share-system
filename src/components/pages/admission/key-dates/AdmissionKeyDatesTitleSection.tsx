"use client";

import { BookIcon, RubberIcon, SearchIcon } from "@/components/icons";
import { PatternStroke1, PatternStroke2 } from "@/components/shapes";
import { useEffect, useState } from "react";

import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { ButtonWithIcons } from "@/components/custom/buttons/button-with-icon";
import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import { AdmissionPageJson } from "@/server/serializers/pages/admission-serializer";
import ASBRibbonText from "../../../custom/asb-ribbon-text";

interface AdmissionKeyDatesTitleSectionProps {
  data: AdmissionPageJson;
  onSearch: (value: string) => void;
}

function useIsSmallScreen(breakpoint = 1024) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handleChange = () => setIsSmall(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isSmall;
}

const AdmissionKeyDatesTitleSection = ({ data, onSearch }: AdmissionKeyDatesTitleSectionProps) => {
  const isSmallScreen = useIsSmallScreen();
  const [searchValue, setSearchValue] = useState("");

  const { breadcrumbs1, breadcrumbs2 } = data;
  const breadcrumbData = { breadcrumbs1: breadcrumbs1, breadcrumbs2: breadcrumbs2 };

  return (
    <SectionContainer
      className="mt-52 pb-0 xl:mt-40"
      vectorChildren={
        <>
          <PatternStroke1 className="absolute bottom-1/12 -left-40 z-10 h-[145px] w-[200px] rotate-15 rotate-y-180 xl:bottom-1/7 xl:-left-32 xl:h-[165px] xl:w-[370px]" />
          <RubberIcon className="absolute bottom-1/8 left-4 h-7 w-6 rotate-300 xl:bottom-1/6 xl:left-40 xl:h-14 xl:w-11" />

          <PatternStroke2 className="absolute -right-36 bottom-1/2 h-[132px] w-[180px] -rotate-70 rotate-y-180 xl:-right-32 xl:bottom-1/3 xl:h-[265px] xl:w-[360px]" />
          <BookIcon className="absolute right-4 bottom-5/9 h-7 w-11 rotate-y-180 xl:right-40 xl:bottom-1/2 xl:h-[68px] xl:w-[112px]" />
        </>
      }
    >
      <div className="flex w-2/3 lg:w-full">
        <BreadcrumbCustom data={breadcrumbData} />
      </div>

      <div className="flex w-full flex-col items-center pt-20 text-center">
        <ASBRibbonText title={data.ribbonText} className="translate-x-8" />
        <ASBTitle title={data.title} as="h1" />
        <p className="text-neutral pt-8 font-mono lg:max-w-2xl">{data.description}</p>
        <div className="flex w-full flex-nowrap items-center justify-center gap-1 overflow-hidden pt-6 lg:max-w-2xl lg:gap-3 lg:pt-16">
          <div className="flex h-12 w-[240px] max-w-[710px] flex-grow items-center rounded-full border border-[#9EB2C84D] px-4 font-mono">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={data.searchFieldLabel}
              className="h-full w-full rounded-full border-none bg-transparent text-base outline-none placeholder:text-[#A2A9B0]"
            />
          </div>
          <ButtonWithIcons
            className=""
            size={isSmallScreen ? "sm" : "default"}
            endIcon={SearchIcon}
            iconClass={cn(
              "size-8 transform rounded-full border border-dashed border-white px-2 py-1 transition-all group-hover/button:rotate-45"
            )}
            children={<p className="hidden tracking-widest lg:block">{data.searchButtonLabel}</p>}
            showIcon
            onClick={() => {
              onSearch(searchValue);
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
};

export default AdmissionKeyDatesTitleSection;
