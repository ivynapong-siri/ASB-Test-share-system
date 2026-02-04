import { PatternStroke1, PatternStroke2 } from "@/components/shapes";

import ASBDescription from "@/components/custom/asb-description";
import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import ASBTitle from "@/components/custom/asb-title";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";
import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import { BreadcrumbProps } from "@/server/models/model-types";
import { ReactNode } from "react";

interface StudentSupportTitleSectionProps {
  absTitle: string;
  headTitle: string;
  description: string;
  className?: string;
  haveLine?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  isPrimaryColor?: boolean;
  containerClassName?: string;
  breadcrumbData?: BreadcrumbProps;
}

export default function StudentSupportTitleSection({
  absTitle,
  headTitle,
  description,
  children,
  className,
  haveLine,
  titleClassName,
  descriptionClassName,
  containerClassName,
  isPrimaryColor,
  breadcrumbData,
}: Readonly<{ children?: ReactNode }> & StudentSupportTitleSectionProps) {
  const renderVectors = () =>
    haveLine ? (
      <>
        <PatternStroke1 className="absolute -top-[20px] -right-18 z-10 h-[120px] w-[150px] rotate-180 xl:-top-[50px] xl:-right-22 xl:h-[150px] xl:w-[340px]" />
        <PatternStroke2 className="absolute top-[140px] -left-32 h-[120px] w-[150px] rotate-30 sm:-left-30 xl:top-[120px] xl:-left-32 xl:h-[265px] xl:w-[360px]" />
      </>
    ) : undefined;

  return (
    <SectionContainer
      vectorChildren={renderVectors()}
      className={containerClassName}
      sectionClassName={cn(isPrimaryColor && "bg-primary-300", className)}
    >
      <div className="flex w-full flex-col">
        {!!breadcrumbData && (
          <BreadcrumbCustom
            data={{ breadcrumbs1: breadcrumbData.breadcrumb1, breadcrumbs2: breadcrumbData.breadcrumb2 }}
          />
        )}
        <div className="mt-10 flex flex-col items-center">
          <ASBRibbonText title={absTitle} className="translate-x-8" />
          <ASBTitle title={headTitle} as="h1" className={cn(isPrimaryColor ? "text-white" : "", titleClassName)} />
          <ASBDescription
            description={description}
            className={cn("mt-10 text-center", isPrimaryColor ? "text-white" : "", descriptionClassName ?? "")}
          />
        </div>
      </div>
      {children}
    </SectionContainer>
  );
}
