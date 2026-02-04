import { WordPressSiblingDiscountPoliciesJson } from "@/server/types/wordpress-type";

export type SiblingDiscountPoliciesJson = ReturnType<typeof serializeSiblingDiscountPolicies>;

export const serializeSiblingDiscountPolicies = (data: WordPressSiblingDiscountPoliciesJson) => {
  return {
    title: data.title,
    description: data.description,
    table: {
      tableLabel: data.table.table_label,
      header: {
        header1: data.table.header.header_1,
        header2: data.table.header.header_2,
        header3: data.table.header.header_3,
      },
      row: {
        row1: data.table.row_1.discount_1,
        row2: data.table.row_1.discount_2,
        row3: data.table.row_1.discount_3,
      },
    },
  };
};
