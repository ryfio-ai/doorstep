// src/types/user.types.ts

export type Role = 'student' | 'trainer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  full_name: string;
  phone_number?: string;
  avatar_url?: string;
  is_verified?: boolean;
  created_at?: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  grade?: string;
  school_board?: string;
  address?: string;
  parent_name?: string;
  parent_phone?: string;
}

export interface TrainerProfile {
  id: string;
  user_id: string;
  bio?: string;
  experience_years?: number;
  qualifications?: string[];
  subjects?: string[];
  localities?: string[];
  hourly_rate?: number;
  rating?: number;
  is_active?: boolean;
  documents?: { title: string; url: string }[];
}
