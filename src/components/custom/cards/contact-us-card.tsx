"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type ContactUsCardProps = {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
  isPhoneNumber?: boolean;
  isEmail?: boolean;
};

const ContactUsCard = ({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  className,
  imageClassName,
  imageWrapperClassName,
  isEmail,
  isPhoneNumber,
}: ContactUsCardProps) => {
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (isPhoneNumber) {
      return (
        <a
          href={`tel:${subtitle}`}
          className={cn(
            "text-neutral hover:text-primary-400 mt-auto line-clamp-4 min-h-10 flex-shrink-0 font-mono text-sm/[1.25rem] transition-colors",
            subtitleClassName
          )}
        >
          {subtitle}
        </a>
      );
    }

    if (isEmail) {
      return (
        <a
          href={`mailto:${subtitle}`}
          className={cn(
            "text-neutral hover:text-primary-400 mt-auto line-clamp-4 min-h-10 flex-shrink-0 font-mono text-sm/[1.25rem] transition-colors",
            subtitleClassName
          )}
        >
          {subtitle}
        </a>
      );
    }

    return (
      <p
        className={cn(
          "text-neutral mt-auto line-clamp-4 min-h-10 flex-shrink-0 font-mono text-sm/[1.25rem]",
          subtitleClassName
        )}
      >
        {subtitle}
      </p>
    );
  };

  return (
    <div
      className={cn(
        "bg-primary-gray flex h-92 w-auto min-w-[300px] flex-col justify-between overflow-hidden rounded-4xl p-9",
        className
      )}
    >
      <div className={cn("relative mb-4 flex h-[69px] w-[69px] justify-start", imageWrapperClassName)}>
        <Image src="/gear.svg" alt="gear icon" fill className={cn("object-cover", imageClassName)} />
      </div>
      <div className="flex flex-1 flex-col">
        <h6 className={cn("text-primary-400 line-clamp-3 min-h-12 flex-shrink-0 font-bold", titleClassName)}>
          {title}
        </h6>
        {renderSubtitle()}
      </div>
    </div>
  );
};

export default ContactUsCard;
