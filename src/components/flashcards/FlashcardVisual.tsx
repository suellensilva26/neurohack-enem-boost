import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FlashcardVisualProps {
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  hint?: string; // dica
  onReveal?: () => void;
}

export const FlashcardVisual = ({ question, answer, difficulty, hint, onReveal }: FlashcardVisualProps) => {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const difficultyVariant = difficulty === 'easy' ? 'default' : difficulty === 'medium' ? 'secondary' : 'destructive';

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        {difficulty && (
          <Badge variant={difficultyVariant}>
            {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
          </Badge>
        )}
      </div>
      <Card className="perspective-[1000px] min-h-[200px]">
        <CardContent className="p-6">
          {!flipped ? (
            <div className="space-y-4 text-center">
              <div className="min-h-[80px] flex items-center justify-center">
                <h3 className="text-lg font-semibold">{question}</h3>
              </div>
              <Button onClick={() => { setFlipped(true); onReveal?.(); }}>Ver Resposta</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <p className="font-medium text-primary">{answer}</p>
              </div>
              {difficulty && (
                <div className="flex justify-center">
                  <Badge variant={difficultyVariant}>
                    Dificuldade: {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
                  </Badge>
                </div>
              )}
              {hint && (
                <div className="flex justify-center">
                  <Button size="sm" variant="outline" onClick={() => setShowHint((s) => !s)}>
                    {showHint ? 'Ocultar Dica' : 'Ver Dica'}
                  </Button>
                </div>
              )}
              {hint && showHint && (
                <div className="p-3 rounded-lg border text-sm bg-card/50">
                  <span className="font-semibold">Dica:</span> {hint}
                </div>
              )}
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => setFlipped(false)}>Voltar</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};