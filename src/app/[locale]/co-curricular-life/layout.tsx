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

  const pageSetting = await fetchPageSettings({ locale });
  const coCurricularLifeNavigation = pageSetting.pageSetting.menuGroups.coCurricularLife;

  const sharedSectionsData = await fetchSharedSections({ locale });
  const coCurricularSharedSections = (sharedSectionsData as { [key: string]: any })[
    "co-curricular-life"
  ] as SharedSectionJson[];

  return (
    <div className="relative">
      <SharedSectionsProvider sharedSection={coCurricularSharedSections}>
        {children}
        <DirectNavigationLinkButton options={coCurricularLifeNavigation} />
      </SharedSectionsProvider>
    </div>
  );
}
