"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import LinkButton from "../buttons/link-button";

interface NewsCardProps {
  title: string;
  content: string;
  contentMobile: string;
  imgSrc: string;
  learnMoreHref: string;
  badgeOnImage?: boolean;
  badgeOnImageText?: string;
  dateTag?: string;
  isBadgeDate?: boolean;
  badgeDate?: string;
  buttonText?: string;
  className?: string;
  cardClassName?: string;
  onClick?: () => void;
  imageClassName?: string;
  titleClassName?: string;
  cardRef?: (el: HTMLHeadingElement | null) => void;
  maxCardHeight?: number;
}

const NewsCard = React.memo(
  ({
    imgSrc,
    learnMoreHref,
    title,
    badgeDate,
    badgeOnImage,
    badgeOnImageText,
    buttonText,
    content,
    contentMobile,
    dateTag,
    isBadgeDate,
    className,
    cardClassName,
    onClick,
    imageClassName,
    titleClassName,
    cardRef,
    maxCardHeight,
  }: NewsCardProps) => {
    return (
      <Card
        ref={cardRef}
        className={cn(
          "relative flex h-full min-h-[648px] flex-col border-none bg-white shadow-none lg:min-h-full",
          className
        )}
        style={{ minHeight: maxCardHeight || undefined }}
      >
        {isBadgeDate && (
          <div className="bg-secondary-200 absolute top-5 right-4 z-20 rounded-4xl px-6 py-2 font-mono text-xs tracking-widest text-white uppercase">
            {badgeDate}
          </div>
        )}
        {badgeOnImage && (
          <div className="text-secondary-200 absolute top-82 left-5 z-10 h-8 w-fit rounded-full bg-white px-3 py-2 font-mono text-xs font-medium tracking-widest uppercase">
            {badgeOnImageText}
          </div>
        )}
        {dateTag && (
          <div className="bg-secondary-200 absolute top-6 right-5 z-10 flex h-8 w-fit items-center rounded-full px-3 font-mono text-xs font-medium tracking-widest text-white md:top-5">
            {dateTag}
          </div>
        )}
        <div className={cn("relative min-h-96 w-full", imageClassName)}>
          <Image
            priority
            src={imgSrc}
            alt={title}
            fill
            className="w-full rounded-t-4xl object-cover"
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={"/blur-image.jpg"}
          />
        </div>
        <div className={cn("z-10 flex h-full grow flex-col justify-between rounded-b-4xl bg-white", cardClassName)}>
          <CardHeader className="flex grow pt-8 lg:pt-8">
            <h3
              className={cn(
                "text-primary line-clamp-2 font-sans text-xl font-semibold md:text-xl lg:text-[28px]",
                titleClassName
              )}
            >
              {title}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="hidden md:flex">
              <div className="text-muted-foreground relative line-clamp-3 font-mono text-sm/[1.25rem]">
                {content.replace(/<[^>]*>?/gm, "")}
              </div>
            </div>
            <div className="flex md:hidden">
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(contentMobile) }}
                className="text-muted-foreground relative line-clamp-3 font-mono text-sm/[1.25rem] [&_*]:text-inherit"
              />
            </div>
          </CardContent>
          <CardFooter className="pb-5 lg:pb-8">
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
        </div>
      </Card>
    );
  }
);

export default NewsCard;
