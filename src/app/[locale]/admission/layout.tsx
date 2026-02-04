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

export default async function AdmissionLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const pageSetting = await fetchPageSettings({ locale });
  const admissionNavigation = pageSetting.pageSetting.menuGroups.admission;

  const sharedSectionsData = await fetchSharedSections({ locale });
  const admissionSharedSections = (sharedSectionsData as { [key: string]: any })["admission"] as SharedSectionJson[];

  return (
    <div className="relative">
      <SharedSectionsProvider sharedSection={admissionSharedSections}>
        {children}
        <DirectNavigationLinkButton options={admissionNavigation} />
      </SharedSectionsProvider>
    </div>
  );
}
