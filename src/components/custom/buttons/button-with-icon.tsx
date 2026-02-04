import React from "react";

import { VariantProps } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface ButtonWithIconsProps extends ButtonProps {
  startIcon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  endIcon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  iconClass?: string;
  borderClass?: string;
  showIcon?: boolean;
}

export const ButtonWithIcons = React.forwardRef<HTMLButtonElement, ButtonWithIconsProps>(
  (
    { startIcon: StartIcon, showIcon, endIcon: EndIcon, borderClass, className, children, iconClass, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn("group/button flex items-center gap-2 py-6 font-medium uppercase", className)}
      >
        {StartIcon && showIcon && <StartIcon className={cn("h-4 w-4", iconClass ? iconClass : "")} />}
        {children}
        {EndIcon && showIcon && <EndIcon className={cn("h-4 w-4", iconClass ? iconClass : "")} />}
      </Button>
    );
  }
);

ButtonWithIcons.displayName = "ButtonWithIcons";
