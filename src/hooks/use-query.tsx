"use client";

import { useEffect } from "react";

import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

export function useQuery() {
  const [q, setQ] = useQueryState("q", parseAsString.withOptions({ shallow: false }));
  const reset = () => setQ(null);

  useEffect(() => {
    if (q == "") reset();
  }, [q]);
  return { q, setQ, reset };
}

export function usePageQuery() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1).withOptions({ shallow: false }));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(20).withOptions({ shallow: false })
  );
  const resetPage: () => void = () => (page != 1 ? setPage(1) : {});
  return { page, setPage, resetPage, pageSize, setPageSize };
}

export function useSortQuery() {
  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsStringEnum(["asc", "desc"]).withDefault("desc").withOptions({ shallow: false })
  );
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault("createdAt").withOptions({ shallow: false })
  );

  return { sortOrder, setSortOrder, sortBy, setSortBy };
}
