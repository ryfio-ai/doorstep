// src/types/rating.types.ts

export interface Rating {
  id: string;
  session_id: string;
  trainer_id: string;
  student_id: string;
  rating: number; // 1 to 5
  review_text?: string;
  created_at: string;
}
