import {
  BusinessInformationInterface,
  CreateBusinessInterface,
  LegalAddressInterface,
  LegalPersonInterface,
  NaturalPersonInterface
} from "interfaces";
import { BusinessSchema } from "schemas";
import { SchemaValidator } from "utilities";

export const CreateBusinessValidator = new SchemaValidator<CreateBusinessInterface>(
  {
    owner_user_id: { ...BusinessSchema.getPropertyValidations("owner_user_id") },
    business_name: { ...BusinessSchema.getPropertyValidations("business_name") },
    business_email: { ...BusinessSchema.getPropertyValidations("business_email") },
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
  BusinessSchema.getSchemaErrorsValidations<CreateBusinessInterface>()
);

export const NaturalPersonValidator = new SchemaValidator<NaturalPersonInterface>({
  legal_names: { ...BusinessSchema.getPropertyValidations("legal_names"), isRequired: true },
  legal_surnames: { ...BusinessSchema.getPropertyValidations("legal_surnames"), isRequired: true },
  document_type: { ...BusinessSchema.getPropertyValidations("document_type"), isRequired: true },
  document_number: { ...BusinessSchema.getPropertyValidations("document_number"), isRequired: true }
});

export const LegalPersonValidator = new SchemaValidator<LegalPersonInterface>({
  business_legal_name: { ...BusinessSchema.getPropertyValidations("business_legal_name"), isRequired: true },
  business_legal_identification: {
    ...BusinessSchema.getPropertyValidations("business_legal_identification"),
    isRequired: true
  }
});

export const LegalAddressValidator = new SchemaValidator<LegalAddressInterface>(
  {
    country_code: { ...BusinessSchema.getPropertyValidations("country_code") },
    city: { ...BusinessSchema.getPropertyValidations("city") },
    address: { ...BusinessSchema.getPropertyValidations("address") }
  },
  BusinessSchema.getSchemaErrorsValidations<CreateBusinessInterface>()
);

export const BusinessInformationValidator = new SchemaValidator<BusinessInformationInterface>(
  {
    business_name: { ...BusinessSchema.getPropertyValidations("business_name") },
    business_email: { ...BusinessSchema.getPropertyValidations("business_email") },
    business_local_subdomain: { ...BusinessSchema.getPropertyValidations("business_local_subdomain") }
  },
  BusinessSchema.getSchemaErrorsValidations<CreateBusinessInterface>()
);
