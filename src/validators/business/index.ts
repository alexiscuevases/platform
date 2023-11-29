import { BusinessSchema } from "@schemas/business";
import { Address, BusinessInformation, CreateBusiness, LegalPerson, NaturalPerson } from "@typescript/models/business";
import { SchemaValidator } from "@utils/schemaValidator";

export const BusinessAddressValidator = new SchemaValidator<Address>(
  {
    country_code: { ...BusinessSchema.getPropertyValidations("country_code") },
    city: { ...BusinessSchema.getPropertyValidations("city") },
    address: { ...BusinessSchema.getPropertyValidations("address") }
  },
  BusinessSchema.getSchemaErrorsValidations<CreateBusiness>()
);

export const BusinessInformationValidator = new SchemaValidator<BusinessInformation>(
  {
    business_name: { ...BusinessSchema.getPropertyValidations("business_name") },
    business_email: { ...BusinessSchema.getPropertyValidations("business_email") },
    business_phone: { ...BusinessSchema.getPropertyValidations("business_phone") },
    business_local_subdomain: { ...BusinessSchema.getPropertyValidations("business_local_subdomain") }
  },
  BusinessSchema.getSchemaErrorsValidations<CreateBusiness>()
);

export const NaturalPersonValidator = new SchemaValidator<NaturalPerson>({
  legal_names: { ...BusinessSchema.getPropertyValidations("legal_names"), isRequired: true },
  legal_surnames: { ...BusinessSchema.getPropertyValidations("legal_surnames"), isRequired: true },
  document_type: { ...BusinessSchema.getPropertyValidations("document_type"), isRequired: true },
  document_number: { ...BusinessSchema.getPropertyValidations("document_number"), isRequired: true }
});

export const LegalPersonValidator = new SchemaValidator<LegalPerson>({
  business_legal_name: { ...BusinessSchema.getPropertyValidations("business_legal_name"), isRequired: true },
  business_legal_identification: {
    ...BusinessSchema.getPropertyValidations("business_legal_identification"),
    isRequired: true
  }
});

export const ValidatorToCreateBusiness = new SchemaValidator<CreateBusiness>(
  {
    owner_user_id: { ...BusinessSchema.getPropertyValidations("owner_user_id") },
    business_name: { ...BusinessSchema.getPropertyValidations("business_name") },
    business_email: { ...BusinessSchema.getPropertyValidations("business_email") },
    business_phone: { ...BusinessSchema.getPropertyValidations("business_phone") },
    business_local_subdomain: { ...BusinessSchema.getPropertyValidations("business_local_subdomain") },
    subscription_plan: { ...BusinessSchema.getPropertyValidations("subscription_plan") },
    business_type: { ...BusinessSchema.getPropertyValidations("business_type") },
    legal_names: { ...BusinessSchema.getPropertyValidations("legal_names") },
    legal_surnames: { ...BusinessSchema.getPropertyValidations("legal_surnames") },
    document_type: { ...BusinessSchema.getPropertyValidations("document_type") },
    document_number: { ...BusinessSchema.getPropertyValidations("document_number") },
    business_legal_name: { ...BusinessSchema.getPropertyValidations("business_legal_name") },
    business_legal_identification: { ...BusinessSchema.getPropertyValidations("business_legal_identification") },
    country_code: { ...BusinessSchema.getPropertyValidations("country_code") },
    city: { ...BusinessSchema.getPropertyValidations("city") },
    address: { ...BusinessSchema.getPropertyValidations("address") }
  },
  BusinessSchema.getSchemaErrorsValidations<CreateBusiness>()
);
