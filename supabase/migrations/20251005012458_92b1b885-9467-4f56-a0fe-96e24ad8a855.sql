-- Adicionar campos de onboarding ao profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS desired_course TEXT,
ADD COLUMN IF NOT EXISTS target_university TEXT,
ADD COLUMN IF NOT EXISTS preparation_level TEXT CHECK (preparation_level IN ('zero', 'basico', 'intermediario')),
ADD COLUMN IF NOT EXISTS study_days_available INTEGER,
ADD COLUMN IF NOT EXISTS main_difficulty TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Criar tabela para tracking de uso diário
CREATE TABLE IF NOT EXISTS public.daily_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  questions_answered INTEGER DEFAULT 0,
  study_hours NUMERIC DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Criar tabela para tracking de modais mostrados
CREATE TABLE IF NOT EXISTS public.conversion_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL,
  shown_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clicked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_triggers ENABLE ROW LEVEL SECURITY;

-- RLS Policies para daily_usage
CREATE POLICY "Users can read own daily usage"
ON public.daily_usage FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily usage"
ON public.daily_usage FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily usage"
ON public.daily_usage FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies para conversion_triggers
CREATE POLICY "Users can read own conversion triggers"
ON public.conversion_triggers FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversion triggers"
ON public.conversion_triggers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Função para calcular streak
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
BEGIN
  -- Verificar se estudou hoje ou ontem
  IF NOT EXISTS (
    SELECT 1 FROM daily_usage 
    WHERE user_id = p_user_id 
    AND date >= CURRENT_DATE - INTERVAL '1 day'
  ) THEN
    RETURN 0;
  END IF;
  
  -- Contar dias consecutivos
  WHILE EXISTS (
    SELECT 1 FROM daily_usage 
    WHERE user_id = p_user_id 
    AND date = check_date
  ) LOOP
    current_streak := current_streak + 1;
    check_date := check_date - INTERVAL '1 day';
  END LOOP;
  
  RETURN current_streak;
END;
$$;