"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs defaultValue={theme} onValueChange={setTheme}>
      <TabsList className="bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-full p-1">
        <TabsTrigger
          value="system"
          className={cn(
            "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow"
          )}
        >
          <Laptop className="mr-2 h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="light"
          className={cn(
            "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow"
          )}
        >
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className={cn(
            "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow"
          )}
        >
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
