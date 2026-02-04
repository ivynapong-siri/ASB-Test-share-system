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

export default async function CurriculumLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const sharedSectionsData = await fetchSharedSections({ locale });
  const curriculumSharedSections = (sharedSectionsData as { [key: string]: any })[
    "academics-and-curriculum"
  ] as SharedSectionJson[];

  const pageSetting = await fetchPageSettings({ locale });
  const curriculumNavigation = pageSetting.pageSetting.menuGroups.academics;

  return (
    <div className="relative">
      <SharedSectionsProvider sharedSection={curriculumSharedSections}>
        {children}
        <DirectNavigationLinkButton options={curriculumNavigation} />
      </SharedSectionsProvider>
    </div>
  );
}
