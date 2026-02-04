import { ChevronDownIcon, ChevronUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ToggleLanguageOption, { Language } from "./toggle-language-option";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { CircleFlag } from "react-circle-flags";
import { Button } from "../ui/button";

type ToggleLanguageProps = {
  isHovered?: boolean;
  isWhite?: boolean;
  className?: string;
};

const languages: Language[] = [
  { code: "us", label: "English (US)", locale: "en" },
  { code: "cn", label: "Chinese", locale: "zh-hans" },
  { code: "th", label: "Thai", locale: "th" },
  { code: "jp", label: "Japan", locale: "ja" },
  { code: "kr", label: "Korean", locale: "ko" },
];

const mapLocaleToFlagCode = (locale: string): string => {
  switch (locale) {
    case "en":
      return "us";
    case "zh-hans":
      return "cn";
    case "ja":
      return "jp";
    case "ko":
      return "kr";
    case "th":
      return "th";
    default:
      return "us";
  }
};

const ToggleLanguage: React.FC<ToggleLanguageProps> = ({ isHovered, isWhite, className }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const [selectedLanguage, setSelectedLanguage] = useState(mapLocaleToFlagCode(locale));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLanguageChange = (langCode: string, newLocale: string) => {
    setSelectedLanguage(langCode);
    setIsPopoverOpen(false);

    const segments = pathName.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
    } else {
      segments.push(newLocale);
    }

    const newPath = segments.join("/") || "/";
    router.push(newPath);
    router.refresh();
  };

  useEffect(() => {
    const currentFlagCode = mapLocaleToFlagCode(locale);
    setSelectedLanguage(currentFlagCode);
    const pathSegments = pathName.split("/");
    const currentPathLocale = pathSegments[1];
    if (currentPathLocale && currentPathLocale !== locale) {
      setSelectedLanguage(mapLocaleToFlagCode(currentPathLocale));
    }
  }, [locale, pathName]);

  const buttonClassNames = cn(
    "group hover:bg-primary gap-1 text-xs uppercase transition duration-300 hover:text-white has-[>svg]:px-1",
    isWhite ? "text-primary border-gray-300 bg-white" : isHovered && "text-primary border-gray-300 bg-white",
    className
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={buttonClassNames}>
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full sm:h-6 sm:w-6">
            <CircleFlag countryCode={selectedLanguage} className="h-full w-full object-cover" />
          </div>
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="flex w-fit flex-col gap-2 rounded-3xl bg-white px-2 py-4 shadow-lg"
        sideOffset={-40}
        alignOffset={-80}
        align="start"
      >
        <div className="flex items-center justify-between gap-4 px-2">
          <div className="text-primary font-mono text-xs font-medium">Select Language</div>
          <ChevronUp className="text-primary h-4 w-4" />
        </div>
        {languages.map((language) => (
          <ToggleLanguageOption
            key={language.code}
            lang={language}
            selectedLanguage={selectedLanguage}
            handleLanguageChange={() => handleLanguageChange(language.code, language.locale)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ToggleLanguage;
