"use client";

import { ReactNode, useState } from "react";

import ASBRibbonText from "../custom/asb-ribbon-text";
import { AnimatedFadeInWhenVisible } from "./animation-section";
import DropdownButtonMenus from "../custom/dropdown-button-menus";
import FilterButton from "../custom/filter-button";
import LinkButton from "../custom/buttons/link-button";
import ProfileCardCarousel from "../carousel/profile-carousel";
import { SectionContainer } from "../custom/section-container";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import { SwiperOptions } from "swiper/types";
import { cn } from "@/lib/utils";

interface HoverCardWithFilterSectionProps {
  data: SectionWithTabJson;
  vectorChildren?: ReactNode;
  sectionClassName?: string;
  className?: string;
  isFilterDropdown?: boolean;
  isProfile?: boolean;
  openModal?: (items: SectionProfileJson[], index: number) => void;
  variant?: "primary" | "secondary";
  filterButtonClassName?: string;
  dropDownContainerClassName?: string;
  mainDescriptionClassName?: string;
  mainTitleClassName?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  requiredGroupCards?: boolean;
  groupCardsNumber?: number;
  customMinusTopOffset?: number;
}

const HoverCardWithFilterSection = ({
  data,
  vectorChildren,
  className,
  sectionClassName,
  isFilterDropdown = false,
  isProfile = false,
  variant = "primary",
  openModal,
  mainDescriptionClassName,
  mainTitleClassName,
  filterButtonClassName,
  dropDownContainerClassName,
  breakpoints,
  requiredGroupCards,
  groupCardsNumber,
  customMinusTopOffset,
}: HoverCardWithFilterSectionProps) => {
  const [selectedTabId, setSelectedTabId] = useState<number>(data.tabs?.[0]?.id ?? 0);

  return (
    <>
      <SectionContainer
        sectionClassName={cn("bg-primary", variant == "secondary" && "bg-white", sectionClassName)}
        className={cn("max-lg:pr-0 max-md:pb-0", className)}
        vectorChildren={vectorChildren}
      >
        <AnimatedFadeInWhenVisible className="flex w-full flex-col justify-between max-lg:pr-10 lg:pt-10 xl:max-w-1/2 xl:px-0">
          <>
            <ASBRibbonText title={data.ribbonText} className="z-20" />
            <h2 className={cn("pb-8 text-white", variant == "secondary" && "text-primary-400", mainTitleClassName)}>
              {data.title ?? ""}
            </h2>
            <p
              className={cn(
                "font-mono text-white lg:pb-8 xl:pr-[180px] 2xl:pr-[120px]",
                variant == "secondary" && "text-neutral-300",
                mainDescriptionClassName
              )}
            >
              {data.description}
            </p>
          </>
        </AnimatedFadeInWhenVisible>

        <AnimatedFadeInWhenVisible className="flex w-full flex-col items-center justify-between">
          <>
            <div className={cn("z-10 flex w-full pt-10 md:hidden", !className && "max-lg:pr-10")}>
              <DropdownButtonMenus
                headerContent={data.selectedTitle ?? ""}
                options={data.tabs ?? []}
                onOptionSelect={(id) => setSelectedTabId(id)}
                buttonClassName="h-16"
                containerClassName={dropDownContainerClassName}
              />
            </div>
            <div className="flex h-full w-full overflow-x-auto">
              <ProfileCardCarousel
                groupCardsNumber={groupCardsNumber}
                requiredGroupCards={requiredGroupCards}
                breakpoints={breakpoints}
                openModal={openModal}
                isProfile={isProfile}
                filterContent={
                  <div className={cn("z-1 hidden flex-row justify-between md:flex", !className && "max-lg:px-10")}>
                    {isFilterDropdown ? (
                      <DropdownButtonMenus
                        headerContent={data.selectedTitle ?? ""}
                        options={data.tabs ?? []}
                        onOptionSelect={(id) => setSelectedTabId(id)}
                        containerClassName={dropDownContainerClassName}
                        buttonClassName="h-16"
                      />
                    ) : (
                      <FilterButton
                        options={data.tabs ?? []}
                        onChange={(id) => setSelectedTabId(id)}
                        variant={variant}
                        className={cn("border-none", filterButtonClassName)}
                        customMinusTopOffset={customMinusTopOffset}
                      />
                    )}
                  </div>
                }
                profileCardData={data.tabs?.find((e) => e.id === selectedTabId)?.cards ?? ([] as any)}
                badgeLabel={data.tabs?.find((e) => e.id == selectedTabId)?.title ?? ""}
                groupButtonClassName="max-lg:pr-10"
              />
            </div>
          </>
        </AnimatedFadeInWhenVisible>

        <AnimatedFadeInWhenVisible className="flex w-full justify-center pt-10 max-lg:pr-10 max-md:pb-20">
          {data.mainButtonLabel && data.mainButtonUrl && (
            <LinkButton
              buttonText={data.mainButtonLabel}
              href={data.mainButtonUrl}
              linkClassName={variant == "primary" ? "bg-secondary" : ""}
            />
          )}
        </AnimatedFadeInWhenVisible>
      </SectionContainer>
    </>
  );
};

export default HoverCardWithFilterSection;
