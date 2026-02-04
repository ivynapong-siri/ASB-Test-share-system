import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { AltArrowDown, CalendarNavbarIcon, NavbarMobileToggleIcon } from "../icons";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonWithIcons } from "../custom/buttons/button-with-icon";
import LinkButton from "../custom/buttons/link-button";
import UniversalSearch from "../custom/universal-search";
import ToggleLanguage from "../language/toggle-language";
import { Button } from "../ui/button";

type NavbarMobileProps = {
  isWhite: boolean;
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
  showLightStyle: boolean;
  isScrolling: boolean;
};

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  menus,
  isWhite,
  applyNowUrl,
  bookATourLabel,
  bookATourUrl,
  calendarLabel,
  calendarUrl,
  contractUsLabel,
  contractUsUrl,
  applyNowLabel,
  boardingLabel,
  boardingUrl,
  showLightStyle,
  isScrolling,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width >= 1024) {
      setIsSheetOpen(false);
      setActiveMenu(null);
    }
  }, [width]);

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const renderMenuItems = () =>
    menus.map((menu) => (
      <AccordionItem
        value={menu.id}
        key={menu.id}
        className={cn("border-b-1 border-white/20 py-2", activeMenu && activeMenu !== menu.id && "border-0")}
      >
        <AccordionTrigger
          className={cn("py-2 text-sm leading-6 hover:no-underline", activeMenu && activeMenu !== menu.id && "hidden")}
          Icon={
            <AltArrowDown
              className="h-8 w-8 shrink-0 rounded-full border border-dashed border-white p-2 text-white transition-transform duration-200"
              fill="#ffffff"
            />
          }
        >
          <span className="flex items-center gap-3">
            <span className="font-normal text-white">{menu.title}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="mt-7 flex flex-col ps-7 text-white transition">
          {menu.sub.map((subMenu) => (
            <Link
              key={subMenu.id || subMenu.label}
              href={subMenu.href}
              className="block py-6 hover:underline"
              onClick={() => setIsSheetOpen(false)}
            >
              {subMenu.label}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    ));

  const renderFooter = () => (
    <div className={cn("flex flex-col items-center justify-center gap-10", activeMenu && "hidden")}>
      <div className="flex flex-row gap-4 font-mono text-sm text-white">
        <Link href={boardingUrl} onClick={() => setIsSheetOpen(false)}>
          {boardingLabel}
        </Link>
        <div className="h-4 w-[0.5px] bg-gray-400 transition duration-300" />
        <Link href={bookATourUrl} onClick={() => setIsSheetOpen(false)}>
          {bookATourLabel}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <LinkButton
          buttonText={contractUsLabel}
          href={contractUsUrl}
          variant="outline"
          size="default"
          linkClassName="hover:bg-secondary text-xs uppercase transition duration-300 hover:text-white py-2 px-6 w-full"
          iconClassName="size-5 p-1 duration-100"
          onClick={() => setIsSheetOpen(false)}
        />
        <LinkButton
          linkClassName="group transition duration-300 uppercase text-primary hover:text-white bg-white text-xs py-2 px-6 w-full"
          buttonText={applyNowLabel}
          href={applyNowUrl}
          size="default"
          iconClassName="size-5 p-1 duration-100 border-primary text-secondary group-hover:text-white group-hover:border-white"
          onClick={() => setIsSheetOpen(false)}
        />
      </div>
    </div>
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={cn(
            "text-primary h-full !rounded-xl !p-2 hover:text-white xl:hidden",
            !showLightStyle || !isScrolling ? "bg-white" : "bg-primary",
            isWhite && "bg-primary text-white"
          )}
        >
          <NavbarMobileToggleIcon
            className="size-6"
            color={cn(!isScrolling && !isWhite ? "#072445" : isWhite || showLightStyle ? "#FFFFFF" : "#072445")}
            strokeWidth={1}
          />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-full overflow-y-scroll bg-[#0E2C59] px-8 py-4 pb-14" hideCloseButton>
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <div className="flex items-center justify-between">
          <Link href="/home" prefetch={false}>
            <div className="relative h-16 w-24">
              <Image alt="main-logo" src="/main-logo.svg" fill className="object-contain transition duration-300" />
            </div>
          </Link>
          <SheetClose className="text-primary hover:bg-secondary ring-primary top-5 right-5 rounded-lg bg-white p-2 font-semibold transition-colors hover:text-white">
            <X className="size-6" strokeWidth={1} />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-full max-w-3/5">
            <UniversalSearch
              showTextSearch
              onCloseSheet={() => setIsSheetOpen(false)}
              buttonClassName="hover:text-white tracking-widest w-full hover:bg-secondary bg-linear-to-t from-white/10 to-[#999999]/10 border-1 border-white/20 py-5 " //bg-linear-to-t from-white to-[#999999]
            />
          </div>
          <Link href={calendarUrl} onClick={() => setIsSheetOpen(false)} className="w-full max-w-2/5">
            <ButtonWithIcons
              startIcon={CalendarNavbarIcon}
              variant="outline"
              className="hover:bg-secondary w-full border-1 border-white/20 bg-linear-to-t from-white/10 to-[#999999]/10 px-6 py-5 text-xs tracking-widest uppercase transition duration-300 hover:text-white"
              size="sm"
              showIcon
              iconClass="size-6"
            >
              {calendarLabel}
            </ButtonWithIcons>
          </Link>

          <ToggleLanguage className="border-1 border-white/20 py-5" />
        </div>
        <div className="max-w-full space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full font-mono"
            value={activeMenu ?? undefined}
            onValueChange={toggleMenu}
          >
            {renderMenuItems()}
          </Accordion>
        </div>
        <div className="flex h-full flex-col justify-end">{renderFooter()}</div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
