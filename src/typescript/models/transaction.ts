export type TransactionStatuses = "PENDING" | "APPROVED" | "DECLINED" | "ERROR" | "VOIDED";
type TransactionProviders = "Wompi";
type Intentions = "Create subscription" | "Update subscription";

export interface Transaction {
  status?: TransactionStatuses;
  status_update_date?: Date;
  transaction_provider?: TransactionProviders;
  transaction_id?: string;
  intention?: Intentions;
  intention_id?: string;
}

export interface CreateTransaction {
  status?: TransactionStatuses;
  status_update_date?: Date;
  transaction_provider?: TransactionProviders;
  transaction_id: string;
  intention: Intentions;
  intention_id: string;
}
