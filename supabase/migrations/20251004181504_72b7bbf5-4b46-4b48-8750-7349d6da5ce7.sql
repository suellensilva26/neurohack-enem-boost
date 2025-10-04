-- Add RLS policies for user_roles table
CREATE POLICY "Users can read own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Add RLS policies for user_entitlements table  
CREATE POLICY "Users can read own entitlements" ON user_entitlements
  FOR SELECT USING (auth.uid() = user_id);

-- Add RLS policies for flashcards table
-- Allow reading flashcards for entitled users
CREATE POLICY "Entitled users can read flashcards" ON flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chunks ch
      JOIN lessons l ON l.id = ch.lesson_id
      JOIN chapters c ON c.id = l.chapter_id
      JOIN profiles p ON p.id = auth.uid()
      WHERE ch.id = flashcards.chunk_id
        AND (
          'full_access' = ANY(p.entitlements)
          OR c.ebook_id = ANY(p.entitlements)
        )
    )
  );