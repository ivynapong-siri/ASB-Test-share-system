import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ASBDescription from "./asb-description";
import ASBRibbonText from "./asb-ribbon-text";
import ASBTitle from "./asb-title";
import { SectionContainer } from "./section-container";

interface TitleDescriptionCenterContainerProps {
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  children?: ReactNode;
  className?: string;
  sectionClassName?: string;
  ribbonText?: string;
  vectorChildren?: ReactNode;
  headerClassName?: string;
}

export default function TitleDescriptionCenterContainer({
  children,
  description,
  descriptionClassName,
  title,
  titleClassName,
  className,
  ribbonText,
  sectionClassName,
  vectorChildren,
  headerClassName,
}: TitleDescriptionCenterContainerProps) {
  return (
    <SectionContainer
      sectionClassName={sectionClassName}
      className={cn("items-center gap-8", className)}
      vectorChildren={vectorChildren}
    >
      <div className={cn("flex flex-col items-center", headerClassName)}>
        {ribbonText && <ASBRibbonText title={ribbonText} className="translate-x-8" />}
        <ASBTitle title={title} className={titleClassName} />
      </div>
      <ASBDescription
        description={description}
        className={cn("max-w-2xl text-center font-mono", descriptionClassName)}
      />
      {children}
    </SectionContainer>
  );
}
