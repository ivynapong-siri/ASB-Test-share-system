import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ASBRibbonText from "./asb-ribbon-text";

interface FormContentProps {
  formContentTitle?: string;
  children: ReactNode;
  className?: string;
}

const FormContent = ({ children, formContentTitle, className }: FormContentProps) => {
  return (
    <div className={cn("bg-primary-gray flex w-full flex-col gap-9 rounded-4xl p-9", className)}>
      {formContentTitle && (
        <ASBRibbonText
          title={formContentTitle}
          ribbonClassName="text-center bg-white border-neutral-200 text-black"
          vectorHidden
        />
      )}
      {children}
    </div>
  );
};

export default FormContent;
