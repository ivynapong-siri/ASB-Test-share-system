import { TabArrowLeftIcon, TabArrowRightIcon } from "@/components/icons";

import { cn } from "@/lib/utils";

export const NavigationRoundedButton = ({
  direction,
  navigationName,
  className,
  iconClassName,
  onClick,
  disabled = false,
}: {
  direction: "prev" | "next";
  navigationName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconClassName?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const Icon = direction === "prev" ? TabArrowLeftIcon : TabArrowRightIcon;

  return (
    <button
      className={cn(
        `${navigationName}-swiper-button-${direction} hover:bg-secondary-300 bg-secondary rounded-full p-1 text-white hover:cursor-pointer`,
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className={cn("size-8", iconClassName)} />
    </button>
  );
};
