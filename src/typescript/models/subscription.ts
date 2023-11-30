export type SubscriptionPlans = "Free" | "Basic" | "Standard" | "Advanced" | "Pro";
export type SubscriptionStatuses = "Active" | "Expired" | "Pending";

export interface Subscription {
  business_id?: string;
  plan?: SubscriptionPlans;
  status?: SubscriptionStatuses;
  cycle_start_date?: Date;
  cycle_end_date?: Date;
}

export interface CreateSubscription {
  plan: SubscriptionPlans;
  status?: SubscriptionStatuses;
  cycle_start_date: Date;
  cycle_end_date: Date;
}
