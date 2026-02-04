"use client";

import { SharedSectionJson } from "@/server/serializers/shared-section-serializer";
import { createContext, ReactNode, useContext } from "react";

interface SharedSectionsContextValue {
  sharedSection: SharedSectionJson[] | undefined;
}

const SharedSectionsContext = createContext<SharedSectionsContextValue | undefined>(undefined);

export const SharedSectionsProvider = ({
  children,
  sharedSection,
}: {
  children: ReactNode;
  sharedSection?: SharedSectionJson[];
}) => {
  return <SharedSectionsContext.Provider value={{ sharedSection }}>{children}</SharedSectionsContext.Provider>;
};

export const useSharedSections = () => {
  const context = useContext(SharedSectionsContext);
  if (!context) throw new Error("useSharedSections must be used within a SharedSectionsProvider");
  return context.sharedSection;
};
