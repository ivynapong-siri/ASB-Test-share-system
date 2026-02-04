import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  id: string;
  title: string;
  link?: string;
  sub?: SubMenuItem[];
}

interface NavbarMenusProps {
  menus: MenuItem[];
  isHovered: boolean;
  isWhite: boolean;
  isVisible: boolean;
}

const NavbarMenus: React.FC<NavbarMenusProps> = ({ menus, isHovered, isWhite, isVisible }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const buttonTextClass = isWhite ? "text-primary" : isHovered && "text-primary";
  const dotClass = isWhite ? "bg-primary" : isHovered && "bg-primary";

  useEffect(() => {
    setOpenIndex(null); // close on route change
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSubMenu = (menu: MenuItem, index: number) => {
    const isOpen = isVisible && openIndex === index;

    return (
      <AnimatePresence>
        {isOpen && (
          <div
            className={cn(
              "bg-primary absolute top-8 z-10 w-56 space-y-1 rounded-2xl p-6 text-white shadow-md",
              index === menus.length - 1 ? "right-0" : "left-0"
            )}
          >
            <div className="mb-6 w-full border-b border-white pb-4">
              <div className="text-xs leading-none text-nowrap text-white">{menu.title}</div>
            </div>
            <ul className="flex flex-col gap-8 text-xs font-normal">
              {menu.sub?.map((sub, subIndex) => {
                return (
                  <li key={subIndex}>
                    <Link
                      href={sub.href}
                      onClick={() => setOpenIndex(null)}
                      target={sub.href.startsWith("https") ? "_blank" : undefined}
                      rel={sub.href.startsWith("https") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "min-w-36 leading-none text-white no-underline transition-colors outline-none select-none hover:underline"
                      )}
                    >
                      <div className="leading-none">{sub.label}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </AnimatePresence>
    );
  };

  const renderMenuItem = (menu: MenuItem, index: number) => {
    const normalizedPathname = pathname.replace(/^\/(th|en|zh-hans|ja|ko)(\/|$)/, "/");
    const isActive = menu.sub && menu.sub.some((sub) => normalizedPathname === sub.href);

    return (
      <li
        key={menu.id}
        className="group/menus relative flex cursor-pointer items-center justify-center text-left"
        onMouseEnter={() => setOpenIndex(index)}
        onMouseLeave={() => setOpenIndex(null)}
      >
        <Button
          variant="ghost"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          className={cn(
            "hover:text-primary relative mt-1 -mb-3 inline-flex items-start gap-1 text-xs font-normal text-white hover:bg-transparent hover:font-medium focus:font-medium",
            buttonTextClass,
            isActive && "font-medium"
          )}
        >
          {menu.title}
          {menu.sub && (
            <ChevronDownIcon
              className={cn(
                "relative top-[1px] ml-1 size-3 transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
            />
          )}
          {/* Navigation dot/indicator */}
          {isActive && (
            <span
              className={cn(
                "absolute bottom-3 left-1/2 inline-block h-1 w-1 rounded-full bg-white transition-all",
                dotClass
              )}
            />
          )}
        </Button>
        {menu.sub && renderSubMenu(menu, index)}
      </li>
    );
  };

  return (
    <div ref={ref}>
      <ul className="flex items-center">{menus.map((menu, index) => renderMenuItem(menu, index))}</ul>
    </div>
  );
};

export default NavbarMenus;
