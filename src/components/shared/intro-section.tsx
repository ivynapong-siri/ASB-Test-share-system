"use client";

import React, { ReactNode, RefObject } from "react";
import PictureFrame, { PictureFrameProps } from "../custom/picture-frame";
import { PatternStroke1, PatternStroke2 } from "../shapes";

import { cn } from "@/lib/utils";
import ASBDescription from "../custom/asb-description";
import ASBRibbonText from "../custom/asb-ribbon-text";
import ASBTitle from "../custom/asb-title";
import BreadcrumbCustom from "../custom/breadcrumb-custom";
import LinkButton from "../custom/buttons/link-button";
import { SectionContainer } from "../custom/section-container";

interface IntroSectionProps {
  title?: string | null;
  titleClassName?: string;
  description?: string | null;
  descriptionClassName?: string;
  ribbonText?: string | null;
  vectorChildren?: React.ReactNode;
  textClassName?: string;
  showStandardVector?: boolean;
  showBreadcrumb?: boolean;
  haveButton?: boolean;
  buttonConfig?: {
    buttonText: string;
    href: string;
  };
  reverse?: boolean;
  children?: ReactNode;
  breadcrumbClickable?: boolean;
  breadcrumbs1?: string;
  breadcrumbs2?: string;
  className?: string;
  patternStroke1ClassName?: string;
  patternStroke2ClassName?: string;
  breadcrumbClassname?: string;
  ribbonClassName?: string;
  sectionRef?: RefObject<HTMLDivElement | null>;
}

const IntroSection: React.FC<IntroSectionProps & PictureFrameProps> = ({
  title,
  titleClassName,
  description,
  descriptionClassName,
  ribbonText,
  vectorChildren,
  reverse,
  haveButton,
  showStandardVector = true,
  showBreadcrumb = true,
  textClassName,
  buttonConfig,
  children,
  breadcrumbClickable = false,
  breadcrumbs1,
  breadcrumbs2,
  className,
  patternStroke1ClassName,
  patternStroke2ClassName,
  breadcrumbClassname,
  ribbonClassName,
  sectionRef,
  ...pictureFrameProps
}) => {
  return (
    <div className="relative">
      {vectorChildren
        ? vectorChildren
        : showStandardVector && (
            <>
              <PatternStroke1
                className={cn(
                  "absolute top-12 -right-40 h-32 w-64 lg:-top-20 lg:-right-60 lg:h-[265px] lg:w-[360px] xl:-top-30",
                  patternStroke1ClassName
                )}
              />
              <PatternStroke2
                className={cn(
                  "absolute bottom-0 -left-13 h-32 w-64 lg:h-[265px] lg:w-[360px]",
                  patternStroke2ClassName
                )}
              />
            </>
          )}
      <SectionContainer className={cn("gap-20", className)} ref={sectionRef}>
        {showBreadcrumb && (
          <div className={cn("flex w-full", breadcrumbClassname)}>
            <BreadcrumbCustom
              isClick={breadcrumbClickable}
              data={{ breadcrumbs1: breadcrumbs1, breadcrumbs2: breadcrumbs2 }}
            />
          </div>
        )}
        <div
          className={`flex flex-col gap-12 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} lg:justify-between lg:gap-20`}
        >
          <div className={cn("flex flex-col", textClassName)}>
            {ribbonText && <ASBRibbonText title={ribbonText} ribbonClassName={ribbonClassName} />}
            <div className="flex flex-col gap-[1.875rem] xl:gap-8">
              {title && <ASBTitle title={title} className={cn("text-start", titleClassName)} />}
              {description && (
                <ASBDescription description={description} className={cn("max-w-3xl font-mono", descriptionClassName)} />
              )}
              {haveButton && buttonConfig && (
                <LinkButton buttonText={buttonConfig.buttonText} href={buttonConfig.href} />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <PictureFrame {...pictureFrameProps} />
          </div>
        </div>
        {children}
      </SectionContainer>
    </div>
  );
};

export default IntroSection;
