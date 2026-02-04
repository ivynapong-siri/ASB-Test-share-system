import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface TicketProps {
  children: React.ReactNode;
  cardClassName?: string;
  childrenClassName?: string;
  iconClassName?: string;
  borderClassName?: string;
  disableButton?: boolean;
  onClose?: () => void;
  borderColor?: "white" | "secondary";
}

const Ticket: React.FC<TicketProps> = ({
  children,
  cardClassName,
  childrenClassName,
  iconClassName,
  borderClassName,
  disableButton,
  onClose,
  borderColor = "white",
}) => {
  return (
    <div className={cn("bg-secondary rounded-3xl p-3", cardClassName)}>
      <div
        className={cn("relative h-full rounded-2xl bg-cover bg-no-repeat", borderClassName)}
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='${borderColor === "secondary" ? "%23B81E29FF" : "white"}' stroke-width='3' stroke-dasharray='6%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e\")`,
          borderRadius: 16,
        }}
      >
        {disableButton ? null : (
          <Button
            onClick={onClose}
            className="hover:bg-primary group/button absolute top-2 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white !p-2 hover:cursor-pointer"
          >
            <X className={cn("text-primary size-6 group-hover/button:text-white", iconClassName)} />
          </Button>
        )}
        <div className={cn("p-3 text-white lg:p-5", childrenClassName)}>{children}</div>
      </div>
    </div>
  );
};

export default Ticket;
