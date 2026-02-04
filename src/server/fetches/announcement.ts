import { WordPressAnnouncementJson } from "../types/wordpress-type";
import { fetchWordPressAPI } from "../utils/wordpress-helper";

interface Announcement {
  id: number;
  acf: Record<string, any>;
}

export async function fetchAnnouncement({ locale }: { locale: string }): Promise<WordPressAnnouncementJson | null> {
  let endpoint = `announcements?status=publish&acf_format=standard`;
  if (locale) {
    endpoint += `&lang=${locale}`;
  }
  const response = await fetchWordPressAPI<Announcement[]>(endpoint, {
    tags: ["wordpress", "announcement"],
    revalidate: 3600,
  });

  const [announcement] = response;
  if (!announcement || !announcement.acf) {
    throw new Error("The 'home' announcement does not have an ACF object.");
  }
  if (
    !announcement.acf.title ||
    !announcement.acf.description ||
    !announcement.acf.button_label ||
    !announcement.acf.button_url
  ) {
    return null;
  }

  const data = {
    id: announcement.id,
    title: announcement.acf.title,
    description: announcement.acf.description,
    button_label: announcement.acf.button_label,
    button_url: announcement.acf.button_url,
  };
  return data;
}
