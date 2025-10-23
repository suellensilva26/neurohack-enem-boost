import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import * as logger from "@/utils/logger";

interface FlashcardCreatorProps {
  onCardCreated?: () => void;
  source?: string;
}

export const FlashcardCreator = ({ onCardCreated, source }: FlashcardCreatorProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveFlashcard = async () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Preencha a pergunta e a resposta");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

      const { error } = await supabase
        .from('user_flashcards')
        .insert({
          user_id: user.id,
          question,
          answer,
          source,
          tags: tagsArray,
          next_review_at: new Date(Date.now() + 86400000).toISOString() // +1 day
        });

      if (error) throw error;

      toast.success("Flashcard criado com sucesso!");
      setQuestion("");
      setAnswer("");
      setTags("");
      onCardCreated?.();
    } catch (error) {
      toast.error("Erro ao salvar flashcard");
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setQuestion("");
    setAnswer("");
    setTags("");
  };

  return (
    <div className="space-y-4 p-6 rounded-2xl border border-border bg-card/50">
      <h3 className="text-lg font-semibold">Criar Flashcard</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Pergunta</label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="O que você quer lembrar?"
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Resposta</label>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="A resposta ou explicação..."
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Tags (separadas por vírgula)</label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="matemática, geometria, área"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={saveFlashcard} 
          disabled={isLoading}
          className="flex-1 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Salvar Flashcard
        </Button>
        <Button 
          onClick={clear} 
          variant="outline"
          className="rounded-xl"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};