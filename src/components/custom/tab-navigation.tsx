"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";
import { TabArrowLeftIcon, TabArrowRightIcon } from "../icons";
import LinkButton from "./buttons/link-button";
import DropdownButtonMenus from "./dropdown-button-menus";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  linkHref: string;
  linkButtonText: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, linkHref, linkButtonText }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || "");
  const { width } = useWindowSize();
  const isMobileView = width !== undefined && width <= 768;

  const selectNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    if (currentIndex < tabs.length - 1) {
      setActiveTabId(tabs[currentIndex + 1].id);
    }
  };

  const selectPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    if (currentIndex > 0) {
      setActiveTabId(tabs[currentIndex - 1].id);
    }
  };

  return (
    <Tabs value={activeTabId} onValueChange={setActiveTabId} className="w-full">
      <div className="flex items-center justify-between">
        {isMobileView ? (
          <DropdownButtonMenus
            buttonClassName="rounded-full hover:ring-4 hover:ring-gray-200/10 font-mono font-light py-4"
            options={tabs.map((tab) => tab.label) as any}
            headerContent="Select Tab"
            iconIsBorder
            onOptionSelect={(selectedLabel: any) => {
              const selectedTab = tabs.find((tab) => tab.label === selectedLabel);
              if (selectedTab) {
                setActiveTabId(selectedTab.id);
              }
            }}
          />
        ) : (
          <TabsList className="rounded-3xl">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={selectPreviousTab}
            disabled={activeTabId === tabs[0]?.id}
            className={cn("bg-secondary rounded-full p-1 text-white hover:bg-red-700", {
              "cursor-not-allowed opacity-50": activeTabId === tabs[0]?.id,
            })}
          >
            <TabArrowLeftIcon className="size-8" />
          </button>
          <button
            onClick={selectNextTab}
            disabled={activeTabId === tabs[tabs.length - 1]?.id}
            className={cn("bg-secondary rounded-full p-1 text-white hover:bg-red-700", {
              "cursor-not-allowed opacity-50": activeTabId === tabs[tabs.length - 1]?.id,
            })}
          >
            <TabArrowRightIcon className="size-8" />
          </button>
        </div>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <div className="py-4">{tab.content}</div>
        </TabsContent>
      ))}
      <div className="my-4 flex w-full items-center justify-center">
        <LinkButton href={linkHref} buttonText={linkButtonText} variant="secondary" />
      </div>
    </Tabs>
  );
};

export default TabNavigation;
