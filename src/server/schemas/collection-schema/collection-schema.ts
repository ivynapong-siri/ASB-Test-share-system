import { z } from "zod";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;

export const paginationParams = z.object({
  page: z
    .union([z.string(), z.number()])
    .default(DEFAULT_PAGE)
    .transform((item) => Number(item)),
  pageSize: z
    .union([z.string(), z.number()])
    .default(DEFAULT_PAGE_SIZE)
    .transform((item) => Number(item)),
});

export type PaginationParams = z.infer<typeof paginationParams>;

export const orderValues = ["asc", "desc"] as const;

export const qSchema = z.object({
  q: z.string().optional(),
});

export type QSchema = z.infer<typeof qSchema>;

export function defaultCollectionParams(query: { [key: string]: string | string[] | undefined }) {
  const pagination = paginationParams.parse(query);
  const { q } = qSchema.parse(query);
  return {
    pagination,
    take: pagination.pageSize,
    skip: pagination.pageSize * (pagination.page - 1),
    q,
  };
}
