import { MongooseSchemaDefaultProperties } from "@typescript/libs/mongoose";
import { Taxes } from "@typescript/others";

type DocumentTypes = "CC" | "CE";
type LegalityVerificationStatuses = "Approved" | "Disapproved" | "Pending";
type BusinessStatuses = "Activated" | "Desactivated";
type BusinessTypes = "Natural person" | "Legal person";
type SubscriptionStatuses = "Active" | "Expired";
type SubscriptionPlans = "Free" | "Basic" | "Standard" | "Advanced" | "Pro";

export interface Address {
  country_code: string;
  city: string;
  address: string;
}

export interface BusinessInformation {
  business_name: string;
  business_email: string;
  business_local_subdomain: string;
}

export interface NaturalPerson {
  legal_names: string;
  legal_surnames: string;
  document_type: DocumentTypes;
  document_number: string;
}

export interface LegalPerson {
  business_legal_name: string;
  business_legal_identification: string;
}

export interface Business extends MongooseSchemaDefaultProperties {
  owner_user_id?: string;
  business_status?: BusinessStatuses;
  business_name?: string;
  business_email?: string;
  business_local_subdomain?: string;
  business_custom_domain?: string;
  business_currency?: string;
  business_language?: string;
  business_template?: string;
  subscription_plan?: SubscriptionPlans;
  subscription_id?: any;
  subscription_status?: SubscriptionStatuses;
  business_type?: BusinessTypes;
  legal_names?: string | null;
  legal_surnames?: string | null;
  document_type?: DocumentTypes | null;
  document_number?: string | null;
  business_legal_name?: string | null;
  business_legal_identification?: string | null;
  country_code?: string;
  city?: string;
  address?: string;
  legality_verification_status?: LegalityVerificationStatuses;
  defaultTaxes?: Taxes;
}

export interface CreateBusiness extends BusinessInformation, Address {
  owner_user_id: any;
  subscription_plan?: SubscriptionPlans;
  business_type: BusinessTypes;
  legal_names?: string | null;
  legal_surnames?: string | null;
  document_type?: DocumentTypes | null;
  document_number?: string | null;
  business_legal_name?: string | null;
  business_legal_identification?: string | null;
}
