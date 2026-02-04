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

export default async function AboutUsLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const pageSetting = await fetchPageSettings({ locale });
  const aboutUsNavigation = pageSetting.pageSetting.menuGroups.aboutUs;

  const sharedSectionsData = await fetchSharedSections({ locale });
  const aboutUsSharedSections = (sharedSectionsData as { [key: string]: any })["about-us"] as SharedSectionJson[];

  return (
    <div className="relative">
      <SharedSectionsProvider sharedSection={aboutUsSharedSections}>
        {children}
        <DirectNavigationLinkButton options={aboutUsNavigation} />
      </SharedSectionsProvider>
    </div>
  );
}
