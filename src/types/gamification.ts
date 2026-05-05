// src/types/gamification.ts

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  icon_url?: string;
  category: string;
  rarity: BadgeRarity;
  xp_reward: number;
  coin_reward: number;
  requirement?: any;
  active: boolean;
}

export interface StudentGamification {
  student_id: string;
  educoins: number;
  total_xp: number;
  level: number;
  streak_days: number;
  max_streak: number;
  last_activity: string;
  streak_shields: number;
  badges_earned: string[];
  created_at: string;
  updated_at: string;
}

export interface EducoinTransaction {
  id: string;
  student_id: string;
  amount: number;
  type: 'earn' | 'spend';
  reason: string;
  reference_id?: string;
  balance_after: number;
  expires_at?: string;
  created_at: string;
}

export interface AIConversation {
  id: string;
  student_id: string;
  messages: AIMessage[];
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}
