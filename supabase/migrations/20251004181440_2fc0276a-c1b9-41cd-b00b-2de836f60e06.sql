-- Create policy to allow reading priority questions (simulado preview)
DROP POLICY IF EXISTS "Anyone can read priority questions" ON questions;

CREATE POLICY "Anyone can read priority questions" ON questions
  FOR SELECT USING (priority = true);

-- Update policy for regular questions to still require entitlements
DROP POLICY IF EXISTS "Entitled users can read questions" ON questions;

CREATE POLICY "Entitled users can read non-priority questions" ON questions
  FOR SELECT USING (
    priority = false AND
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

-- Allow authenticated users to insert quiz results
DROP POLICY IF EXISTS "Users can insert own quiz results" ON quiz_results;

CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own quiz results
DROP POLICY IF EXISTS "Users can read own quiz results" ON quiz_results;

CREATE POLICY "Users can read own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);