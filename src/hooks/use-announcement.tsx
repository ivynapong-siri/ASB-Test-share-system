"use client";

import { WordPressAnnouncementJson } from "@/server/types/wordpress-type";
import { useEffect, useState } from "react";

export interface Announcement {
  message: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  id: number;
}

const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

const wasAnnouncementShownToday = (announcementId: number): boolean => {
  const today = getTodayString();
  const storageKey = `announcement_${announcementId}_${today}`;
  return localStorage.getItem(storageKey) === "shown";
};

const markAnnouncementAsShown = (announcementId: number): void => {
  const today = getTodayString();
  const storageKey = `announcement_${announcementId}_${today}`;
  localStorage.setItem(storageKey, "shown");
};

const cleanupOldAnnouncements = (): void => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("announcement_")) {
      const datePart = key.split("_").slice(2).join("-");
      const announcementDate = new Date(datePart);

      if (announcementDate < sevenDaysAgo) {
        keysToRemove.push(key);
      }
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const useAnnouncement = ({ announcementData }: { announcementData?: WordPressAnnouncementJson | null }) => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    cleanupOldAnnouncements();

    if (announcementData) {
      const announcementId = announcementData.id || 1;

      if (!wasAnnouncementShownToday(announcementId)) {
        setCurrentAnnouncement({
          message: {
            title: announcementData.title,
            description: announcementData.description,
            buttonLabel: announcementData.button_label,
            buttonUrl: announcementData.button_url,
          },
          id: announcementId,
        });

        const autoMarkTimer = setTimeout(() => {
          markAnnouncementAsShown(announcementId);
        }, 30000); // 30 seconds

        return () => clearTimeout(autoMarkTimer);
      }
    }
  }, [announcementData]);

  useEffect(() => {
    const handleAnnouncementEvent = (event: CustomEvent<Announcement>) => setCurrentAnnouncement(event.detail);

    document.addEventListener("announcement", handleAnnouncementEvent as EventListener);

    return () => document.removeEventListener("announcement", handleAnnouncementEvent as EventListener);
  }, []);

  const closeAnnouncement = () => {
    if (currentAnnouncement) {
      markAnnouncementAsShown(currentAnnouncement.id);
    }
    setCurrentAnnouncement(null);
  };

  const markAsShown = () => {
    if (currentAnnouncement) {
      markAnnouncementAsShown(currentAnnouncement.id);
    }
  };

  return { announcement: currentAnnouncement, onClose: closeAnnouncement, markAsShown };
};
