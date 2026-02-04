"use client";

import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LinkButton from "../buttons/link-button";

export interface HoverCardProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  className?: string;
  backgroundContent: ReactNode;
  contentTitle?: string;
  badgeLabel?: string;
  badgeClassName?: string;
  description?: string;
  descriptionMobile?: string;
  isHover?: boolean;
  buttonLink?: string;
  buttonLabel?: string;
  buttonOnHover?: boolean;
  linkClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  personPosition?: string;
  personPositionClassName?: string;
  titleClassName?: string;
  isProfile?: boolean;
  descriptionClassName?: string;
  overlayClassName?: string;
  reduceTitleStyle?: boolean;
  haveBackgroundDescription?: boolean;
  customContentHoverClassName?: string;
  descriptionDivClassName?: string;
  contentStyleTranslation?: number;
  backgroundClassName?: string;
  customBackground?: boolean;
  conTentTitleClassName?: string;
  forceHover?: boolean;
  buttonAction?: () => void;
  onClick?: () => void;
  requiredHiddenStrip?: boolean;
  customBackdropBlurBackground?: ReactNode;
}

const HoverCard = ({
  title,
  className,
  personPosition,
  backgroundContent,
  descriptionMobile,
  description,
  badgeLabel,
  badgeClassName,
  contentTitle,
  conTentTitleClassName,
  isHover = true,
  buttonLink,
  buttonLabel,
  buttonOnHover,
  linkClassName,
  iconClassName,
  contentClassName,
  personPositionClassName,
  titleClassName,
  isProfile = false,
  descriptionClassName,
  overlayClassName,
  reduceTitleStyle,
  contentStyleTranslation = 20,
  haveBackgroundDescription = false,
  customContentHoverClassName,
  descriptionDivClassName,
  backgroundClassName,
  customBackground,
  forceHover,
  requiredHiddenStrip = true,
  buttonAction,
  onClick,
  customBackdropBlurBackground,
  ...props
}: HoverCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(forceHover || false);
  const [overlayHeight, setOverlayHeight] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const contentTitleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (forceHover) setIsHovered(true);
  }, [forceHover]);

  useEffect(() => {
    if (overlayRef.current) {
      setOverlayHeight(overlayRef.current.offsetHeight);
    }
  }, [description, overlayRef, width]);

  const isMobile = useIsMobile();

  const handleMouseEnter = () => {
    if (!isMobile && isHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && isHover) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (isMobile && isHover) {
      setIsHovered((prev) => !prev);
    }
  };

  const cardClasses = cn(
    "relative col-span-3 flex h-[32rem] w-full flex-col justify-between overflow-hidden rounded-4xl",
    "via-primary/30 to-primary z-10 bg-gradient-to-b from-transparent shadow",
    isProfile && requiredHiddenStrip && "border-4 border-transparent", // Hide edge white strip
    "transform-gpu will-change-transform backface-hidden",
    className
  );

  const contentStyle = isHovered
    ? {
        transform: reduceTitleStyle
          ? `translateY(-${overlayHeight - contentStyleTranslation}px)`
          : `translateY(-${overlayHeight + contentStyleTranslation}px)`,
      }
    : { transform: "translateY(0)" };

  const contentClasses = cn(
    "pointer-events-none z-20 flex min-w-sm transform-gpu flex-col gap-1 p-6 transition-all duration-300 ease-in-out will-change-transform",
    personPosition && "gap-4",
    isHovered && buttonOnHover && "pb-0",
    contentClassName
  );

  const overlayClasses = cn(
    "pointer-events-none absolute bottom-0 z-10 flex w-full flex-row items-center bg-gradient-to-b px-6 pb-8 font-medium text-white transition-all duration-300 ease-in-out",
    isHovered
      ? "z-30 translate-y-0 transform-gpu from-transparent to-[#b71e29] opacity-100"
      : "translate-y-10 opacity-0",
    !description && "duration-100"
  );

  const titleClasses = cn(
    "will-change-opacity font-sans text-2xl font-semibold text-white transition-none will-change-transform",
    buttonLabel && buttonLink && !buttonOnHover ? "pb-6" : "",
    personPosition && "pb-0",
    titleClassName
  );

  const personPositionClasses = cn(
    "will-change-opacity font-mono text-base/[1.625rem] text-white transition-none will-change-transform",
    personPositionClassName
  );

  return (
    <div
      ref={cardRef}
      key={title}
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {customBackdropBlurBackground ? (
        customBackdropBlurBackground
      ) : customBackground ? (
        <div
          className={cn(
            "absolute inset-0 z-0 transition-all duration-300",
            isHover && isHovered ? "bg-primary-300" : "via-primary/30 to-primary bg-gradient-to-b from-transparent",
            backgroundClassName
          )}
        />
      ) : isProfile ? (
        // <div
        //   className={cn(
        //     "mask-gradient-fade from-primary/0 to-primary/80 absolute inset-x-0 bottom-0 z-10 h-4/7 w-full min-w-[110%] bg-gradient-to-b backdrop-blur-md transition-opacity duration-300",
        //     backgroundClassName
        //   )}
        // />
        <>
          <div
            className={cn(
              "from-primary/0 to-primary/80 absolute bottom-0 h-4/7 w-full bg-gradient-to-b",
              backgroundClassName
            )}
          />
          <div className="mask-gradient-fade absolute bottom-0 h-4/7 w-full min-w-[110%] bg-[#D9D9D9]/[0.01] blur-[10px] backdrop-blur-[10px]" />
        </>
      ) : (
        <div
          className={cn(
            "mask-gradient-fade absolute right-0 bottom-0 left-0 z-10 h-1/2 w-full rounded-b-xl border-none bg-gradient-to-b opacity-80 backdrop-blur-md transition-opacity duration-300",
            isHover && isHovered
              ? "h-2/3 from-transparent to-[#b71e29] opacity-100"
              : "via-primary/80 to-primary from-primary/0",
            backgroundClassName
          )}
        /> // TODO: Still has a little white strip because of Swiper libs
      )}

      <div className="-z-1 opacity-100">{backgroundContent}</div>

      <div className={contentClasses} style={contentStyle}>
        {badgeLabel && (
          <div
            className={cn(
              "text-primary-400 w-fit min-w-0 rounded-full bg-white px-3 py-2 font-mono text-[0.75rem] font-medium tracking-widest uppercase",
              badgeClassName
            )}
          >
            {badgeLabel}
          </div>
        )}

        <div
          className={cn(
            "flex w-full flex-col gap-3",
            isHovered ? cn(description ? "pb-2" : "pb-16", customContentHoverClassName) : ""
          )}
        >
          <h4 className={titleClasses}>{title}</h4>
          {personPosition && <p className={personPositionClasses}>{personPosition}</p>}
        </div>

        {contentTitle && (
          <div
            ref={contentTitleRef}
            className={cn(
              "pointer-events-none absolute bottom-0 z-10 flex w-full flex-row items-center font-light text-white transition-all duration-300 ease-in-out",
              isHovered ? "z-30 translate-y-0 transform-gpu opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <span className={cn("max-w-[310px] font-mono lg:max-w-lg", conTentTitleClassName)}>{contentTitle}</span>
          </div>
        )}

        {buttonLabel && buttonLink && !buttonOnHover ? (
          <LinkButton
            buttonText={buttonLabel}
            href={buttonLink}
            linkClassName={linkClassName}
            iconClassName={iconClassName}
            onClick={(e) => {
              const isEmptyLink = !buttonLink || buttonLink === "#" || buttonLink === "";
              if (isEmptyLink) {
                e?.preventDefault();
              }

              if (isProfile && typeof buttonAction === "function") {
                e?.preventDefault();
                buttonAction();
              }
            }}
          />
        ) : null}
      </div>

      {(description || buttonOnHover) && (
        <div ref={overlayRef} className={cn(overlayClasses, overlayClassName)}>
          {buttonLabel && buttonLink && buttonOnHover ? (
            <LinkButton
              buttonText={buttonLabel}
              href={buttonLink}
              linkClassName={linkClassName}
              iconClassName={iconClassName}
              onClick={(e) => {
                const isEmptyLink = !buttonLink || buttonLink === "#" || buttonLink === "";
                if (isEmptyLink) {
                  e?.preventDefault();
                }

                if (isProfile && typeof buttonAction === "function") {
                  e?.preventDefault();
                  buttonAction();
                }
              }}
            />
          ) : null}
          {description && (
            <div className={cn("flex flex-col gap-7", descriptionDivClassName)}>
              {haveBackgroundDescription && (
                <div className="pointer-events-none absolute -top-6 z-0 h-12 w-14 overflow-hidden mix-blend-multiply">
                  <Image alt="hover-background" src={"/bg-7.svg"} fill className="object-contain" />
                </div>
              )}

              <p
                className={cn(
                  "font-sans text-sm font-medium",
                  descriptionMobile && "hidden md:block",
                  descriptionClassName
                )}
              >
                {description}
              </p>
              <p
                className={cn(
                  "font-mono text-sm font-medium",
                  descriptionMobile && "block md:hidden",
                  descriptionClassName
                )}
              >
                {descriptionMobile}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HoverCard;
