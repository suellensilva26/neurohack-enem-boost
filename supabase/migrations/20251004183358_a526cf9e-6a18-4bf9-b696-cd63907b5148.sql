-- Create table for neuro prep sessions
CREATE TABLE IF NOT EXISTS public.neuro_prep_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  objective TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Feynman recordings
CREATE TABLE IF NOT EXISTS public.feynman_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_url TEXT,
  transcript TEXT,
  duration_seconds INTEGER,
  engagements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for user flashcards
CREATE TABLE IF NOT EXISTS public.user_flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  source TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  review_count INTEGER DEFAULT 0,
  next_review_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for dual coding content
CREATE TABLE IF NOT EXISTS public.dual_coding_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('cartao', 'storyboard', 'diagrama')),
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  image_url TEXT,
  subject TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for error tracking
CREATE TABLE IF NOT EXISTS public.error_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  error_type TEXT NOT NULL,
  frequency INTEGER DEFAULT 1,
  strategy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for generated content
CREATE TABLE IF NOT EXISTS public.generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('exemplo', 'questao', 'analogia')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for protocol 60=10 sessions
CREATE TABLE IF NOT EXISTS public.protocol_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_duration_seconds INTEGER NOT NULL,
  phases_completed JSONB NOT NULL,
  efficiency_score NUMERIC(5,2),
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.neuro_prep_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feynman_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dual_coding_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own data
CREATE POLICY "Users can read own neuro prep sessions" ON public.neuro_prep_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own neuro prep sessions" ON public.neuro_prep_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own feynman recordings" ON public.feynman_recordings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feynman recordings" ON public.feynman_recordings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feynman recordings" ON public.feynman_recordings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own flashcards" ON public.user_flashcards
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own flashcards" ON public.user_flashcards
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own flashcards" ON public.user_flashcards
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own flashcards" ON public.user_flashcards
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own dual coding content" ON public.dual_coding_content
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dual coding content" ON public.dual_coding_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dual coding content" ON public.dual_coding_content
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dual coding content" ON public.dual_coding_content
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own error tracking" ON public.error_tracking
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own error tracking" ON public.error_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own error tracking" ON public.error_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own generated content" ON public.generated_content
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own generated content" ON public.generated_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own protocol sessions" ON public.protocol_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own protocol sessions" ON public.protocol_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);