import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface PictureFrameProps {
  image: string;
  className?: string;
  borderClassName?: string;
  imageClassName?: string;
  topLeftIcon?: ReactNode;
  topRightIcon?: ReactNode;
  bottomLeftIcon?: ReactNode;
  bottomRightIcon?: ReactNode;
  topLeftIconClassName?: string;
  topRightIconClassName?: string;
  bottomLeftIconClassName?: string;
  bottomRightIconClassName?: string;
  imageWrapClassName?: string;
}

const ProfilePictureFrame = ({
  image,
  className,
  borderClassName,
  imageClassName,
  bottomLeftIcon,
  bottomRightIcon,
  topLeftIcon,
  topRightIcon,
  bottomLeftIconClassName,
  bottomRightIconClassName,
  topLeftIconClassName,
  topRightIconClassName,
  imageWrapClassName,
}: PictureFrameProps) => {
  return (
    <div className={cn("relative flex", className)}>
      <div
        className={cn(
          "absolute inset-0 z-0 rotate-[356deg] rounded-[32px] border border-[#9EB2C8] xl:rounded-[50px] 2xl:rounded-[53.51px]",
          borderClassName
        )}
      ></div>
      <div
        className={cn(
          "relative z-10 h-[480px] w-[300px] overflow-hidden rounded-4xl lg:h-[524px] lg:w-[942px] 2xl:h-[560px] 2xl:w-[1008px]",
          imageWrapClassName
        )}
      >
        <Image alt={image} src={image} fill className={imageClassName} priority />
      </div>
      {topLeftIcon && <div className={cn("absolute top-14 left-2 z-20", topLeftIconClassName)}>{topLeftIcon}</div>}
      {topRightIcon && <div className={cn("absolute -top-4 right-12 z-20", topRightIconClassName)}>{topRightIcon}</div>}
      {bottomLeftIcon && (
        <div className={cn("absolute bottom-4 left-2 z-20", bottomLeftIconClassName)}>{bottomLeftIcon}</div>
      )}
      {bottomRightIcon && (
        <div className={cn("absolute right-8 bottom-8 z-20", bottomRightIconClassName)}>{bottomRightIcon}</div>
      )}
    </div>
  );
};

export default ProfilePictureFrame;
