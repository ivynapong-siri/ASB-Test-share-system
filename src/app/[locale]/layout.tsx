import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons";

import { transformMenuGroupsToSidebarData } from "@/client/utils/helper";
import { Announcement } from "@/components/custom/announcement";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { generateSEOMetadata } from "@/lib/seo";
import { fetchAnnouncement } from "@/server/fetches/announcement";
import { fetchLandingList } from "@/server/fetches/custom-landing";
import { fetchPageSettings } from "@/server/fetches/page-settings";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return await generateSEOMetadata({ locale });
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootWebsiteLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const [announcementData, pageSettings, customLandingList] = await Promise.all([
    fetchAnnouncement({ locale }),
    fetchPageSettings({ locale }),
    fetchLandingList({ locale }),
  ]);

  const sidebarMenus = transformMenuGroupsToSidebarData(pageSettings.pageSetting.menuGroups, {
    customLanding: pageSettings.pageSetting?.customLanding,
    customLandingList,
  });

  const boardingLabel = pageSettings.pageSetting.headerSetting.boardingButton.buttonLabel ?? "";
  const boardingUrl = pageSettings.pageSetting.headerSetting.boardingButton.buttonUrl ?? "";
  const applyNowUrl = pageSettings.pageSetting.headerSetting.applyNowButton.buttonUrl ?? "";
  const applyNowLabel = pageSettings.pageSetting.headerSetting.applyNowButton.buttonLabel;
  const calendarUrl = pageSettings.pageSetting.headerSetting.calendarButton.buttonUrl ?? "";
  const calendarLabel = pageSettings.pageSetting.headerSetting.calendarButton.buttonLabel ?? "";
  const contractUsUrl = pageSettings.pageSetting.headerSetting.contactUsButton.buttonUrl ?? "";
  const contractUsLabel = pageSettings.pageSetting.headerSetting.contactUsButton.buttonLabel ?? "";
  const bookATourUrl = pageSettings.pageSetting.headerSetting.bookATourButton.buttonUrl ?? "";
  const bookATourLabel = pageSettings.pageSetting.headerSetting.bookATourButton.buttonLabel ?? "";

  const socialIcons = {
    facebookUrl: { ariaLabel: "Facebook", icon: <FacebookIcon /> },
    instagramUrl: { ariaLabel: "Instagram", icon: <InstagramIcon /> },
    youtubeUrl: { ariaLabel: "YouTube", icon: <YoutubeIcon /> },
  };
  const socialLinks = Object.entries(pageSettings.pageSetting.footerSetting.socialNetwork).map(([key, url]) => {
    const iconInfo = socialIcons[key as keyof typeof socialIcons];
    return {
      href: url,
      ariaLabel: iconInfo.ariaLabel,
      icon: iconInfo.icon,
    };
  });

  const mainNavGroup = sidebarMenus.slice(-1)[0];
  const filteredMainNavigationMenus = mainNavGroup.sub.filter((menu) => {
    return !menu.href?.includes("/landing/");
  });

  const footerProps = {
    menus: sidebarMenus.slice(0, -1),
    mainNavigationMenus: filteredMainNavigationMenus,
    socialLinks,
    contactSetting: pageSettings.pageSetting.footerSetting.contactSetting,
  };

  const isLoading = (children as any)?.props?.className?.includes?.("suppress-layout");

  return (
    <div className="relative">
      {!isLoading && (
        <Navbar
          menus={sidebarMenus}
          applyNowUrl={applyNowUrl}
          bookATourLabel={bookATourLabel}
          bookATourUrl={bookATourUrl}
          calendarUrl={calendarUrl}
          contractUsLabel={contractUsLabel}
          contractUsUrl={contractUsUrl}
          calendarLabel={calendarLabel}
          applyNowLabel={applyNowLabel}
          boardingLabel={boardingLabel}
          boardingUrl={boardingUrl}
        />
      )}
      {!isLoading && <Announcement announcementData={announcementData} />}
      <div className="z-0 -mt-60 flex-1 overflow-y-auto overscroll-x-none">{children}</div>
      {!isLoading && <Footer {...footerProps} />}
    </div>
  );
}
