import { WordPressSimpleTuitionAndFeesJson } from "@/server/types/wordpress-type";

export type SimpleTuitionAndFeesJson = ReturnType<typeof serializeSimpleTuitionAndFees>;

export const serializeSimpleTuitionAndFees = (data: WordPressSimpleTuitionAndFeesJson) => {
  return { title: data.title, description: data.description };
};
