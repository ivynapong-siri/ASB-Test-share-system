import { useTranslations } from "next-intl";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

interface PageControlProps {
  gotoPage: (pageIndex: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  showCount: number;
}

const PageControl = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageCount,
  showCount,
}: PageControlProps) => {
  const t = useTranslations("common");

  const totalButtons = Math.min(showCount, pageCount);
  let firstPageToShow = Math.max(0, pageIndex - Math.floor(totalButtons / 2));
  const lastPageToShow = Math.min(pageCount - 1, firstPageToShow + totalButtons - 1);

  if (lastPageToShow - firstPageToShow < totalButtons - 1) {
    firstPageToShow = Math.max(0, lastPageToShow - totalButtons + 1);
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => previousPage()}
            className={cn(!canPreviousPage && "pointer-events-none cursor-not-allowed")}
            aria-label={t("common.previous")}
          />
        </PaginationItem>
        {Array.from({ length: totalButtons }, (_, index) => {
          const pageNumber = firstPageToShow + index;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink onClick={() => gotoPage(pageNumber)} isActive={pageNumber === pageIndex}>
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {lastPageToShow < pageCount - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => nextPage()}
            className={cn(!canNextPage && "pointer-events-none cursor-not-allowed")}
            aria-label={t("common.next")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PageControl;
