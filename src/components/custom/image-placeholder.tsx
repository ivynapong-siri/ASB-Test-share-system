import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import React from "react";

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  isShowIcon?: boolean;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text = "Image",
  className,
  textClassName,
  iconClassName,
  isShowIcon = true,
}) => {
  return (
    <div
      className={cn("flex h-32 w-32 flex-col items-center justify-center rounded-md bg-gray-200", className)}
      role="img"
      aria-label="Image placeholder"
    >
      {isShowIcon && <ImageIcon className={cn("mb-2 h-8 w-8 text-gray-400", iconClassName)} />}
      <span className={cn("text-sm font-medium text-gray-600", textClassName)}>{text}</span>
    </div>
  );
};

export default ImagePlaceholder;
