"use client";

import { useTranslations } from "next-intl";

import { supportedLocales } from "@/i18n/config";
import { usePathname } from "@/i18n/routing";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const filteredSegments = pathSegments.filter((segment) => !supportedLocales.includes(segment));
  const t = useTranslations();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredSegments.map((segment, index) => {
          const href = "/" + filteredSegments.slice(0, index + 1).join("/");
          const isLast = index === filteredSegments.length - 1;
          const isUUID = (segment: string) => /^[0-9a-fA-F-]{36}$/.test(segment);
          const displayText = isUUID(segment) ? t("common.details") : t(`appBreadcumb.${segment}`);
          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <BreadcrumbPage>{displayText}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator isCorrectPage={isLast} />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
