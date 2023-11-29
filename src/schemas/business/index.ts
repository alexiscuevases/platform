import { getConfigs } from "@helpers/getConfigs";
import { Business } from "@typescript/models/business";
import { SchemaValidator } from "@utils/schemaValidator";

export const BusinessSchema = new SchemaValidator<Business>({
  owner_user_id: { valueType: String, referenceModel: "User", isRequired: true, isObjectId: true },
  business_status: {
    valueType: String,
    isRequired: false,
    isEnum: ["Activated", "Desactivated"],
    defaultValue: "Activated"
  },
  business_name: {
    valueType: String,
    isRequired: true,
    maxLength: 64,
    notIsEnum: getConfigs("business").namesNotAllowed
  },
  business_email: { valueType: String, isRequired: true, isEmail: true },
  business_phone: { valueType: String, isRequired: true, isPhone: true },
  business_local_subdomain: {
    valueType: String,
    uniqueValue: true,
    isRequired: true,
    maxLength: 63,
    isRegex: /^[a-zA-Z0-9-]+$/,
    notIsEnum: getConfigs("business").subdomainsNotAllowed
  },
  business_custom_domain: {
    valueType: String,
    isRequired: false,
    maxLength: 191,
    defaultValue: null,
    isRegex: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
    notIsEnum: getConfigs("business").domainsNotAllowed
  },
  business_currency: { valueType: String, isRequired: false, isEnum: ["USD", "COP"], defaultValue: "USD" },
  business_language: { valueType: String, isRequired: false, defaultValue: "EN" },
  business_template: { valueType: String, isRequired: false, defaultValue: "Default" },
  subscription_plan: {
    valueType: String,
    isRequired: false,
    isEnum: Object.keys(getConfigs("platform").plans),
    defaultValue: "Free"
  },
  subscription_id: {
    valueType: String,
    referenceModel: "Subscription",
    isObjectId: true,
    isRequired: false,
    defaultValue: null
  },
  subscription_status: { valueType: String, isRequired: false, isEnum: ["Active", "Expired"], defaultValue: "Active" },
  business_type: { valueType: String, isRequired: true, isEnum: ["Natural person", "Legal person"] },
  legal_names: { valueType: String, isRequired: false, maxLength: 32, defaultValue: null },
  legal_surnames: { valueType: String, isRequired: false, maxLength: 32, defaultValue: null },
  document_type: { valueType: String, isRequired: false, isEnum: ["CC", "CE", null], defaultValue: null },
  document_number: { valueType: String, isRequired: false, minLength: 7, maxLength: 10, defaultValue: null },
  business_legal_name: { valueType: String, isRequired: false, maxLength: 64, defaultValue: null },
  business_legal_identification: {
    valueType: String,
    isRequired: false,
    minLength: 9,
    maxLength: 12,
    defaultValue: null
  },
  country_code: { valueType: String, isRequired: true, isEnum: ["CO"] },
  city: { valueType: String, isRequired: true, maxLength: 32 },
  address: { valueType: String, isRequired: true, maxLength: 64 },
  legality_verification_status: {
    valueType: String,
    isRequired: false,
    isEnum: ["Approved", "Disapproved", "Pending"],
    defaultValue: "Pending"
  }
});
