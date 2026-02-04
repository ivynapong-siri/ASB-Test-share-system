import React from "react";

import { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onStartButtonClick?: () => void;
  onEndButtonClick?: () => void;
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ startIcon: StartIcon, endIcon: EndIcon, onStartButtonClick, onEndButtonClick, ...props }, ref) => {
    return (
      <div className="group relative flex items-center">
        {StartIcon && (
          <StartIcon
            className="text-primary group-hover:text-primary absolute left-3 size-4"
            onClick={onStartButtonClick ? onStartButtonClick : undefined}
          ></StartIcon>
        )}
        <Input ref={ref} {...props} className={cn(props.className, StartIcon ? "pl-10" : "", EndIcon ? "pr-10" : "")} />
        {EndIcon && (
          <EndIcon
            className="text-primary absolute right-3 size-4"
            onClick={onEndButtonClick ? onEndButtonClick : undefined}
          />
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIconButton";
