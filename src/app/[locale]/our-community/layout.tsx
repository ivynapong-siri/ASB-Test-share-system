import { SharedSectionsProvider } from "@/client/contexts/shared-sections-context";
import DirectNavigationLinkButton from "@/components/custom/buttons/direct-navigation-link-button";
import { fetchPageSettings } from "@/server/fetches/page-settings";
import { fetchSharedSections } from "@/server/fetches/shared-sections";
import { SharedSectionJson } from "@/server/serializers/shared-section-serializer";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function CoCurriCularLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const sharedSectionsData = await fetchSharedSections({ locale });
  const ourCommunitySharedSections = (sharedSectionsData as { [key: string]: any })[
    "our-community"
  ] as SharedSectionJson[];

  const pageSetting = await fetchPageSettings({ locale });
  const ourCommunityNavigation = pageSetting.pageSetting.menuGroups.ourCommunity;

  return (
    <div className="relative">
      <SharedSectionsProvider sharedSection={ourCommunitySharedSections}>
        {children}
        <DirectNavigationLinkButton options={ourCommunityNavigation} />
      </SharedSectionsProvider>
    </div>
  );
}
