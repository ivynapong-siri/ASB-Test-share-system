"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { renderHtmlContent } from "@/components/pages/admission/admission-process/AdmissionAndProcessJourneyStepComponent";
import { cn } from "@/lib/utils";
import { formattedPaddingNumbers } from "@/server/utils/helpers";
import Image from "next/image";

interface BlogCardWithIndexProps {
  title: string;
  content: string;
  imageSrc?: string;
  shortTitle?: string;
  index: number;
  titleClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  shortTitleClassName?: string;
  isImageOnTop?: boolean;
  badgeClassName?: string;
  contentBackgroundClassName?: string;
  className?: string;
  cardClassName?: string;
  isKeyPillar?: boolean;
  imageBackground?: string;
  imageBackgroundClassName?: string;
  imageBackgroundWrapperClassName?: string;
  getContentHeight?: Dispatch<SetStateAction<number>>;
  richText?: boolean;
  richTextClassName?: string;
  maxHeight?: number;
  fallbackUrl?: string;
  setImgSrc?: Dispatch<SetStateAction<string>>;
}

const BlogCardWithIndex = ({
  title,
  content,
  imageSrc,
  shortTitle,
  index,
  contentClassName,
  imageClassName,
  isImageOnTop,
  titleClassName,
  badgeClassName,
  contentBackgroundClassName,
  shortTitleClassName,
  className,
  isKeyPillar,
  cardClassName,
  imageBackground,
  imageBackgroundClassName,
  imageBackgroundWrapperClassName,
  getContentHeight,
  richText,
  richTextClassName,
  maxHeight,
  fallbackUrl,
  setImgSrc,
}: BlogCardWithIndexProps) => {
  const titleClasses = cn("z-10 font-sans text-[1.75rem]/[2rem]", titleClassName);
  const contentClasses = cn("z-10 font-mono text-[0.875rem]/[1.25rem]", contentClassName);
  const contentBackgroundClasses = cn(
    "text-primary flex flex-col gap-6 bg-white px-8 py-8 font-mono",
    isImageOnTop ? "rounded-b-4xl" : "rounded-t-4xl",
    contentBackgroundClassName
  );
  const imageClasses = cn("relative flex h-full min-h-92", imageClassName);
  const badgeClasses = cn(
    "bg-secondary absolute top-0 z-10 -translate-y-1/2 rounded-4xl px-6 py-1 font-mono font-medium tracking-widest text-white",
    badgeClassName
  );
  const shortTitleClasses = cn(
    "z-10 flex items-center justify-center pt-12 pb-18 font-sans text-[146px]/[96px] text-[#E4EAEE] lg:pb-14",
    shortTitleClassName
  );

  const formattedNumbers = formattedPaddingNumbers(index);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getContentHeight || !contentRef.current) return;

    const measure = () => {
      const height = contentRef.current?.offsetHeight || 0;
      if (height > 0) getContentHeight(height);
    };

    requestAnimationFrame(measure);
  }, [title, content, richText, getContentHeight]);

  return (
    <div
      className={cn("flex flex-col", !isImageOnTop && "flex-col-reverse", className)}
      style={maxHeight ? { height: `${maxHeight}px` } : undefined}
    >
      {imageSrc && setImgSrc && fallbackUrl && (
        <div className={imageClasses}>
          <Image
            alt=""
            src={imageSrc}
            fill
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover",
              isKeyPillar
                ? isImageOnTop
                  ? "rounded-t-[50px] md:rounded-t-[6.25rem]"
                  : "rounded-b-[50px] md:rounded-b-[6.25rem]"
                : isImageOnTop
                  ? "rounded-t-[50px] md:rounded-t-4xl"
                  : "rounded-b-[50px] md:rounded-b-4xl"
            )}
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
            onError={() => {
              if (imageSrc !== fallbackUrl) {
                console.warn(`Image failed to load: ${imageSrc}, switching to fallback.`);
                setImgSrc(fallbackUrl);
              }
            }}
          />
        </div>
      )}

      <div className={cn("relative flex h-full w-full", cardClassName)}>
        <div className={cn("absolute top-1/6 left-1/6 h-2/3 w-2/3", imageBackgroundWrapperClassName)}>
          {imageBackground && setImgSrc && fallbackUrl && (
            <Image
              alt="background"
              src={imageBackground ?? "/bg-1.svg"}
              fill
              priority
              quality={95}
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 400px"
              className={cn("z-0 object-contain opacity-100 mix-blend-multiply", imageBackgroundClassName)}
              placeholder="blur"
              blurDataURL={"/blur-image.jpg"}
              onError={() => {
                if (imageSrc !== fallbackUrl) {
                  console.warn(`Image failed to load: ${imageSrc}, switching to fallback.`);
                  setImgSrc(fallbackUrl);
                }
              }}
            />
          )}
        </div>
        <div ref={contentRef} className={contentBackgroundClasses}>
          <div className="z-10">
            <h5 className={titleClasses}>{title}</h5>
            {shortTitle && <p className={shortTitleClasses}>{shortTitle}</p>}
          </div>
          <p className={contentClasses}>{richText ? renderHtmlContent(content, richTextClassName) : content}</p>
          <div className={badgeClasses}>{formattedNumbers}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardWithIndex;
