import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, BookOpen, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onUpdate: () => void;
}

export const PadroesMatematica = ({ onUpdate }: Props) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const patterns = [
    {
      id: "mat-proporcionalidade",
      title: "Proporcionalidade Disfarçada",
      percentage: "35%",
      description: "Esconde regra de três, porcentagem e escalas em contextos do cotidiano",
      keywords: ["razão", "proporção", "taxa", "cada", "para cada"],
      template: "1. Identifique as duas grandezas\n2. Monte a proporção: a/b = c/x\n3. Resolva: x = (b × c)/a\n4. Verifique o resultado"
    },
    {
      id: "mat-estatistica",
      title: "Estatística",
      percentage: "18%",
      description: "Dados em gráficos/tabelas com interpretação de média, mediana, moda ou tendências",
      keywords: ["média", "metade", "maioria", "concentração"],
      template: "90% das questões podem ser resolvidas apenas lendo o gráfico, sem cálculos complexos"
    },
    {
      id: "mat-geometria",
      title: "Geometria Aplicada",
      percentage: "22%",
      description: "Cálculos de área, volume e perímetro em situações práticas",
      keywords: ["terreno", "parede", "piscina", "caixa", "embalagem"],
      template: "Fórmulas essenciais:\n• Área retângulo: A = base × altura\n• Área círculo: A = π × r²\n• Volume cilindro: V = π × r² × h"
    },
    {
      id: "mat-funcao",
      title: "Função Disfarçada",
      percentage: "12%",
      description: "Situações onde uma grandeza depende de outra",
      keywords: ["depende de", "em função de", "varia com"],
      template: "Template universal:\n• Linear: f(x) = ax + b\n• Quadrática: f(x) = ax² + bx + c"
    },
    {
      id: "mat-probabilidade",
      title: "Probabilidade Contextualizada",
      percentage: "8%",
      description: "Cálculos de probabilidade em sorteios, jogos e pesquisas",
      keywords: ["chance", "sorteio", "possibilidade", "aleatório"],
      template: "Fórmula única:\nP = casos favoráveis / casos possíveis"
    }
  ];

  const markComplete = async (patternId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado",
          variant: "destructive"
        });
        return;
      }

      const isCompleted = !completed[patternId];
      
      const { error } = await supabase
        .from('pattern_progress')
        .upsert({
          user_id: user.id,
          pattern_id: patternId,
          module: 'matematica',
          completed: isCompleted,
          notes: notes[patternId] || null,
          last_studied_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,pattern_id'
        });

      if (error) throw error;

      setCompleted(prev => ({ ...prev, [patternId]: isCompleted }));
      onUpdate();
      
      toast({
        title: isCompleted ? "Padrão dominado! 🎯" : "Marcado para revisar",
        description: isCompleted ? "Continue assim!" : "Volte quando quiser"
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro ao salvar",
        variant: "destructive"
      });
    }
  };

  const saveNotes = async (patternId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('pattern_progress')
        .upsert({
          user_id: user.id,
          pattern_id: patternId,
          module: 'matematica',
          notes: notes[patternId],
          last_studied_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,pattern_id'
        });

      if (error) throw error;

      toast({
        title: "Anotações salvas! 📝"
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
            <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            5 Padrões Matemáticos que Dominam o ENEM
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            82% de todas as questões de Matemática seguem apenas estes 5 padrões
          </CardDescription>
        </CardHeader>
      </Card>

      {patterns.map((pattern) => (
        <Card key={pattern.id} className="card-premium">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold text-sm md:text-base">{pattern.percentage}</span>
                  <CardTitle className="text-base md:text-xl">{pattern.title}</CardTitle>
                </div>
                <CardDescription className="text-xs md:text-sm">{pattern.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => markComplete(pattern.id)}
                className="flex-shrink-0"
              >
                {completed[pattern.id] ? (
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 md:h-6 md:w-6" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-2 flex items-center gap-2">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                Palavras-chave para identificar:
              </h4>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {pattern.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] md:text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-2">Template de Resolução:</h4>
              <pre className="bg-muted p-2 md:p-3 rounded text-[10px] md:text-xs whitespace-pre-wrap">
                {pattern.template}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-2">Suas Anotações:</h4>
              <Textarea
                placeholder="Anote suas próprias observações, exemplos ou dicas..."
                value={notes[pattern.id] || ""}
                onChange={(e) => setNotes(prev => ({ ...prev, [pattern.id]: e.target.value }))}
                className="min-h-[80px] text-xs md:text-sm"
              />
              <Button
                onClick={() => saveNotes(pattern.id)}
                size="sm"
                className="mt-2"
              >
                Salvar Anotações
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
