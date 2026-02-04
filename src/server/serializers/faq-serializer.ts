import { WordPressFAQJson } from "@/server/types/wordpress-type";

export type FAQJson = ReturnType<typeof serializeFAQ>;

export const serializeFAQs = (data: WordPressFAQJson[]) => {
  return data.map((image) => serializeFAQ(image));
};

export const serializeFAQ = (data: WordPressFAQJson) => {
  const { acf_fields } = data;
  return {
    id: data.ID,
    question: acf_fields.question,
    answer: acf_fields.answer,
  };
};
