import { NextRequest } from "next/server";

export function getHeaders(request: NextRequest, key: string) {
  return request.headers.get(key);
}

export async function getRouteParams(context: { params: Promise<any> }) {
  const p = await context.params;
  return { ...p };
}

export function getQueryParams(request: NextRequest) {
  const entries = request.nextUrl.searchParams.entries();
  return getQueryParamsFromEntries(entries);
}

export function getQueryParamsFromEntries(entries: IterableIterator<[string, string]> | [string, string][]) {
  const result: Record<string, any> = {};
  const tryParseArrayValue = (value: string) => {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      }
      if (typeof parsedValue === "string") {
        return [parsedValue];
      } else if (typeof parsedValue === "boolean") return parsedValue;
    } catch (error) {}
    return value;
  };
  const regex = /([^[\]]+)(\[([^[\]]*)\])?/;

  for (const [key, value] of entries) {
    const matches = key.match(regex);
    if (matches) {
      const [, baseKey, , index] = matches;
      const isArrayKey = index !== undefined;
      const normalizedKey = isArrayKey ? baseKey : key;

      if (isArrayKey) {
        if (!result[normalizedKey]) {
          result[normalizedKey] = [];
        }

        if (index === "") {
          const values = value.split(",");
          result[normalizedKey] = [...result[normalizedKey], ...values];
        } else {
          const numericIndex = Number(index);
          result[normalizedKey][numericIndex] = value;
        }
      } else {
        result[key] = tryParseArrayValue(value);
      }
    } else {
      result[key] = tryParseArrayValue(value);
    }
  }

  return result;
}
