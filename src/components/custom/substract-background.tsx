import { SubtractLeft, SubtractRight } from "../icons";

import { cn } from "@/lib/utils";

interface SubstractBackgroundProps {
  height: string;
  topAreaClassName?: string;
  isCenter?: boolean;
  backgroundColor?: string;
}

export default function SubstractBackground({
  backgroundColor,
  isCenter,
  topAreaClassName,

  height,
}: SubstractBackgroundProps) {
  const RenderSubtract = () => {
    return (
      <div className="flex" style={{ height }}>
        <div className="relative aspect-[74/156] h-full">
          <SubtractLeft className="h-full w-full fill-current" color={backgroundColor} />
        </div>
        <div
          className="grow"
          style={{
            backgroundColor: backgroundColor ?? "var(--color-muted)",
          }}
        />
        <div className="relative aspect-[74/156] h-full">
          <SubtractRight className="h-full w-full fill-current" color={backgroundColor} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className={cn(isCenter ? "grow" : "h-[200px]", topAreaClassName)}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "var(--color-muted)",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
        }}
      />

      <RenderSubtract />

      <div
        className="grow rounded-b-[40px]"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "var(--color-muted)",
        }}
      />
    </div>
  );
}
