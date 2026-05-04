// src/types/coupon.types.ts

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  max_discount?: number;
  min_purchase?: number;
  valid_from: string;
  valid_until: string;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referee_id: string;
  status: 'pending' | 'successful';
  reward_amount: number;
  created_at: string;
}
