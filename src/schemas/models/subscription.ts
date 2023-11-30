import { getConfigs } from "@helpers/getConfigs";
import { Subscription } from "@typescript/models/subscription";
import { SchemaValidator } from "@utils/schemaValidator";

export const SubscriptionSchema = new SchemaValidator<Subscription>({
  plan: {
    valueType: String,
    isRequired: true,
    isEnum: Object.keys(getConfigs("platform").plans)
  },
  status: { valueType: String, isRequired: false, isEnum: ["Active", "Expired", "Pending"], defaultValue: "Active" },
  cycle_start_date: { valueType: Date, isRequired: true, isDate: true },
  cycle_end_date: { valueType: Date, isRequired: true, isDate: true }
});
