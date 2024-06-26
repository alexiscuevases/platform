import { TransactionStatuses } from "@typescript/models/transaction";

type LegalIdTypes = "CC" | "CE" | "TI" | "NIT" | "PP" | "DNI" | "RG" | "OTHER";
type EventTypes = "transaction.updated" | "nequi_token.updated";
type EnviromentTypes = "prod" | "test";
type PaymentMethodTypes =
  | "CARD"
  | "NEQUI"
  | "PSE"
  | "BANCOLOMBIA"
  | "BANCOLOMBIA_TRANSFER"
  | "BANCOLOMBIA_COLLECT"
  | "BANCOLOMBIA_QR";

export interface WompiMerchant {
  id?: number;
  name?: string;
  legal_name?: string;
  legal_id?: string;
  legal_id_type?: LegalIdTypes;
  phone_number?: string;
  active?: boolean;
  logo_url?: string;
  email?: string;
  contact_name?: string;
  public_key?: string;
  accepted_payment_methods?: PaymentMethodTypes[];
  accepted_currencies?: ["COP"];
  presigned_acceptance?: {
    acceptance_token?: string;
    permalink?: string;
    type?: "END_USER_POLICY";
  };
}

export interface CreateWompiCardTokenization {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export interface WompiTokenizedCard {
  id?: string;
  brand?: "VISA" | "MASTERCARD";
  name?: string;
  last_four?: string;
  bin?: string;
  exp_year?: string;
  exp_month?: string;
  card_holder?: string;
  created_with_cvc?: boolean;
  expires_at?: Date;
  validity_ends_at?: Date;
  created_at?: Date;
}

export interface WompiTransaction {
  status?: TransactionStatuses;
  id?: string;
  amount_in_cents?: number;
  reference?: string;
  currency?: "COP";
  payment_method_type?: PaymentMethodTypes;
  payment_method?: {
    type?: PaymentMethodTypes;
    extra?: {
      name?: string;
      brand?: "VISA" | "MASTERCARD";
      last_four?: string;
      processor_response_code?: string;
    };
    installments?: number;
  };
  redirect_url?: string;
  status_message?: string;
  merchant?: {
    name?: string;
    legal_name?: string;
    contact_name?: string;
    phone_number?: string;
    logo_url?: string;
    legal_id_type?: LegalIdTypes;
    email?: string;
    legal_id?: string;
  };
  taxes?: any[];
  created_at?: Date;
}

export interface CreateWompiTransaction {
  acceptance_token?: string;
  amount_in_cents: number;
  currency: string;
  signature?: string;
  customer_email: string;
  customer_data?: {
    phone_number?: string;
    full_name: string;
    legal_id?: string;
    legal_id_type?: LegalIdTypes;
  };
  shipping_address?: {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    region: string;
    city: string;
    name?: string;
    phone_number: string;
    postal_code?: string;
  };
  payment_method?: {
    type: PaymentMethodTypes;
    token: string;
    installments: number;
  };
  redirect_url?: string;
  reference: string;
}

export interface WompiEvent {
  event: EventTypes;
  data: {
    transaction: {
      id: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: "COP";
      payment_method_type: PaymentMethodTypes;
      redirect_url: string;
      status: TransactionStatuses;
      shipping_address: string;
      payment_link_id: string;
      payment_source_id: string;
    };
  };
  environment: EnviromentTypes;
  signature: {
    properties: ["transaction.id", "transaction.status", "transaction.amount_in_cents"];
    checksum: string;
  };
  timestamp: number;
  sent_at: Date;
}
