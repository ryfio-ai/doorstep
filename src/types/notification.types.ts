// src/types/notification.types.ts

export type NotificationType = 'demo_booked' | 'class_reminder' | 'payment_success' | 'payment_failed' | 'assignment' | 'general';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  link?: string;
  created_at: string;
}
