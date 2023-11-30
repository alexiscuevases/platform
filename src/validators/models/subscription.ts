import { SubscriptionSchema } from "@schemas/models/subscription";
import { CreateSubscription } from "@typescript/models/subscription";
import { SchemaValidator } from "@utils/schemaValidator";

export const ValidatorToCreateSubscription = new SchemaValidator<CreateSubscription>(
  {
    plan: { ...SubscriptionSchema.getPropertyValidations("plan") },
    status: { ...SubscriptionSchema.getPropertyValidations("status") },
    cycle_start_date: { ...SubscriptionSchema.getPropertyValidations("cycle_start_date") },
    cycle_end_date: { ...SubscriptionSchema.getPropertyValidations("cycle_end_date") }
  },
  {
    ...SubscriptionSchema.getSchemaErrorsValidations<CreateSubscription>()
  }
);
