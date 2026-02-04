import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="w-full max-w-[1000px] p-6">
      <h3 className="mb-6 text-2xl font-medium">
        <Skeleton className="h-8 w-32" />
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
          <div className="md:col-start-1">
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="flex h-10 w-full items-center" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
