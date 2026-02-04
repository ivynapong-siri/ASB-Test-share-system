"use client";

import { startTransition, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";
import { NEXT_LOCALE } from "@/server/constants/configuration";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeSelector } from "../theme/them-selector";

const languages = [
  { label: "English", value: "en" },
  { label: "ไทย", value: "th" },
];

export function PreferencesMenu() {
  const [cookies, _] = useCookies([NEXT_LOCALE]);
  const cookiesLng = cookies[NEXT_LOCALE] as string;
  const router = useRouter();
  const t = useTranslations();
  const [language, setLanguage] = useState(cookiesLng);

  useEffect(() => {
    if (language == cookiesLng) return;
    startTransition(() => {
      setTimeout(() => {
        router.replace("/", { locale: language });
      }, 500);
    });
  }, [language]);

  return (
    <div className="bg-popover w-full space-y-4 rounded-lg p-2">
      <h4 className="text-accent-foreground text-sm font-medium">{t("settings.preferences.title")}</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label className="text-accent-foreground text-sm">{t("settings.preferences.theme")}</label>
          <ThemeSelector />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label className="text-accent-foreground text-sm">{t("settings.preferences.language")}</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 font-normal">
                {languages.find((l) => l.value === language)?.label}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-5} className="w-[130px]">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.value}
                  onSelect={(e) => {
                    setLanguage(language.value);
                  }}
                >
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
