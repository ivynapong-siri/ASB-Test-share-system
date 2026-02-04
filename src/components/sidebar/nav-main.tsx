"use client";

import React from "react";

import { Link, usePathname } from "@/i18n/routing";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export function NavMain({
  sidebarItems,
}: {
  sidebarItems: {
    groupLabel?: string | undefined;
    key?: string | undefined;
    items: {
      title: string;
      url: string;
      key: string;
      icon?: LucideIcon;
      items: {
        key: string;
        title: string;
        url: string;
      }[];
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {sidebarItems.map((sidebarItem, index) => {
        return (
          <React.Fragment key={index}>
            {sidebarItem.groupLabel && (
              <SidebarGroupLabel key={sidebarItem.key}>{sidebarItem.groupLabel}</SidebarGroupLabel>
            )}
            <SidebarMenu>
              {sidebarItem.items.map((item) => {
                return item.items?.length == 0 ? (
                  <Link key={item.key} href={item.url}>
                    <SidebarMenuButton className="cursor-pointer" tooltip={item.title}>
                      {item.icon && <item.icon className={cn(pathname.startsWith(item.url) && "stroke-2")} />}
                      <span className={cn(pathname.startsWith(item.url) && "font-semibold")}>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                ) : (
                  <Collapsible
                    key={item.key}
                    asChild
                    defaultOpen={item.items?.some((subItem) => pathname.includes(subItem.url))}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                          {item.icon && (
                            <item.icon
                              className={cn(
                                item.items?.some((subItem) => pathname.includes(subItem.url)) && "stroke-2"
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              item.items?.some((subItem) => pathname.includes(subItem.url)) && "font-semibold"
                            )}
                          >
                            {item.title}
                          </span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <Link key={subItem.key} href={subItem.url}>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <span className={cn(pathname.startsWith(subItem.url) && "font-semibold")}>
                                    {subItem.title}
                                  </span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </Link>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </React.Fragment>
        );
      })}
    </SidebarGroup>
  );
}
