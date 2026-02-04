import { PaginationSchema } from "../schemas/pagination-schema";

export type Pagination = { totalCount: number; totalPages: number | null; currentPage: number; pageSize: number };

function pagination(totalCount: number, pagination: PaginationSchema): Pagination {
  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  return {
    totalCount: totalCount,
    totalPages: totalPages,
    currentPage: Math.max(Math.min(pagination.page, totalPages), 1),
    pageSize: pagination.pageSize,
  };
}

export type PaginatedModel<T> = { pagination: Pagination; items: T[] };

export function paginatedModel<T>(
  items: T[],
  totalCount: number,
  paginationSchema: PaginationSchema
): PaginatedModel<T> {
  return { items: items, pagination: pagination(totalCount, paginationSchema) };
}
