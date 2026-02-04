import React from "react";
import Ticket from "../ticket";
import { cn } from "@/lib/utils";

interface AdmissionCardProps {
  title: string;
  grade?: string;
  description?: string;
  fromDate: string;
  toDate: string;
  badge?: string;
  badgeClassName?: string;
  dateClassName?: string;
  descriptionClassName?: string;
}

const AdmissionCard: React.FC<AdmissionCardProps> = ({
  title,
  grade,
  badge,
  description,
  fromDate,
  toDate,
  badgeClassName,
  dateClassName,
  descriptionClassName,
}) => {
  return (
    <Ticket cardClassName="bg-white" borderColor="secondary" disableButton>
      <div className="text-primary flex flex-col gap-2 ">
        {badge && (
          <div
            className={cn(
              "bg-secondary w-fit rounded-3xl px-3 py-2 font-mono text-sm font-medium text-white uppercase",
              badgeClassName
            )}
          >
            {badge}
          </div>
        )}
        <div className="flex flex-col font-sans text-xl font-semibold">
          <h6>{title}</h6>
          <p>{grade}</p>
          {description && <p className={cn("w-2/3 text-xl font-semibold", descriptionClassName)}>{description}</p>}
        </div>
        {(fromDate || toDate) && (
          <div className={cn("mt-4 flex flex-col", dateClassName)}>
            {fromDate && (
              <p className="font-mono lg:w-2/3">
                {fromDate}
                {toDate && " to"}
              </p>
            )}
            {toDate && <p className="font-mono lg:w-2/3">{toDate}</p>}
          </div>
        )}
      </div>
    </Ticket>
  );
};

export default AdmissionCard;
