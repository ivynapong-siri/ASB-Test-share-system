import { InvalidateCacheForm } from "./form";

export default async function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h2 className="mb-4 text-2xl font-bold">Cache Invalidation</h2>
      <InvalidateCacheForm />
    </div>
  );
}
