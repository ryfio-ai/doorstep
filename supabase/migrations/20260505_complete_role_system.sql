-- ============================================================
-- EDUDOOR COMPLETE ROLE SYSTEM MIGRATION
-- ============================================================

-- 1. UPDATE USERS TABLE
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS locality TEXT,
  ADD COLUMN IF NOT EXISTS photo_url TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false;

-- 2. UPDATE STUDENT PROFILES
ALTER TABLE public.student_profiles
  ADD COLUMN IF NOT EXISTS is_parent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS children_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS wallet_balance DECIMAL DEFAULT 0;

-- 3. UPDATE TRAINER PROFILES
ALTER TABLE public.trainer_profiles
  ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS suspended BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS pending_payout DECIMAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0;

-- 4. CREATE CHILD PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.child_profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id     UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  age           INTEGER,
  grade         TEXT,
  school_name   TEXT,
  photo_url     TEXT,
  interests     TEXT[] DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CREATE ADMIN LOGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id      UUID REFERENCES public.users(id),
  action_type   TEXT NOT NULL,
  entity_type   TEXT,
  entity_id     UUID,
  description   TEXT,
  old_data      JSONB,
  new_data      JSONB,
  ip_address    TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENABLE RLS
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- 7. HELPER FUNCTIONS

-- Function: Check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Function: Check if trainer is verified
CREATE OR REPLACE FUNCTION is_verified_trainer(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trainer_profiles
    WHERE user_id = user_id
      AND verified = true
      AND suspended = false
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 8. POLICIES

-- Child Profiles
CREATE POLICY "parent_own_children"
  ON public.child_profiles FOR ALL
  USING (parent_id = auth.uid() OR is_admin());

-- Admin Logs
CREATE POLICY "admin_only_logs"
  ON public.admin_logs FOR ALL
  USING (is_admin());

-- Update existing policies to include is_admin() check
-- (Assuming tables already have some policies, otherwise we'd create them)

-- 9. ADMIN ACTION LOGGING FUNCTION
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action_type TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_description TEXT,
  p_old_data JSONB DEFAULT NULL,
  p_new_data JSONB DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO public.admin_logs (
    admin_id, action_type, entity_type,
    entity_id, description, old_data, new_data
  ) VALUES (
    auth.uid(), p_action_type, p_entity_type,
    p_entity_id, p_description, p_old_data, p_new_data
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
