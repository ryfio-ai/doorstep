// src/types/enrollment.types.ts

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled' | 'paused';

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  plan_id: string;
  trainer_id: string;
  status: EnrollmentStatus;
  start_date: string;
  end_date?: string;
  total_sessions: number;
  completed_sessions: number;
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
}
