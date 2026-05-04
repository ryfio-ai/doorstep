// src/types/payment.types.ts

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  order_id: string; // Paytm Order ID
  student_id: string;
  enrollment_id?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method?: string;
  transaction_id?: string; // Paytm Txn ID
  created_at: string;
  updated_at: string;
}

export type PayoutStatus = 'pending' | 'processing' | 'paid' | 'failed';

export interface Payout {
  id: string;
  trainer_id: string;
  amount: number;
  period_start: string;
  period_end: string;
  status: PayoutStatus;
  transaction_ref?: string;
  created_at: string;
}
