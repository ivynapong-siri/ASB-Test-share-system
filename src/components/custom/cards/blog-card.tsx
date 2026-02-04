"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React, { ReactNode } from "react";

import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LinkButton from "../buttons/link-button";

interface BlogCardBaseProps {
  title: string;
  content?: string;
  imgSrc: string;
  learnMoreHref?: string;
  classNameCard?: string;
  classNameCardHeader?: string;
  classNameImg?: string;
  classNameBadge?: string;
  classNameTitle?: string;
  classNameContent?: string;
  classNameFooter?: string;
  badgeOnImage?: boolean;
  badgeOnImageText?: string;
  dateTag?: string;
  isBadgeDate?: boolean;
  badgeDate?: string;
  classNameCardBody?: string;
  buttonText?: string;
  showFooter?: boolean;
  haveImageBackground?: boolean;
  imageBackground?: string;
  classImageBackground?: string;
  classNameContentText?: string;
  isHtmlTag?: boolean;
  classNameImagePosition?: string;
  onClick?: () => void;
  requiredSplitTitle?: boolean;
  secondTitle?: string;
  cardRef?: (el: HTMLHeadingElement | null) => void;
  maxCardHeight?: number;
  titleRef?: (el: HTMLHeadingElement | null) => void;
  maxTitleHeight?: number;
  customBadgeChildren?: ReactNode;
}

interface BlogCardWithBadgeProps extends BlogCardBaseProps {
  isBadge: true;
  badgeText: string;
}

interface BlogCardWithoutBadgeProps extends BlogCardBaseProps {
  isBadge?: false;
  badgeText?: never;
}

type BlogCardProps = BlogCardWithBadgeProps | BlogCardWithoutBadgeProps;

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  imgSrc,
  learnMoreHref,
  isBadge,
  badgeText,
  classNameCard,
  classNameCardHeader,
  classNameImg,
  classNameBadge,
  classNameTitle,
  classNameContent,
  classNameFooter,
  badgeOnImage,
  badgeOnImageText,
  classNameCardBody,
  dateTag,
  isBadgeDate,
  badgeDate,
  buttonText,
  showFooter = true,
  haveImageBackground = false,
  imageBackground,
  classImageBackground,
  classNameContentText,
  isHtmlTag,
  classNameImagePosition,
  onClick,
  requiredSplitTitle = false,
  secondTitle,
  cardRef,
  maxCardHeight,
  maxTitleHeight,
  titleRef,
  customBadgeChildren,
}) => {
  return (
    <Card
      ref={cardRef}
      className={cn("relative flex min-h-full flex-col border-none shadow-none", classNameCard)}
      style={{ minHeight: maxCardHeight || undefined }}
    >
      {isBadgeDate && (
        <div className="bg-secondary-200 absolute top-5 right-4 z-20 rounded-4xl px-6 py-2 font-mono text-xs tracking-widest text-white uppercase">
          {!badgeDate?.trim() ? "No date data in WP" : badgeDate}
        </div>
      )}
      {badgeOnImage && (
        <div
          className={cn(
            "text-secondary-200 absolute top-82 left-5 z-10 h-8 w-fit rounded-full bg-white px-3 py-2 font-mono text-xs font-medium tracking-widest uppercase",
            classNameBadge
          )}
        >
          {!badgeOnImageText?.trim() ? "No badge on image tag" : badgeOnImageText}
        </div>
      )}
      {dateTag && (
        <div className="bg-secondary-200 absolute top-6 right-5 z-10 flex h-8 w-fit items-center rounded-full px-3 font-mono text-xs font-medium tracking-widest text-white md:top-5">
          {!dateTag?.trim() ? "No date tag" : dateTag}
        </div>
      )}
      <div className={cn("relative h-96 w-full", classNameImg)}>
        <Image
          priority
          src={imgSrc}
          alt={title}
          fill
          className={cn("w-full rounded-t-4xl object-cover", classNameImagePosition)}
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={"/blur-image.jpg"}
        />
      </div>
      <div className={cn("relative z-10 flex min-h-full flex-col rounded-b-4xl bg-white", classNameCardBody)}>
        {haveImageBackground && (
          <div
            className={cn(
              "pointer-events-none absolute z-0 h-full w-2/3 overflow-hidden mix-blend-multiply",
              classImageBackground
            )}
          >
            <Image priority alt="background" src={imageBackground ?? "/bg-1.svg"} fill className="object-contain" />
          </div>
        )}
        <CardHeader className={cn(isBadge && "relative flex flex-col gap-2", classNameCardHeader)}>
          {customBadgeChildren
            ? customBadgeChildren
            : isBadge &&
              badgeText && (
                <div
                  className={cn(
                    "text-primary border-primary z-10 h-fit w-fit border-t border-b bg-[#B2D9FC] px-2 py-1 text-xs font-semibold uppercase",
                    classNameBadge
                  )}
                >
                  {badgeText}
                </div>
              )}
          <h3
            ref={titleRef}
            style={{ minHeight: maxTitleHeight || undefined }}
            className={cn("text-primary-400 font-sans text-[1.75rem]/[2rem] font-semibold", classNameTitle)}
          >
            {requiredSplitTitle ? (
              <>
                {title} <br /> {secondTitle}
              </>
            ) : (
              title
            )}
          </h3>
        </CardHeader>
        {content && (
          <CardContent className={cn(classNameContent)}>
            {isHtmlTag ? (
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(content || "") }}
                className={cn("text-muted-foreground relative line-clamp-3 font-mono text-sm", classNameContentText)}
              />
            ) : (
              <p className={cn("text-muted-foreground relative line-clamp-3 font-mono text-sm", classNameContentText)}>
                {content}
              </p>
            )}
          </CardContent>
        )}
        {showFooter && (
          <CardFooter className={cn(classNameFooter)}>
            <LinkButton
              onClick={(e) => {
                if (learnMoreHref === "" || learnMoreHref === "#") {
                  e?.preventDefault();
                  onClick?.();
                }
              }}
              buttonText={buttonText ?? "learn more"}
              href={learnMoreHref}
              linkClassName="bg-primary-200"
            />
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default BlogCard;
