"use client";

import * as React from "react";

import { useTranslations } from "next-intl";

import { LayoutDashboard, Settings2, UserIcon } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import ImagePlaceholder from "../custom/image-placeholder";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const t = useTranslations();
  const data = {
    mainNav: [
      {
        key: "dashboardMenu",
        items: [
          {
            title: t("appSidebar.dashboard"),
            url: "/admin/dashboard",
            key: "dashboard",
            icon: LayoutDashboard,
            items: [],
          },
        ],
      },
      {
        groupLabel: t("appSidebar.superAdminMenu"),
        key: "superAdminMenu",
        items: [
          {
            title: t("appSidebar.users"),
            url: "/admin/users",
            key: "users",
            icon: UserIcon,
            items: [],
          },
          {
            title: t("appSidebar.settings.title"),
            url: "#",
            key: "Settings",
            icon: Settings2,
            items: [
              {
                title: t("appSidebar.settings.general"),
                key: "general",
                url: "#",
              },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ImagePlaceholder
          className={cn(open ? "visible px-2" : "hidden", "bg-muted/50 h-16 w-60")}
          textClassName="font-bold text-xl"
          text="Logo"
          isShowIcon={false}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain sidebarItems={data.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
