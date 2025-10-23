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

export const PadroesPortugues = ({ onUpdate }: Props) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const patterns = [
    {
      id: "port-interpretacao",
      title: "Interpretação Literal",
      percentage: "40%",
      description: "Pergunta algo que está explicitamente escrito no texto",
      signals: ["Segundo o texto...", "O autor afirma que...", "De acordo com o texto..."],
      strategy: "A resposta sempre será uma paráfrase (mesma ideia com palavras diferentes) de um trecho específico"
    },
    {
      id: "port-inferencia",
      title: "Inferência Simples",
      percentage: "35%",
      description: "Deduzir algo que não está escrito, mas está implícito",
      signals: ["É possível inferir que...", "O texto sugere que...", "Depreende-se que..."],
      strategy: "1. Encontre o trecho relacionado\n2. Pense: 'Se isso é verdade, o que mais pode ser?'\n3. Elimine contradições\n4. Escolha a alternativa mais conservadora"
    },
    {
      id: "port-funcao",
      title: "Função do Texto",
      percentage: "15%",
      description: "Qual o objetivo do texto ou de um trecho específico",
      signals: ["O texto tem como objetivo...", "A função do trecho é...", "O autor pretende..."],
      strategy: "Funções mais cobradas:\n• Informar/explicar (jornalístico/científico)\n• Persuadir/convencer (publicitário/opinião)\n• Entreter (crônicas/contos)\n• Instruir (manuais/receitas)"
    },
    {
      id: "port-recursos",
      title: "Recursos Expressivos",
      percentage: "10%",
      description: "Efeito de uma figura de linguagem, palavra ou construção sintática",
      signals: ["O uso de...", "O recurso empregado...", "A expressão contribui para..."],
      strategy: "Efeitos mais cobrados:\n• Metáfora/comparação → criar imagem mental\n• Repetição → dar ênfase\n• Pergunta retórica → provocar reflexão\n• Ironia → criticar indiretamente"
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
          module: 'portugues',
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
        title: isCompleted ? "Padrão dominado! 🎯" : "Marcado para revisar"
      });
    } catch (error) {
      console.error("Error:", error);
+     toast({
+       title: "Erro ao salvar",
+       description: "Tente novamente em instantes.",
+       variant: "destructive",
+     });
    }
  };

  const saveNotes = async (patternId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('pattern_progress')
        .upsert({
          user_id: user.id,
          pattern_id: patternId,
          module: 'portugues',
          notes: notes[patternId],
          last_studied_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,pattern_id'
        });

      toast({ title: "Anotações salvas! 📝" });
    } catch (error) {
      console.error("Error:", error);
+     toast({
+       title: "Erro ao salvar anotações",
+       description: "Verifique sua conexão e tente novamente.",
+       variant: "destructive",
+     });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
            <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            4 Padrões de Português que Nunca Mudam
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            89% das questões de Linguagens seguem apenas estes 4 tipos de raciocínio
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
                Sinais de reconhecimento:
              </h4>
              <div className="space-y-1">
                {pattern.signals.map((signal, idx) => (
                  <div key={idx} className="bg-muted p-2 rounded text-[10px] md:text-xs">
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-2">Estratégia:</h4>
              <pre className="bg-muted p-2 md:p-3 rounded text-[10px] md:text-xs whitespace-pre-wrap">
                {pattern.strategy}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-xs md:text-sm mb-2">Suas Anotações:</h4>
              <Textarea
                placeholder="Anote exemplos, dicas ou observações..."
                value={notes[pattern.id] || ""}
                onChange={(e) => setNotes(prev => ({ ...prev, [pattern.id]: e.target.value }))}
                className="min-h-[80px] text-xs md:text-sm"
              />
              <Button onClick={() => saveNotes(pattern.id)} size="sm" className="mt-2">
                Salvar Anotações
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
