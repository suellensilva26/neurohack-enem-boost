-- Add entitlements column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS entitlements text[] DEFAULT '{}';

-- Create purchases table if not exists
CREATE TABLE IF NOT EXISTS purchases (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'BRL',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Update RLS policy for lessons to check entitlements
DROP POLICY IF EXISTS "Entitled users can read lessons" ON lessons;

CREATE POLICY "Entitled users can read lessons" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chapters c
      JOIN profiles p ON p.id = auth.uid()
      WHERE c.id = lessons.chapter_id
        AND (
          'full_access' = ANY(p.entitlements)
          OR c.ebook_id = ANY(p.entitlements)
        )
    )
  );

-- Update RLS policy for chunks
DROP POLICY IF EXISTS "Entitled users can read chunks" ON chunks;

CREATE POLICY "Entitled users can read chunks" ON chunks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN chapters c ON c.id = l.chapter_id
      JOIN profiles p ON p.id = auth.uid()
      WHERE l.id = chunks.lesson_id
        AND (
          'full_access' = ANY(p.entitlements)
          OR c.ebook_id = ANY(p.entitlements)
        )
    )
  );

-- Update RLS policy for questions
DROP POLICY IF EXISTS "Entitled users can read questions" ON questions;

CREATE POLICY "Entitled users can read questions" ON questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chunks ch
      JOIN lessons l ON l.id = ch.lesson_id
      JOIN chapters c ON c.id = l.chapter_id
      JOIN profiles p ON p.id = auth.uid()
      WHERE ch.id = questions.chunk_id
        AND (
          'full_access' = ANY(p.entitlements)
          OR c.ebook_id = ANY(p.entitlements)
        )
    )
  );