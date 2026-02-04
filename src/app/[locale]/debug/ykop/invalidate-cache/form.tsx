"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { invalidateCache } from "./actions";

const LOCALES = ["en", "ja", "ko", "th", "zh-hans"];

export function InvalidateCacheForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    totalPages: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await invalidateCache();
      setResult(res);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <Button type="submit" disabled={isPending}>
        {isPending ? "Invalidating..." : "Invalidate Cache"}
      </Button>

      {result && (
        <div className={`rounded-lg p-4 ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          <h3 className={result.success ? "✅" : "❌"}>{result.message}</h3>
          {result.success && (
            <>
              <p>
                <strong>Locales:</strong> {LOCALES.join(", ")}
              </p>
              <p>
                <strong>Total pages revalidated:</strong> {result.totalPages}
              </p>
            </>
          )}
        </div>
      )}
    </form>
  );
}
