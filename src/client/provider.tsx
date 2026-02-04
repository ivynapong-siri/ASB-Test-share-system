"use client";

import { CookiesProvider } from "react-cookie";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import TimeZoneCookieSetter from "@/hooks/time-zone-cookie-setter";
import { i18nFormats } from "@/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { GoogleMapsProvider } from "./contexts/google-maps-context";
import { NavbarProvider } from "./contexts/navbar-context";

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
  timezone: string;
  googleAPIKey: string;
}

export function Providers(props: ProvidersProps) {
  const { children, messages, locale, timezone, googleAPIKey } = props;

  // Use useState to create QueryClient instance per request
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes for better caching
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
            // Reduce blocking time
            networkMode: "offlineFirst",
          },
          mutations: {
            retry: 1,
            networkMode: "offlineFirst",
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <TimeZoneCookieSetter />
        <NextIntlClientProvider formats={i18nFormats[locale]} messages={messages} locale={locale} timeZone={timezone}>
          <ThemeProvider attribute={"class"} enableSystem defaultTheme="light">
            <NuqsAdapter>
              <GoogleMapsProvider googleApiKeyENV={googleAPIKey}>
                <NavbarProvider>
                  <main>{children}</main>
                </NavbarProvider>
              </GoogleMapsProvider>
            </NuqsAdapter>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
