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

export interface TokenizeCard {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export interface Transaction {
  status?: TransactionStatuses;
}

export interface CreateTransaction {
  acceptance_token: string;
  amount_in_cents: number;
  currency: string;
  signature: string;
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
