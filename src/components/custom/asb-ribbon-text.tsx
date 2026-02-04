import { cn } from "@/lib/utils";
import { TextHighlight1 } from "../shapes";

type ASBRibbonTextProps = {
  title: string;
  className?: string;
  ribbonClassName?: string;
  imageClassName?: string;
  vectorHidden?: boolean;
  vectorPosition?: "left" | "right";
};

function ASBRibbonText({
  title,
  className,
  ribbonClassName,
  imageClassName,
  vectorHidden,
  vectorPosition = "right",
}: ASBRibbonTextProps) {
  return (
    <div className={cn("flex flex-row items-center font-mono", className)}>
      {!vectorHidden && vectorPosition === "left" && (
        <TextHighlight1 className={cn("relative h-14 w-16", imageClassName)} />
      )}
      <div
        className={cn(
          "text-primary-400 h-fit border-x-0 border-y-[1px] border-[#1F94FB] bg-[#B2D9FC] px-3 py-1 text-xs font-medium tracking-widest uppercase sm:text-sm",
          ribbonClassName
        )}
      >
        {title}
      </div>
      {!vectorHidden && vectorPosition === "right" && (
        <TextHighlight1 className={cn("relative h-14 w-16", imageClassName)} />
      )}
    </div>
  );
}

export default ASBRibbonText;
