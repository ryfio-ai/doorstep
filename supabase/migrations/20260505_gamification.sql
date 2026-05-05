-- supabase/migrations/20260505_gamification.sql

-- STUDENT GAMIFICATION TABLE
CREATE TABLE IF NOT EXISTS public.student_gamification (
  student_id      UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  educoins        INTEGER DEFAULT 0,
  total_xp        INTEGER DEFAULT 0,
  level           INTEGER DEFAULT 1,
  streak_days     INTEGER DEFAULT 0,
  max_streak      INTEGER DEFAULT 0,
  last_activity   DATE,
  streak_shields  INTEGER DEFAULT 0,
  badges_earned   TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- EDUCOIN TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.educoin_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount          INTEGER NOT NULL,
  type            TEXT CHECK (type IN ('earn', 'spend')),
  reason          TEXT,
  reference_id    UUID,
  balance_after   INTEGER,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- BADGES TABLE
CREATE TABLE IF NOT EXISTS public.badges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  icon_url        TEXT,
  category        TEXT,
  rarity          TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  xp_reward       INTEGER DEFAULT 0,
  coin_reward     INTEGER DEFAULT 0,
  requirement     JSONB,
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- STUDENT BADGES TABLE
CREATE TABLE IF NOT EXISTS public.student_badges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id        UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

-- AI CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id      UUID REFERENCES public.users(id) ON DELETE CASCADE,
  messages        JSONB DEFAULT '[]',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE RLS
ALTER TABLE public.student_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educoin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Student Gamification: Students can read their own
CREATE POLICY "Students can view own gamification"
  ON public.student_gamification FOR SELECT
  USING (auth.uid() = student_id);

-- Educoin Transactions: Students can read their own
CREATE POLICY "Students can view own transactions"
  ON public.educoin_transactions FOR SELECT
  USING (auth.uid() = student_id);

-- Badges: Everyone can read
CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (true);

-- Student Badges: Students can read their own
CREATE POLICY "Students can view own badges"
  ON public.student_badges FOR SELECT
  USING (auth.uid() = student_id);

-- AI Conversations: Students can read and update their own
CREATE POLICY "Students can manage own ai conversations"
  ON public.ai_conversations FOR ALL
  USING (auth.uid() = student_id);

-- INITIAL BADGES SEED
INSERT INTO public.badges (code, name, description, category, rarity, xp_reward, coin_reward) VALUES
('first_class', 'First Class', 'Complete your first ever class', 'learning', 'common', 50, 20),
('course_starter', 'Course Starter', 'Enroll in your first course', 'learning', 'common', 30, 10),
('course_finisher', 'Course Finisher', 'Complete a full course', 'learning', 'epic', 500, 200),
('top_reviewer', 'Top Reviewer', 'Write 5 detailed reviews', 'performance', 'rare', 100, 50),
('perfect_attendance', 'Perfect Attendance', 'No cancellations for 30 days', 'performance', 'epic', 300, 150),
('ambassador', 'Ambassador', 'Refer 3 friends who enroll', 'community', 'legendary', 1000, 500);
