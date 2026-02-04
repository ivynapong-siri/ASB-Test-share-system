"use client";

import { FacebookIcon, LineIcon, TwitterIcon } from "@/components/icons";

import AllDetailSharedSection from "./AllDetailSharedSection";
import { NewsJson } from "@/server/serializers/pages/news-serializer";
import { NewsSharedSettingJson } from "@/server/serializers/page-settings";
import SharedModal from "@/components/custom/modals/shared-modal";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AllDetailSharedWrapperProps {
  data: NewsSharedSettingJson;
}

/**
 * Client Component for Share functionality
 * Separated from server component to enable interactive features
 */
export default function AllDetailSharedWrapper({ data }: AllDetailSharedWrapperProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const currentUrl = typeof window !== "undefined" ? window.location.origin + pathname : "";
  const { modalDataSetting, newsBannerSetting } = data;

  
  function onOpen() {
    setModalOpen(true);
  }

  function onClose() {
    setModalOpen(false);
  }

  const socialIcons = (url: string) => ({
    facebook: {
      ariaLabel: "Facebook",
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    line: {
      ariaLabel: "Line",
      icon: <LineIcon />,
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    },
    twitter: {
      ariaLabel: "Twitter",
      icon: <TwitterIcon />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
  });

  return (
    <>
      <AllDetailSharedSection
        buttonLabel={newsBannerSetting.buttonLabel ?? "Share this Post"}
        title={newsBannerSetting.title ?? "Required data in WP"}
        onOpen={() => onOpen()}
      />
      {isModalOpen && (
        <SharedModal
          onClose={() => onClose()}
          socialIcons={socialIcons(currentUrl)}
          currentUrl={currentUrl}
          title={modalDataSetting.title ?? "Share"}
          description={modalDataSetting.description ?? "Required data in WP"}
          copyButtonLabel={modalDataSetting.copyButtonLabel ?? "copy"}
          copyToClipboardLabel={modalDataSetting.copyToClipboardLabel ?? "✅ Copied to clipboard!"}
        />
      )}
    </>
  );
}
