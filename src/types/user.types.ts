// src/types/user.types.ts

export type Role = 'student' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phone_verified: boolean;
  role: Role;
  city: string | null;
  locality: string | null;
  photo_url: string | null;
  is_active: boolean;
  onboarding_complete: boolean;
  created_at: string;
}

export interface StudentProfile extends User {
  parent_name: string | null;
  grade: string | null;
  interests: string[];
  is_parent: boolean;
  referral_code: string;
  wallet_balance: number;
  children_count: number;
}

export interface TrainerProfile extends User {
  bio: string | null;
  expertise: string[];
  localities: string[];
  verified: boolean;
  suspended: boolean;
  rating: number;
  total_reviews: number;
  pending_payout: number;
  onboarding_step: number;
}

export interface ChildProfile {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  grade: string;
  school_name?: string;
  photo_url?: string;
  interests: string[];
  is_active: boolean;
  created_at: string;
}
