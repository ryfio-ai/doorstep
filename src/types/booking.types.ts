// src/types/booking.types.ts

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface DemoBooking {
  id: string;
  student_id: string;
  course_id: string;
  trainer_id?: string;
  scheduled_at: string;
  status: BookingStatus;
  address?: string;
  notes?: string;
  created_at: string;
}

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'absent';

export interface ClassSession {
  id: string;
  enrollment_id: string;
  trainer_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: SessionStatus;
  topics_covered?: string;
  trainer_notes?: string;
}
