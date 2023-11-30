import { TransactionSchema } from "@schemas/models/transaction";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const TransactionModel =
  models.Transaction || model("Transaction", SchemaMongo(TransactionSchema.toMongoSchemaValidations()));
