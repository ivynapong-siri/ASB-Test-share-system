"use client";

import { useEffect, useState } from "react";

import { useNavbarContext } from "@/client/contexts/navbar-context";
import { useIsLaptop } from "@/hooks/use-laptops";
import { useIsMobile } from "@/hooks/use-mobile";
import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { useThrottledCallback } from "use-debounce";
import { ButtonWithIcons } from "../custom/buttons/button-with-icon";
import LinkButton from "../custom/buttons/link-button";
import UniversalSearch from "../custom/universal-search";
import ToggleLanguage from "../language/toggle-language";
import { Button } from "../ui/button";
import NavbarMenus from "./navbar-menus";
import NavbarMobile from "./navbar-mobile";

const HoverEffects = ({ isHovered, isLightStyle }: { isHovered: boolean; isLightStyle: boolean }) => {
  const shouldShow = !isLightStyle && isHovered;
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out",
        isLightStyle ? "opacity-0" : shouldShow ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 origin-top skew-x-[25deg] transform rounded-bl-[15px] border-[5px] border-r-0 border-white bg-white max-xl:hidden" />
      <div className="absolute top-0 right-0 bottom-0 w-1/2 origin-top -skew-x-[25deg] transform rounded-br-[15px] border-[5px] border-l-0 border-white bg-white max-xl:hidden" />
      <div className="absolute top-0 right-10 z-1 hidden h-[54px] w-2/3 skew-x-[25deg] transform rounded-bl-xl border-b border-l border-gray-200 bg-transparent xl:inline-block xl:w-3/5 2xl:w-4/6" />
    </div>
  );
};

const Divider = ({ showLightStyle }: { showLightStyle: boolean }) => (
  <div className={cn("h-4 w-[0.5px] transition duration-300", showLightStyle ? "bg-gray-400" : "bg-white")} />
);

const ContactButton = ({
  showLightStyle,
  contractUsLabel,
  contractUsUrl,
}: {
  showLightStyle: boolean;
  contractUsUrl: string;
  contractUsLabel: string;
}) => (
  <Link href={contractUsUrl || "#"}>
    <Button
      variant="outline"
      className={cn(
        "hover:bg-primary text-xs uppercase transition duration-300 hover:text-white",
        showLightStyle ? "text-primary border-primary bg-white" : "border-white text-white"
      )}
      size="sm"
    >
      {contractUsLabel}
    </Button>
  </Link>
);

const ApplyNowButton = ({
  applyNowLabel,
  applyNowUrl,
  showLightStyle,
}: {
  applyNowUrl: string;
  showLightStyle: boolean;
  applyNowLabel: string;
}) => (
  <LinkButton
    href={applyNowUrl}
    buttonText={applyNowLabel}
    size="sm"
    linkClassName={cn(
      "h-8 py-2 text-xs uppercase transition duration-300",
      showLightStyle ? "bg-primary text-white" : "text-primary bg-white"
    )}
    iconClassName={cn(
      "size-5 p-1 duration-100",
      showLightStyle ? "border-white text-white" : "border-primary text-red-500"
    )}
  />
);

const CalendarButton = ({
  showLightStyle,
  calendarUrl,
  calendarLabel,
}: {
  showLightStyle: boolean;
  calendarUrl: string;
  calendarLabel: string;
}) => (
  <Link href={calendarUrl || "#"}>
    <ButtonWithIcons
      startIcon={CalendarDays}
      variant="outline"
      showIcon
      size="sm"
      className={cn(
        "hover:bg-primary h-8 py-2 text-xs uppercase transition duration-300 hover:text-white",
        showLightStyle ? "text-primary border-gray-300 bg-white" : "border-white text-white"
      )}
    >
      {calendarLabel}
    </ButtonWithIcons>
  </Link>
);

const DesktopMenu = ({
  isHovered,
  isLightStyle,
  isMobileMenuOpen,
  menus,
  isVisible,
  applyNowUrl,
  bookATourLabel,
  bookATourUrl,
  calendarUrl,
  contractUsLabel,
  contractUsUrl,
  calendarLabel,
  applyNowLabel,
  boardingLabel,
  boardingUrl,
}: {
  isHovered: boolean;
  isLightStyle: boolean;
  isMobileMenuOpen: boolean;
  isVisible: boolean;
  menus: { id: string; title: string; sub: { id?: string; label: string; href: string }[] }[];
  applyNowUrl: string;
  calendarUrl: string;
  contractUsUrl: string;
  bookATourUrl: string;
  bookATourLabel: string;
  contractUsLabel: string;
  calendarLabel: string;
  applyNowLabel: string;
  boardingLabel: string;
  boardingUrl: string;
}) => {
  const showLightStyle = isLightStyle || isHovered;
  return (
    <div
      className={cn(
        "flex-col items-end gap-2 text-xs transition duration-300 xl:flex",
        showLightStyle ? "text-gray-800" : "text-white",
        isMobileMenuOpen ? "flex" : "hidden"
      )}
    >
      <div className="z-2 flex items-center gap-4">
        <Link href={bookATourUrl || "#"}>
          <span className="cursor-default hover:cursor-pointer">{bookATourLabel ?? "No data yet"}</span>
        </Link>
        <Divider showLightStyle={showLightStyle} />
        <Link href={boardingUrl || "#"}>
          <span className="cursor-default hover:cursor-pointer">{boardingLabel ?? "No data yet"}</span>
        </Link>
        <Divider showLightStyle={showLightStyle} />
        <div className="flex gap-2">
          <ContactButton
            showLightStyle={showLightStyle}
            contractUsLabel={contractUsLabel}
            contractUsUrl={contractUsUrl}
          />

          <ApplyNowButton applyNowLabel={applyNowLabel} applyNowUrl={applyNowUrl} showLightStyle={showLightStyle} />
        </div>
        <Divider showLightStyle={showLightStyle} />
        <div className="flex items-center gap-2">
          <UniversalSearch isWhite={isLightStyle} isHovered={isHovered} />
          <CalendarButton showLightStyle={showLightStyle} calendarLabel={calendarLabel} calendarUrl={calendarUrl} />
          <ToggleLanguage isHovered={isHovered} isWhite={isLightStyle} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <NavbarMenus menus={menus} isHovered={isHovered} isWhite={isLightStyle} isVisible={isVisible} />
      </div>
    </div>
  );
};

interface NavbarProps {
  menus: { id: string; title: string; sub: { id?: string; label: string; href: string }[] }[];
  applyNowUrl: string;
  calendarUrl: string;
  contractUsUrl: string;
  bookATourUrl: string;
  bookATourLabel: string;
  contractUsLabel: string;
  calendarLabel: string;
  applyNowLabel: string;
  boardingLabel: string;
  boardingUrl: string;
}

const Navbar = ({
  menus,
  applyNowUrl,
  bookATourLabel,
  bookATourUrl,
  calendarUrl,
  contractUsLabel,
  contractUsUrl,
  calendarLabel,
  applyNowLabel,
  boardingLabel,
  boardingUrl,
}: NavbarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { width } = useWindowSize();
  const { isWhite } = useNavbarContext();
  const isLaptop = useIsLaptop();
  const isMobile = useIsMobile();
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      const isSafariBrowser = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
      setIsSafari(isSafariBrowser);
    }
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  const showLightStyle = isLaptop ? (isScrolling ? !isVisible || isWhite : isScrolling) : isWhite || isHovered;

  const onScrollThrottled = useThrottledCallback(() => {
    setIsScrolling(true);
    const timeout = setTimeout(() => setIsScrolling(false), 3000);
    return () => clearTimeout(timeout);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", onScrollThrottled);
    return () => window.removeEventListener("scroll", onScrollThrottled);
  }, [onScrollThrottled]);

  useEffect(() => {
    if (width && width < 1280) {
      setIsHovered(false);
      setIsMobileMenuOpen(false);
    }
  }, [width]);

  const handleScroll = useThrottledCallback(() => {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY;
    const lastScrollY = window.scrollY;

    // Use requestAnimationFrame for smooth scroll-based updates
    requestAnimationFrame(() => {
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY === 0);
      setIsHovered(currentScrollY > 0);
    });
  }, 100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleMouseEnter = () => width && width >= 1280 && setIsHovered(true);
  const handleMouseLeave = () => width && width >= 1280 && setIsHovered(false);

  const mainLogoClassName = "transition-all duration-500 ease-in-out object-contain";

  const mainClassName = isSafari ? "mr-5 sm:mx-5" : "mx-5";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 pb-8 font-mono transition-all duration-300 max-xl:min-h-[95px] max-xl:rounded-b-[0.75rem] max-xl:pb-1",
        isVisible ? "xl:translate-y-0" : "xl:-translate-y-full",
        isWhite
          ? isVisible || !isScrolling
            ? "bg-white bg-gradient-to-b from-white via-white/80 to-transparent"
            : "max-xl:bg-white"
          : isVisible || !isScrolling
            ? "from-primary bg-gradient-to-b"
            : "max-xl:bg-white"
      )}
    >
      <div
        className={cn("group relative", mainClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full">
          <div
            className={cn(
              "transition-all duration-500 ease-in-out",
              isWhite ? "opacity-100" : isHovered ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="absolute top-0 right-0 z-1 hidden h-[54px] skew-x-[25deg] transform rounded-bl-xl border-b border-l border-gray-200 bg-transparent xl:inline-block xl:w-4/5 2xl:w-4/6" />
          </div>
          <HoverEffects isHovered={isHovered} isLightStyle={isWhite} />

          <nav className="relative flex w-full items-center justify-center xl:container xl:mx-auto xl:px-10">
            <div className="flex w-full items-center justify-between py-5 md:-mt-1 md:pt-1 md:pb-2 xl:px-4">
              <Link href="/home">
                {showLightStyle || isWhite ? (
                  <div
                    className={cn("relative md:h-24 md:w-32", isSafari ? "h-[92px] w-[150px]" : "h-[54px] w-[108px]")}
                  >
                    <img
                      alt="main-logo"
                      src={isMobile && isSafari ? "/secondary-logo-mobile.png" : "/secondary-logo.svg"}
                      className="h-full w-full object-contain max-sm:object-left"
                      style={{
                        imageRendering: "crisp-edges",
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={cn("relative md:h-24 md:w-32", isSafari ? "h-[92px] w-[150px]" : "h-[54px] w-[108px]")}
                  >
                    <img
                      alt="main-logo"
                      src={isMobile && isSafari ? "/main-logo-mobile.png" : "/main-logo.svg"}
                      className="h-full w-full object-contain max-sm:object-left"
                      style={{
                        imageRendering: "crisp-edges",
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                      }}
                    />
                  </div>
                )}
              </Link>
              <div className="block xl:hidden">
                <NavbarMobile
                  menus={menus}
                  isWhite={isWhite}
                  applyNowUrl={applyNowUrl}
                  bookATourLabel={bookATourLabel}
                  bookATourUrl={bookATourUrl}
                  calendarUrl={calendarUrl}
                  contractUsLabel={contractUsLabel}
                  contractUsUrl={contractUsUrl}
                  calendarLabel={calendarLabel}
                  applyNowLabel={applyNowLabel}
                  boardingLabel={boardingLabel}
                  boardingUrl={boardingUrl}
                  showLightStyle={showLightStyle}
                  isScrolling={isScrolling}
                />
              </div>
              <DesktopMenu
                isHovered={isHovered}
                menus={menus}
                isMobileMenuOpen={isMobileMenuOpen}
                isLightStyle={isWhite}
                isVisible={isVisible}
                applyNowUrl={applyNowUrl}
                bookATourLabel={bookATourLabel}
                bookATourUrl={bookATourUrl}
                calendarUrl={calendarUrl}
                contractUsLabel={contractUsLabel}
                contractUsUrl={contractUsUrl}
                calendarLabel={calendarLabel}
                applyNowLabel={applyNowLabel}
                boardingLabel={boardingLabel}
                boardingUrl={boardingUrl}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
