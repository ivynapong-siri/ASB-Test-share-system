"use client";

import { ReactNode, useEffect, useState } from "react";

import ASBDescription from "../custom/asb-description";
import AdmissionCard from "../custom/cards/admission-card";
import { AnimatedFadeInWhenVisible } from "./animation-section";
import DropdownButtonMenus from "../custom/dropdown-button-menus";
import FilterButton from "../custom/filter-button";
import LinkButton from "../custom/buttons/link-button";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionContainer } from "../custom/section-container";
import { SectionWithTabJson } from "@/server/serializers/section-serializer";
import { cn } from "@/lib/utils";

interface MarkYourCalendarSectionProps {
  data: SectionWithTabJson;
  sectionClassName?: string;
  className?: string;
  descriptionAdmissionCardClassName?: string;
  buttonLeftIconClassName?: string;
  buttonRightIconClassName?: string;
  buttonLeftLinkClassName?: string;
  buttonRightLinkClassName?: string;
  buttonContainerClassName?: string;
  vectorChildren?: ReactNode;
  variant?: "primary" | "secondary";
  requireDropDownButton?: boolean;
  requiredShowTitle?: boolean;
  customMinusTopOffset?: number;
}

const MarkYourCalendarSection = ({
  data,
  className,
  sectionClassName,
  descriptionAdmissionCardClassName,
  buttonLeftIconClassName,
  buttonRightIconClassName,
  buttonLeftLinkClassName,
  buttonRightLinkClassName,
  buttonContainerClassName,
  variant = "primary",
  requireDropDownButton = true,
  vectorChildren,
  requiredShowTitle = true,
  customMinusTopOffset,
}: MarkYourCalendarSectionProps) => {
  const [selectedTabId, setSelectedTabId] = useState<number>(data.tabs?.[0]?.id ?? 0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [selectedTabId]);

  return (
    <SectionContainer
      vectorChildren={vectorChildren}
      sectionClassName={cn(variant == "primary" ? "bg-primary" : "bg-white", sectionClassName)}
      className={cn("gap-10", variant == "primary" ? "text-white" : "text-primary", className)}
    >
      <AnimatedFadeInWhenVisible className="flex flex-col gap-8">
        <h2 className={cn(variant == "primary" && "text-white")}>{data.title ?? ""}</h2>
        <div
          className={cn(
            "flex justify-between",
            requireDropDownButton ? "flex-col lg:flex-row" : "flex-col gap-8 md:gap-16 lg:flex-row"
          )}
        >
          <ASBDescription
            description={data.description ?? ""}
            className={cn("font-light lg:w-1/2", variant == "primary" ? "text-white" : "text-primary")}
          />
          <div
            className={cn(
              requireDropDownButton ? "hidden sm:flex sm:pt-8" : "flex items-center justify-center max-lg:w-full"
            )}
          >
            <FilterButton
              options={data.tabs ?? []}
              onChange={(id) => setSelectedTabId(id)}
              variant={variant}
              className="w-full"
              buttonClassName="max-lg:w-full"
              customMinusTopOffset={customMinusTopOffset}
            />
          </div>
        </div>

        <div
          className={cn(
            "rounded-full border-1 border-white/10 bg-white/10 md:hidden",
            requireDropDownButton ? "max-md:hidden max-sm:flex" : "hidden"
          )}
        >
          <DropdownButtonMenus
            containerClassName="bg-secondary-200"
            headerContent={data.selectedTitle ?? "Select Options"}
            options={data.tabs ?? []}
            buttonClassName="h-16"
            onOptionSelect={(id) => setSelectedTabId(id)}
          />
        </div>
      </AnimatedFadeInWhenVisible>

      <AnimatedFadeInWhenVisible className="flex flex-col gap-6">
        <p
          className={cn(
            "text-xl font-semibold transition-opacity duration-300 lg:text-[1.75rem]",
            isAnimating ? "opacity-0" : "opacity-100"
          )}
        >
          {requiredShowTitle ? (data.tabs ? data.tabs.find((e) => e.id === selectedTabId)?.title : "No data") : null}
        </p>
        <div
          className={cn(
            "grid grid-cols-1 gap-4 transition-opacity duration-300 md:grid-cols-2 xl:grid-cols-3",
            isAnimating ? "opacity-0" : "opacity-100"
          )}
        >
          {(data.tabs?.find((e) => e.id === selectedTabId)?.cards ?? []).map((card) => (
            <AdmissionCard
              key={(card as SectionCardJson).id}
              description={(card as SectionCardJson).description}
              title={(card as SectionCardJson).title}
              fromDate={(card as SectionCardJson).from}
              toDate={(card as SectionCardJson).to}
              badge={(card as SectionCardJson).badge}
              descriptionClassName={descriptionAdmissionCardClassName}
            />
          ))}
        </div>
      </AnimatedFadeInWhenVisible>

      <AnimatedFadeInWhenVisible className="flex w-full flex-col items-center justify-center gap-4 pt-8 lg:w-full lg:flex-row">
        <div className={cn("flex h-full flex-col gap-4 lg:flex-row", buttonContainerClassName)}>
          <LinkButton
            buttonText={data.buttonLabelLeft}
            href={data.buttonUrlLeft}
            linkButtonVariant={variant}
            linkClassName={cn(
              "w-full text-sm lg:w-fit",
              variant == "secondary" && "border-primary-200 border",
              variant == "primary" && "border text-white",
              buttonLeftLinkClassName
            )}
            iconClassName={cn(buttonLeftIconClassName, variant == "primary" && "border-white")}
          />
          <LinkButton
            buttonText={data.buttonLabelRight}
            href={data.buttonUrlRight}
            linkClassName={cn(
              "bg-secondary w-full text-sm lg:w-fit",
              variant == "primary" ? "" : "bg-primary hover:border-secondary border border-white",
              buttonRightLinkClassName
            )}
            iconClassName={buttonRightIconClassName}
          />
        </div>
      </AnimatedFadeInWhenVisible>
    </SectionContainer>
  );
};

export default MarkYourCalendarSection;
