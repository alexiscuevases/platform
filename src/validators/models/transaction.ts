import { TransactionSchema } from "@schemas/models/transaction";
import { CreateTransaction } from "@typescript/models/transaction";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateTransaction = new SchemaValidator<CreateTransaction>(
  {
    status: { ...TransactionSchema.getPropertyValidations("status") },
    status_update_date: { ...TransactionSchema.getPropertyValidations("status_update_date") },
    transaction_provider: { ...TransactionSchema.getPropertyValidations("transaction_provider") },
    transaction_id: { ...TransactionSchema.getPropertyValidations("transaction_id") },
    intention: { ...TransactionSchema.getPropertyValidations("intention") },
    intention_id: { ...TransactionSchema.getPropertyValidations("intention_id") }
  },
  {
    ...TransactionSchema.getSchemaErrorsValidations<CreateTransaction>()
  }
);
