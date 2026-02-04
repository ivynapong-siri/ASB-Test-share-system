import { ButtonWithIcons } from "./button-with-icon";
import Link from "next/link";
import React from "react";
import { SendIcon } from "@/components/icons";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../../ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href?: string;
  buttonText: string;
  linkClassName?: string;
  iconClassName?: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  showIcon?: boolean;
  linkButtonVariant?: "primary" | "secondary";
  target?: string;
}

const LinkButton: React.FC<LinkButtonProps & VariantProps<typeof buttonVariants>> = ({
  href,
  buttonText,
  linkClassName,
  iconClassName,
  onClick,
  className,
  variant = "default",
  showIcon = true,
  linkButtonVariant = "primary",
  target,
  ...propsButton
}) => {
  const isExternalDownload = href?.endsWith(".jpg") || href?.endsWith(".pdf") || href?.includes("download");

  const handleDownload = async (href: string) => {
    const response = await fetch(href);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = href.split("/").pop() || "downloaded-file";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isExternalDownload && href) {
    return (
      <button
        type="button"
        className={className}
        onClick={async (e) => {
          e.preventDefault();
          window.open(href, "_blank");
          await handleDownload(href);
          onClick?.(e);
        }}
      >
        <ButtonWithIcons
          className={cn(
            "w-fit font-mono text-sm font-medium tracking-widest uppercase",
            linkClassName,
            linkButtonVariant == "secondary" && "text-primary bg-white hover:text-white"
          )}
          variant={variant}
          endIcon={SendIcon}
          iconClass={cn(
            "size-9 transform rounded-full border border-dashed border-white p-[10px] transition-all group-hover/button:rotate-45",
            iconClassName,
            linkButtonVariant == "secondary" &&
              "text-secondary border-primary group-hover/button:border-white group-hover/button:text-white"
          )}
          showIcon={showIcon}
          {...propsButton}
        >
          {buttonText}
        </ButtonWithIcons>
      </button>
    );
  }

  return (
    <Link
      href={href || "#"}
      aria-disabled={!href}
      passHref
      className={className}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      <ButtonWithIcons
        className={cn(
          "w-fit font-mono text-sm font-medium tracking-widest uppercase",
          linkClassName,
          linkButtonVariant == "secondary" && "text-primary bg-white hover:text-white"
        )}
        variant={variant}
        onClick={onClick}
        endIcon={SendIcon}
        iconClass={cn(
          "size-9 transform rounded-full border border-dashed border-white p-2 transition-all group-hover/button:rotate-45",
          iconClassName,
          linkButtonVariant == "secondary" &&
            "text-secondary border-primary group-hover/button:border-white group-hover/button:text-white"
        )}
        showIcon={showIcon}
        {...propsButton}
      >
        {buttonText}
      </ButtonWithIcons>
    </Link>
  );
};

export default LinkButton;
