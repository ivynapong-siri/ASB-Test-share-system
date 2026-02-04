"use client";

import { JSX, useState } from "react";

import { PatternStroke1 } from "@/components/shapes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Link from "next/link";

interface SharedModalProps {
  className?: string;
  onClose: () => void;
  currentUrl: string;
  socialIcons: {
    [key: string]: {
      ariaLabel: string;
      icon: JSX.Element;
      href: string;
    };
  };
  title: string;
  description: string;
  copyButtonLabel: string;
  copyToClipboardLabel: string;
}

const SharedModal = ({
  copyButtonLabel,
  className,
  onClose,
  socialIcons,
  currentUrl,
  description,
  title,
  copyToClipboardLabel,
}: SharedModalProps) => {
  const [toast, setToast] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback for HTTP / unsupported browsers
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.style.position = "fixed"; // avoid scrolling to bottom
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className={cn("fixed top-1/2 left-1/2 z-99 w-fit -translate-x-1/2 -translate-y-1/2", className)}>
        <div className="relative flex w-full max-w-[calc(100vw-2.25rem)] flex-col overflow-hidden rounded-[30px] bg-white py-9 pt-4 pr-4 pl-7.5 max-lg:mx-9 lg:max-w-[590px]">
          <div
            onClick={onClose}
            className="bg-primary z-10 ml-auto flex size-10 items-center justify-center rounded-full p-2 hover:cursor-pointer"
          >
            <XIcon className="size-8 text-white" />
          </div>

          <PatternStroke1 className="absolute top-16 -right-24 h-[84px] w-[166px] lg:top-12 lg:-right-[220px] lg:h-[149px] lg:w-[333px]" />

          <div className="flex w-full flex-col pr-6.5">
            <h4>{title}</h4>
            <p className="pt-4 font-mono text-base/[1.25rem]">{description}</p>

            <div className="flex flex-row gap-3 pt-6">
              {Object.values(socialIcons).map((social, index) => {
                const { icon, ariaLabel, href } = social;

                return (
                  <Link
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    className="text-muted-foreground hover:text-primary block"
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between rounded-xl border-[2px] border-[#1C1C1C1A] p-4 lg:flex-row">
              <p className="text-primary-400 overflow-hidden text-base/[1.625rem] opacity-40 max-lg:line-clamp-1 lg:truncate lg:pr-3 lg:whitespace-nowrap">
                {currentUrl}
              </p>
              <Button
                className="w-full font-mono text-base font-medium uppercase max-lg:mt-3 lg:max-w-[140px]"
                onClick={handleCopy}
              >
                {copyButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 z-50 h-full w-full bg-black/80" />
      {toast && (
        <div className="animate-fade-in-out text-primary fixed top-4 right-1/2 z-50 translate-x-1/2 rounded-2xl bg-white px-6 py-2 text-lg font-semibold shadow-lg">
          {copyToClipboardLabel}
        </div>
      )}
    </>
  );
};

export default SharedModal;
