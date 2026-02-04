import { WordPressRegistrationFeeJson, WordPressTuitionAndFeesTableRow } from "@/server/types/wordpress-type";

export type RegistrationFeeJson = ReturnType<typeof serializeRegistrationFee>;

export const serializeRegistrationFee = (data: WordPressRegistrationFeeJson) => {
  return {
    title: data.title,
    description: data.description,
    table: {
      tableLabel: data.table.table_label,
      header: {
        tableHeader1: data.table.header.header_1,
        tableHeader2: data.table.header.header_2,
      },
      row: {
        row1: serializeTuitionAndFeesTableRow(data.table.row_1),
        row2: serializeTuitionAndFeesTableRow(data.table.row_2),
        row3: serializeTuitionAndFeesTableRow(data.table.row_3),
      },
    },
  };
};

export const serializeTuitionAndFeesTableRow = (data: WordPressTuitionAndFeesTableRow) => {
  return { amount: data.amount, description: data.description };
};
