import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

export default function Spinner({ className }: { className?: string }) {
  return <LoaderIcon className={cn("animate-spin", className)} />;
}
