import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export interface BoxBorderDashedProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string;
  color: "primary" | "secondary" | "white";
  stokeWidth?: number;
  borderRadius?: number;
}

const COLOR_VALUE_MAP = {
  primary: "%2312326DFF",
  secondary: "%23B81E29FF",
  white: "%23FFFFFF",
};

export const BoxBorderDashed = ({
  children,
  className,
  color,
  stokeWidth,
  borderRadius,
  ...props
}: BoxBorderDashedProps) => {
  const colorValue = COLOR_VALUE_MAP[color];
  return (
    <div
      className={cn("flex w-full flex-col gap-4 rounded-4xl bg-cover bg-no-repeat px-10 py-2", className || "")}
      style={{
        backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${borderRadius ?? 32}' ry='${borderRadius ?? 32}' stroke='${colorValue}' stroke-width='${stokeWidth || 3}' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
        borderRadius: borderRadius ?? 32,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
