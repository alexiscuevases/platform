import { SubscriptionSchema } from "@schemas/models/subscription";
import { SchemaMongo } from "@libs/mongoose";
import { model, models } from "mongoose";

export const SubscriptionModel =
  models.Subscription || model("Subscription", SchemaMongo(SubscriptionSchema.toMongoSchemaValidations()));
