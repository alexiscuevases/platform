import { Transaction } from "@typescript/models/transaction";
import { SchemaValidator } from "@utils/schemaValidator";

export const TransactionSchema = new SchemaValidator<Transaction>({
  status: {
    valueType: String,
    isRequired: false,
    isEnum: ["PENDING", "APPROVED", "DECLINED", "ERROR", "VOIDED"],
    defaultValue: "PENDING"
  },
  status_update_date: { valueType: Date, isRequired: false, isDate: true, defaultValue: new Date() },
  transaction_provider: { valueType: String, isRequired: false, isEnum: ["Wompi"], defaultValue: "Wompi" },
  transaction_id: { valueType: String, isRequired: true },
  intention: { valueType: String, isRequired: true, isEnum: ["Create subscription", "Update Subscription"] },
  intention_id: { valueType: String, isRequired: true, isObjectId: true, referenceModel: "Subscription" }
});
