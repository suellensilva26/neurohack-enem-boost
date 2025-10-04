-- Create table for tracking pattern study progress
CREATE TABLE IF NOT EXISTS public.pattern_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  pattern_id text NOT NULL,
  module text NOT NULL,
  completed boolean DEFAULT false,
  notes text,
  exercises_completed integer DEFAULT 0,
  last_studied_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, pattern_id)
);

-- Enable RLS
ALTER TABLE public.pattern_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own pattern progress"
  ON public.pattern_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pattern progress"
  ON public.pattern_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pattern progress"
  ON public.pattern_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create table for pattern notes and insights
CREATE TABLE IF NOT EXISTS public.pattern_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  pattern_id text NOT NULL,
  insight_type text NOT NULL, -- 'note', 'example', 'mistake', 'tip'
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pattern_insights ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own pattern insights"
  ON public.pattern_insights
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pattern insights"
  ON public.pattern_insights
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pattern insights"
  ON public.pattern_insights
  FOR DELETE
  USING (auth.uid() = user_id);