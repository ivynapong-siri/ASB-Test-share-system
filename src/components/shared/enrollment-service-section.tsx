"use client";

import { useSharedSections } from "@/client/contexts/shared-sections-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment } from "react";
import LinkButton from "../custom/buttons/link-button";

interface EnrollmentServiceCardProps {
  iconSrc: string;
  title: string;
  buttonText: string;
  buttonLink?: string;
}

const EnrollmentServiceMenu = ({ iconSrc, title, buttonText, buttonLink }: EnrollmentServiceCardProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center py-12">
      <div className="relative h-24 w-24">
        <Image
          alt={title}
          src={iconSrc}
          fill
          className={"rounded-t-[20px] object-contain"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h4 className="text-center">{title}</h4>
      <div className="flex justify-center pt-6">
        <LinkButton
          buttonText={buttonText}
          href={buttonLink || ""}
          iconClassName="text-white border border-dashed border-white rounded-full"
        />
      </div>
    </div>
  );
};

interface EnrollmentServiceSectionProps {
  className?: string;
}

const EnrollmentServiceSection = ({ className }: EnrollmentServiceSectionProps) => {
  const sharedSection = useSharedSections();
  const enrollmentServiceMenus =
    Array.isArray(sharedSection) && sharedSection[1]?.cards
      ? sharedSection[1].cards.map((card) => ({
          title: card.title,
          buttonText: card.buttonLabel,
          iconSrc: card.image?.imageUrl ?? "",
          buttonLink: card.buttonUrl,
        }))
      : [];

  return (
    <div className={cn("bg-primary-gray flex w-full flex-col border border-[#12326D]/20 lg:flex-row", className)}>
      {enrollmentServiceMenus.map((menu, index) => (
        <Fragment key={index}>
          <div className="flex flex-1 flex-col items-center justify-center">
            <EnrollmentServiceMenu
              iconSrc={menu.iconSrc}
              title={menu.title}
              buttonText={menu.buttonText}
              buttonLink={menu.buttonLink}
            />
          </div>

          {/* Divider for large screens (vertical line) */}
          {index !== enrollmentServiceMenus.length - 1 && (
            <>
              <div className="hidden min-h-full w-0.5 bg-[#12326D]/10 lg:block" />
              <hr className="bg-primary-gray h-px w-full border-1 lg:hidden" />
            </>
          )}

          {/* Divider for small screens (horizontal line) */}
          {index !== enrollmentServiceMenus.length - 1 && (
            <hr className="h-px w-full border-0 bg-[#12326D]/10 lg:hidden" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default EnrollmentServiceSection;
