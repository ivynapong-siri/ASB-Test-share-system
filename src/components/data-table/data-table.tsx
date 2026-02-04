"use client";

import { ReactNode, useState } from "react";

import { usePageQuery, useQuery, useSortQuery } from "@/hooks/use-query";
import { Pagination as PaginationModel } from "@/server/models/pagination";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownAZ, ArrowDownZA, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export enum TableDataSource {
  Client,
  Server,
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationModel;
  dataSource?: TableDataSource;
  searchKey?: keyof TData;
  placeholder?: string;
  topContent?: ReactNode;
  onRowClick?: (original: TData) => void;
}

function useTableState<TData, TValue>({ data, columns }: { data: TData[]; columns: ColumnDef<TData, TValue>[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return { sorting, columnFilters, columnVisibility, rowSelection, table };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  searchKey,
  placeholder,
  topContent,
  dataSource = TableDataSource.Client,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const { page, setPage, pageSize, setPageSize } = usePageQuery();
  const { q, setQ, reset } = useQuery();
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useSortQuery();

  const { table } = useTableState({ data, columns });

  const onHeaderClicked = (id: string) => {
    if (dataSource == TableDataSource.Client) return;
    setSortBy((prevSortBy) => {
      if (prevSortBy === id) {
        setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : null));
        return prevSortBy === id && sortOrder === "desc" ? null : id;
      } else {
        setSortOrder("asc");
        return id;
      }
    });
  };

  const renderPagination = () => {
    if (!pagination) return;
    const totalPages = pagination.totalPages ?? 0;
    const pageIndex = page; // No need for +1, since we ensure it starts from 1
    const maxVisiblePages = 5; // Only show 5 page buttons

    // Ensure the pagination starts from 1 instead of 0
    let startPage = Math.max(1, pageIndex - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust to ensure we always display the right number of pages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex items-center py-4">
        <Select defaultValue={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
          <span className="flex items-center space-x-2">
            <Label>Result per Page</Label>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="min-w-20">
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </span>
        </Select>
        <div className="flex flex-grow justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    if (page != 1) setPage(1);
                  }}
                >
                  <ChevronFirst />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page != 1) setPage(page - 1);
                  }}
                >
                  <ChevronLeft />
                </PaginationPrevious>
              </PaginationItem>
              {/* Show ellipsis before first page only if there's a gap */}
              {startPage > 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const pageNumber = startPage + index;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink onClick={() => setPage(pageNumber)} isActive={pageNumber == page}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {/* Show ellipsis before last page only if there's a gap */}
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page != totalPages) setPage(page + 1);
                  }}
                >
                  <ChevronRight />
                </PaginationNext>
              </PaginationItem>
              <PaginationItem
                onClick={() => {
                  if (page != totalPages) setPage(totalPages);
                }}
              >
                <PaginationLink>
                  <ChevronLast />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 py-4">
        {(dataSource == TableDataSource.Server || (placeholder && searchKey)) && (
          <Input
            placeholder={placeholder}
            value={
              placeholder && searchKey ? (table.getColumn(searchKey as string)?.getFilterValue() as string) : (q ?? "")
            }
            onChange={(event) => {
              placeholder && searchKey
                ? table.getColumn(searchKey as string)?.setFilterValue(event.target.value)
                : setQ(event.target.value);
            }}
            className="max-w-60"
          />
        )}
        {topContent && <div className="flex gap-4">{topContent}</div>}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(header.column.getCanSort() && "cursor-pointer")}
                      onClick={
                        dataSource == TableDataSource.Server
                          ? () => {
                              if (!header.column.getCanSort()) return;
                              onHeaderClicked(header.id);
                            }
                          : undefined
                      }
                    >
                      <span className="flex items-center gap-2">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && header.id === sortBy ? (
                          sortOrder == "desc" ? (
                            <ArrowDownZA className="size-4" />
                          ) : (
                            <ArrowDownAZ className="size-4" />
                          )
                        ) : (
                          <></>
                        )}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {renderPagination()}
    </div>
  );
}
