import { WordPressPaymentMethodsJson } from "@/server/types/wordpress-type";
import { serializeSimpleTuitionAndFees } from "./simple-tuition-and-fees-serializer";

export type PaymentMethodsJson = ReturnType<typeof serializePaymentMethod>;

export const serializePaymentMethod = (data: WordPressPaymentMethodsJson) => {
  return {
    title: data.title,
    description: data.description,
    cheque: data.cheque && serializeSimpleTuitionAndFees(data.cheque),
    creditCard: data.credit_card && serializeSimpleTuitionAndFees(data.credit_card),
    bankTransfer: data.bank_transfer && serializeSimpleTuitionAndFees(data.bank_transfer),
  };
};
