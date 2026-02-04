import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface GoogleMapsContextValue {
  googleApiKey: string | undefined;
  isLoadingGoogleMaps: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextValue | undefined>(undefined);

export const GoogleMapsProvider = ({
  children,
  googleApiKeyENV,
}: {
  children: ReactNode;
  googleApiKeyENV?: string;
}) => {
  const [googleApiKey, setGoogleApiKey] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (googleApiKeyENV) {
      setGoogleApiKey(googleApiKeyENV);
    }
    setIsLoading(false);
  }, [googleApiKeyENV]);

  return (
    <GoogleMapsContext.Provider value={{ googleApiKey, isLoadingGoogleMaps: isLoading }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) throw new Error("useGoogleMaps must be used within a GoogleMapsProvider");
  return context;
};
