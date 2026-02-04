"use client";

import { htmlToPlainText } from "@/client/utils/helper";
import { useAnnouncement } from "@/hooks/use-announcement";
import { WordPressAnnouncementJson } from "@/server/types/wordpress-type";
import { Fragment } from "react";
import LinkButton from "./buttons/link-button";
import Ticket from "./ticket";

export interface AnnouncementProps {
  announcementData?: WordPressAnnouncementJson | null;
}

export const Announcement = ({ announcementData }: AnnouncementProps) => {
  const { announcement, onClose, markAsShown } = useAnnouncement({ announcementData });

  if (!announcement) return null;

  return (
    <Fragment>
      <div className="fixed top-1/2 left-1/2 z-99 w-fit -translate-x-1/2 -translate-y-1/2 lg:top-auto lg:right-6 lg:bottom-6 lg:left-auto lg:translate-x-0 lg:translate-y-0">
        <Ticket onClose={onClose}>
          <div className="flex min-w-[300px] flex-col text-white">
            <h6 className="w-52 font-sans text-white max-lg:text-base">{announcement.message.title}</h6>
            <p className="pt-2 font-mono text-xs whitespace-pre-line lg:text-base">
              {htmlToPlainText(announcement.message.description)}
            </p>
            <div className="pt-4">
              <LinkButton
                href={announcement.message.buttonUrl}
                buttonText={announcement.message.buttonLabel}
                linkClassName="bg-white text-primary hover:text-white hover:bg-primary py-2 text-xs lg:text-sm font-medium"
                iconClassName="text-secondary border-primary group-hover/button:border-white group-hover/button:text-white size-6 p-1"
                onClick={markAsShown}
              />
            </div>
          </div>
        </Ticket>
      </div>
      <div className="fixed top-0 left-0 z-98 h-full w-full bg-black/80 lg:hidden" />
    </Fragment>
  );
};
