import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

export interface PictureFrameProps {
  imageSrc: string;
  containerClassName?: string;
  borderClassName?: string;
  imageClassName?: string;
  imageContainerClassName?: string;
  topLeftIcon?: ReactNode;
  topRightIcon?: ReactNode;
  bottomLeftIcon?: ReactNode;
  bottomRightIcon?: ReactNode;
  topLeftIconClassName?: string;
  topRightIconClassName?: string;
  bottomLeftIconClassName?: string;
  bottomRightIconClassName?: string;
}

const PictureFrame = ({
  imageSrc,
  containerClassName,
  borderClassName,
  imageClassName,
  imageContainerClassName,
  topLeftIcon,
  topRightIcon,
  bottomLeftIcon,
  bottomRightIcon,
  topLeftIconClassName,
  topRightIconClassName,
  bottomLeftIconClassName,
  bottomRightIconClassName,
}: PictureFrameProps) => {
  return (
    <div className={cn("relative flex flex-col items-center justify-center", containerClassName)}>
      {/* Border */}
      <div
        className={cn(
          "absolute z-0 h-[332px] w-[297px] rounded-[50px] border border-[#9EB2C8] xl:h-[530px] xl:w-[480px]",
          "translate-x-[3.25%] transform",
          borderClassName
        )}
      />

      {/* Image */}
      <div
        className={cn(
          "relative z-10 aspect-[0.94/1] h-[324px] w-[305px] rotate-[7.25deg] transform xl:h-[530px] xl:w-[480px]",
          imageContainerClassName
        )}
      >
        <Image
          alt="Picture Frame"
          src={imageSrc}
          priority
          fill
          sizes="(max-width: 768px) 305px, (max-width: 1280px) 480px, 480px"
          className={cn("rounded-[50px] object-cover", imageClassName)}
        />
      </div>

      {/* Icons */}
      {topLeftIcon && <div className={cn("absolute z-20", topLeftIconClassName)}>{topLeftIcon}</div>}
      {topRightIcon && <div className={cn("absolute z-20", topRightIconClassName)}>{topRightIcon}</div>}
      {bottomLeftIcon && <div className={cn("absolute z-20", bottomLeftIconClassName)}>{bottomLeftIcon}</div>}
      {bottomRightIcon && <div className={cn("absolute z-20", bottomRightIconClassName)}>{bottomRightIcon}</div>}
    </div>
  );
};

export default PictureFrame;
