-- supabase/migrations/20260506_safety_and_progress.sql

-- EXTEND CLASS SESSIONS FOR SAFETY
ALTER TABLE public.class_sessions ADD COLUMN IF NOT EXISTS verification_code TEXT;
ALTER TABLE public.class_sessions ADD COLUMN IF NOT EXISTS actual_start_at TIMESTAMPTZ;
ALTER TABLE public.class_sessions ADD COLUMN IF NOT EXISTS start_location GEOGRAPHY(POINT);
ALTER TABLE public.class_sessions ADD COLUMN IF NOT EXISTS trainer_selfie_url TEXT;
ALTER TABLE public.class_sessions ADD COLUMN IF NOT EXISTS safety_status TEXT DEFAULT 'normal' CHECK (safety_status IN ('normal', 'alert', 'emergency'));

-- SAFETY ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.safety_alerts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id      UUID REFERENCES public.class_sessions(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.users(id),
  type            TEXT CHECK (type IN ('sos', 'late_start', 'location_mismatch')),
  location        GEOGRAPHY(POINT),
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved')),
  resolved_by     UUID REFERENCES public.users(id),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TRAINER VERIFICATION STATUS
ALTER TABLE public.trainer_profiles ADD COLUMN IF NOT EXISTS id_verified BOOLEAN DEFAULT false;
ALTER TABLE public.trainer_profiles ADD COLUMN IF NOT EXISTS education_verified BOOLEAN DEFAULT false;
ALTER TABLE public.trainer_profiles ADD COLUMN IF NOT EXISTS background_checked BOOLEAN DEFAULT false;
ALTER TABLE public.trainer_profiles ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- SKILL TREE / TOPICS
CREATE TABLE IF NOT EXISTS public.course_topics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id       UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  order_index     INTEGER NOT NULL,
  parent_topic_id UUID REFERENCES public.course_topics(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- STUDENT TOPIC PROGRESS
CREATE TABLE IF NOT EXISTS public.student_topic_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  topic_id        UUID REFERENCES public.course_topics(id) ON DELETE CASCADE,
  status          TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed', 'mastered')),
  completed_at    TIMESTAMPTZ,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, topic_id)
);

-- ENABLE RLS
ALTER TABLE public.safety_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_topic_progress ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Students and trainers can view alerts for their sessions"
  ON public.safety_alerts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.class_sessions cs
      JOIN public.enrollments e ON cs.enrollment_id = e.id
      WHERE cs.id = safety_alerts.session_id
      AND (e.student_id = auth.uid() OR e.trainer_id = auth.uid())
    )
  );

CREATE POLICY "Anyone can view course topics"
  ON public.course_topics FOR SELECT
  USING (true);

CREATE POLICY "Students can manage own topic progress"
  ON public.student_topic_progress FOR ALL
  USING (auth.uid() = student_id);
