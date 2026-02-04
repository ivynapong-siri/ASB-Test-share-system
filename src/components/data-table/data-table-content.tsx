"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { formatHeaderTable } from "@/client/utils/helper";
import { cn } from "@/lib/utils";

type GenericRow = Record<string, any>;

interface DataTableContentProps {
  data: GenericRow[];
  tableHeaderTitle?: string;
  tableHeaderClassName?: string;
  tableRowHeaderClassName?: string;
  className?: string;
  mergeKey?: string;
  requireHeader?: boolean;
  requireMiddleTable?: boolean;
  tableClassName?: string;
  wrapperTableClassName?: string;
  showHeader?: boolean;
}

export default function DataTableContent({
  data,
  tableHeaderTitle,
  tableHeaderClassName,
  className,
  mergeKey,
  tableRowHeaderClassName,
  requireHeader,
  requireMiddleTable,
  tableClassName,
  wrapperTableClassName,
  showHeader,
}: DataTableContentProps) {
  if (!data || data.length === 0) return <p>No data available</p>;

  const keys = Object.keys(data[0]);
  const grouped = mergeKey
    ? data.reduce<Record<string, GenericRow[]>>((acc, row) => {
        const key = row[mergeKey] ?? "__empty__";
        acc[key] = acc[key] || [];
        acc[key].push(row);
        return acc;
      }, {})
    : null;

  return (
    <div className={cn("flex w-full flex-col items-center gap-6", className, requireMiddleTable && "gap-0")}>
      {tableHeaderTitle && showHeader && (
        <h2
          className={cn(
            "text-primary-400 text-xl font-medium",
            tableHeaderClassName,
            requireMiddleTable && "bg-primary flex w-full items-center justify-center p-4 text-center text-white"
          )}
        >
          {tableHeaderTitle}
        </h2>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-b-lg",
          requireMiddleTable && "rounded-none",
          wrapperTableClassName
        )}
      >
        <Table className={cn("min-w-full table-auto overflow-scroll rounded-lg", tableClassName)}>
          {requireHeader !== false && (
            <TableHeader className="bg-primary rounded-lg text-white">
              <TableRow className={tableRowHeaderClassName}>
                {keys.map((key, index) => (
                  <TableHead
                    key={key}
                    className={cn(
                      "text-start text-base text-white capitalize sm:text-lg",
                      requireMiddleTable && "text-center",
                      index == 0 && "rounded-tl-lg",
                      index == keys.length - 1 && "rounded-tr-lg"
                    )}
                  >
                    {formatHeaderTable(key)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody
            className={cn(
              "rounded-b-lg border font-mono text-xs text-[#353535] sm:text-base",
              requireMiddleTable && "text-center"
            )}
          >
            {grouped
              ? Object.entries(grouped).map(([group, rows], groupIdx, groupsArr) =>
                  rows.map((row, idx) => {
                    const isLastGroup = groupIdx === groupsArr.length - 1;
                    const isLastRowInGroup = idx === rows.length - 1;
                    const isLastRow = isLastGroup && isLastRowInGroup;

                    return (
                      <TableRow
                        key={`${group}-${idx}`}
                        className="rounded-2xl border-none even:bg-gray-100 dark:even:bg-gray-800"
                      >
                        {keys.map((key, keyIdx) => {
                          if (key === mergeKey && idx === 0) {
                            return (
                              <TableCell
                                key={key}
                                rowSpan={rows.length}
                                className={cn("border-none pl-4 text-start align-middle", isLastRow && "rounded-bl-lg")}
                              >
                                {row[key]}
                              </TableCell>
                            );
                          }
                          if (key === mergeKey) return null;
                          return (
                            <TableCell
                              className={cn("text-nowrap", isLastRow && keyIdx === keys.length - 1 && "rounded-br-lg")}
                              key={key}
                            >
                              {row[key]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )
              : data.map((row, idx) => (
                  <TableRow key={idx} className="even:bg-gray-100 dark:even:bg-gray-800">
                    {keys.map((key) => (
                      <TableCell key={key}>{row[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
