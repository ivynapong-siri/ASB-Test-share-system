import { cn } from "@/lib/utils";

interface ASBDescriptionProps {
  description: string;
  className?: string;
}

const ASBFormDescription = ({ description, className }: ASBDescriptionProps) => {
  return (
    <span className={cn("max-w-3xl font-mono text-base text-gray-600 lg:text-base xl:text-lg", className)}>
      {description}
    </span>
  );
};

export default ASBFormDescription;
