"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import { mapPathToBreadcrumb } from "@/client/utils/breadcrumb-helpers";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface BreadcrumbCustomProps {
  isClick?: boolean;
  data?: { breadcrumbs1?: string; breadcrumbs2?: string; breadcrumbs3?: string };
}

const BreadcrumbCustom = ({ isClick = false, data }: BreadcrumbCustomProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  // Handle locale (e.g., if the first segment is "th" or similar)
  const filteredSegments = pathSegments.length > 1 ? pathSegments.slice(1) : pathSegments;
  const filteredForBreadcrumbs =
    filteredSegments.length > 1 && /^\d+$/.test(filteredSegments[filteredSegments.length - 1])
      ? filteredSegments.slice(0, -1) // drop last if it's a number
      : filteredSegments;

  const hasAnyBreadcrumbs = data?.breadcrumbs1 || data?.breadcrumbs2 || data?.breadcrumbs3;

  if (hasAnyBreadcrumbs) {
    const breadcrumbItems = [data?.breadcrumbs1, data?.breadcrumbs2, data?.breadcrumbs3].filter(Boolean);

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((label, index) => (
            <Fragment key={index}>
              {breadcrumbItems.length === 1 && index === 0 && <BreadcrumbSeparator isCorrectPage />}

              <BreadcrumbItem>
                <BreadcrumbPage
                  className={index === breadcrumbItems.length - 1 ? "uppercase" : "text-neutral-200 uppercase"}
                >
                  {label}
                </BreadcrumbPage>
              </BreadcrumbItem>

              {breadcrumbItems.length > 1 && index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator isCorrectPage={index === breadcrumbItems.length - 2} />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const renderBreadcrumbItem = (segment: string, index: number) => {
    const isLast = index === filteredSegments.length - 1;
    const isBeforeLast = index === filteredSegments.length - 2;
    const href = "/" + filteredSegments.slice(0, index + 1).join("/");
    const replacedSegment = segment;
    const formattedSegment = mapPathToBreadcrumb(replacedSegment);

    return (
      <Fragment key={href}>
        {filteredSegments.length === 1 && <BreadcrumbSeparator isCorrectPage />}
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage className="uppercase">{formattedSegment}</BreadcrumbPage>
          ) : !isClick ? (
            <BreadcrumbPage className="text-neutral-200 uppercase">{formattedSegment}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href} className="uppercase">
              {formattedSegment}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {/* Only render a separator if it's NOT the last item */}
        {!isLast && <BreadcrumbSeparator isCorrectPage={isBeforeLast} />}
      </Fragment>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {filteredSegments.length > 0 ? (
          filteredForBreadcrumbs.map(renderBreadcrumbItem)
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
