// src/types/material.types.ts

export type MaterialType = 'pdf' | 'video' | 'link' | 'document';

export interface StudyMaterial {
  id: string;
  course_id: string;
  trainer_id: string;
  title: string;
  description?: string;
  type: MaterialType;
  file_url: string;
  created_at: string;
}
