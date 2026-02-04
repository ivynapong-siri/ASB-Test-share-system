import { cn } from "@/lib/utils";

interface ASBTitleProps {
  title: string;
  className?: string;
  title2?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

const ASBTitle = ({ title, className, title2, as = "h2" }: ASBTitleProps) => {
  const Tag = as;

  return (
    <Tag className={cn("text-primary-400 text-center", className)}>
      {title}
      {title2 && <br />}
      {title2}
    </Tag>
  );
};

export default ASBTitle;
