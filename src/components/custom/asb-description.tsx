import { cn } from "@/lib/utils";

interface ASBDescriptionProps {
  className?: string;
  description: string;
}

const ASBDescription = ({ description, className }: ASBDescriptionProps) => {
  return <p className={cn("font-mono text-base/[1.625rem] text-neutral-300", className)}>{description}</p>;
};

export default ASBDescription;
