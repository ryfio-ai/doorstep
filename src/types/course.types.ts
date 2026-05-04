// src/types/course.types.ts

export type CourseCategory = 'School Subjects' | 'Programming' | 'AI & ML' | 'Electronics' | 'Robotics' | 'IoT' | 'Spoken English' | 'Competitive Exams';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
  thumbnail_url?: string;
  curriculum?: any;
  is_active: boolean;
  created_at: string;
}

export interface CoursePlan {
  id: string;
  course_id: string;
  name: string; // e.g., Basic, Standard, Advanced
  duration_months: number;
  sessions_per_week: number;
  price: number;
  discount_price?: number;
  features: string[];
}
