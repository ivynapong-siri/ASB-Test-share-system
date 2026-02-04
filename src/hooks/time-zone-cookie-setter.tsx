"use client";

import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { TIME_ZONE_COOKIE } from "@/server/constants/configuration";

export default function TimeZoneCookieSetter() {
  const [, setCookie] = useCookies([TIME_ZONE_COOKIE]);

  useEffect(() => {
    setCookie(TIME_ZONE_COOKIE, `${Intl.DateTimeFormat().resolvedOptions().timeZone}`);
  }, [setCookie]);
  return null;
}
