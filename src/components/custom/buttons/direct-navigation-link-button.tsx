"use client";

import { MenuGroupJson, MenuItemJson } from "@/server/serializers/page-settings";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import DropdownButtonMenusLink from "../dropdown-button-menus-link";

interface DirectNavigationLinkButtonProps {
  options: MenuGroupJson;
}

const DirectNavigationLinkButton: React.FC<DirectNavigationLinkButtonProps> = ({ options }) => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const filteredSegments = pathSegments.length > 1 ? pathSegments.slice(1) : pathSegments;
  const currentPage = filteredSegments[filteredSegments.length - 1];

  const hideNavigateButton = pathname?.includes("/detail/");

  const [selected, setSelected] = useState<MenuItemJson | null>(null);

  useEffect(() => {
    if (!options?.menus?.length) return;

    const matchedOption = options.menus.find((menu) => {
      const menuSegments = menu.url.split("/").filter(Boolean);
      const lastSegment = menuSegments.at(-1);
      return lastSegment === currentPage;
    });

    setSelected(matchedOption || null);
  }, [pathname, options]);

  return hideNavigateButton ? null : (
    <div className="relative">
      <div className="fixed bottom-2 left-0 z-40 w-fit xl:bottom-10 xl:left-10">
        <DropdownButtonMenusLink
          headerContent={options.title || "Select Option"}
          options={options.menus ?? []}
          buttonClassName="h-16 z-10 font-sans xl:max-w-fit"
          selected={selected}
        />
      </div>
    </div>
  );
};

export default DirectNavigationLinkButton;
