-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'free_user', 'full_access');

-- Profiles table with entitlements
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'free_user',
  UNIQUE(user_id, role)
);

-- Entitlements (purchased tabs)
CREATE TABLE public.user_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  entitlement TEXT NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, entitlement)
);

-- Ebooks table
CREATE TABLE public.ebooks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  premium BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Chapters table
CREATE TABLE public.chapters (
  id TEXT PRIMARY KEY,
  ebook_id TEXT REFERENCES public.ebooks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  ord INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lessons table
CREATE TABLE public.lessons (
  id TEXT PRIMARY KEY,
  chapter_id TEXT REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  video_short_url TEXT,
  ord INTEGER NOT NULL,
  est_read_min INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Chunks table (for embeddings)
CREATE TABLE public.chunks (
  id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  page_range TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Questions table
CREATE TABLE public.questions (
  id TEXT PRIMARY KEY,
  chunk_id TEXT REFERENCES public.chunks(id) ON DELETE CASCADE,
  qtype TEXT NOT NULL,
  prompt TEXT NOT NULL,
  alternatives JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT,
  tags TEXT[],
  priority BOOLEAN DEFAULT false,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Flashcards table
CREATE TABLE public.flashcards (
  id TEXT PRIMARY KEY,
  chunk_id TEXT REFERENCES public.chunks(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Purchases table
CREATE TABLE public.purchases (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'BRL',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User progress table
CREATE TABLE public.user_progress (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress',
  percent NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Quiz results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
  score NUMERIC NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Security definer function to check entitlements
CREATE OR REPLACE FUNCTION public.has_entitlement(_user_id UUID, _entitlement TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_entitlements
    WHERE user_id = _user_id AND entitlement = _entitlement
  )
$$;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'free_user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- Profiles: users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Ebooks: public can read all ebooks
CREATE POLICY "Anyone can read ebooks"
  ON public.ebooks FOR SELECT
  USING (true);

-- Chapters: public can read all chapters
CREATE POLICY "Anyone can read chapters"
  ON public.chapters FOR SELECT
  USING (true);

-- Lessons: only entitled users can read
CREATE POLICY "Entitled users can read lessons"
  ON public.lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chapters c
      WHERE c.id = lessons.chapter_id
      AND (
        public.has_role(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), c.ebook_id)
      )
    )
  );

-- Chunks: only entitled users can read
CREATE POLICY "Entitled users can read chunks"
  ON public.chunks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM public.lessons l
      JOIN public.chapters c ON c.id = l.chapter_id
      WHERE l.id = chunks.lesson_id
      AND (
        public.has_role(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), c.ebook_id)
      )
    )
  );

-- Questions: only entitled users can read
CREATE POLICY "Entitled users can read questions"
  ON public.questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM public.chunks ch
      JOIN public.lessons l ON l.id = ch.lesson_id
      JOIN public.chapters c ON c.id = l.chapter_id
      WHERE ch.id = questions.chunk_id
      AND (
        public.has_role(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), 'full_access')
        OR public.has_entitlement(auth.uid(), c.ebook_id)
      )
    )
  );

-- User progress: users can manage their own progress
CREATE POLICY "Users can read own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Quiz results: users can manage their own results
CREATE POLICY "Users can read own quiz results"
  ON public.quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON public.quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Purchases: users can read their own purchases
CREATE POLICY "Users can read own purchases"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Insert seed data for ebooks
INSERT INTO public.ebooks (id, title, description, price, premium) VALUES
('redacao', 'Redação Nota 1000', 'Fórmula coringa para qualquer tema + repertórios versáteis', 149, true),
('revisao', 'Kit Revisão Express', '240 tópicos essenciais que cobrem 85% das questões', 119, true),
('estrategias', 'Estratégias Secretas', 'Técnicas de chute estratégico para acertar sem saber', 89, true),
('aprendizado', 'Aprendizado Acelerado', 'Absorva em 1 hora o que outros levam 10', 99, true),
('padroes', 'Padrões do ENEM', 'Acerte 40% a mais identificando padrões recorrentes', 129, true),
('banco-questoes', '100 Questões Recorrentes', 'Banco completo com gabarito e explicações detalhadas', 79, true);