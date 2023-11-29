type LegalIdTypes = "CC" | "CE" | "TI" | "NIT" | "PP" | "DNI" | "RG" | "OTHER";
type TransactionStatuses = "PENDING" | "APPROVED" | "DECLINED" | "ERROR" | "VOIDED";
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

export interface WompiEvent {}
