import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

export interface Language {
  code: string;
  label: string;
  locale: string;
}

interface ToggleLanguageOptionProps {
  lang: Language;
  selectedLanguage: string;
  handleLanguageChange: () => void;
}

const ToggleLanguageOption = ({ lang, selectedLanguage, handleLanguageChange }: ToggleLanguageOptionProps) => (
  <Button
    key={lang.code}
    variant="ghost"
    className="group hover:bg-primary justify-start px-2 hover:text-white"
    onClick={handleLanguageChange}
  >
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full sm:h-6 sm:w-6">
          <CircleFlag countryCode={lang.code} className="h-full w-full object-cover" />
        </div>
        <span className="text-xs uppercase">{lang.label}</span>
      </div>
      {selectedLanguage === lang.code && <CheckIcon className="text-primary h-4 w-4 group-hover:text-white" />}
    </div>
  </Button>
);

export default ToggleLanguageOption;
