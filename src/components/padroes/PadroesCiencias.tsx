import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Zap, Atom, Dna, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onUpdate: () => void;
}

export const PadroesCiencias = ({ onUpdate }: Props) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const sections = [
    {
      area: "Física",
      icon: Zap,
      patterns: [
        {
          id: "fis-energia",
          title: "Conservação de Energia",
          percentage: "25%",
          description: "Energia não se cria nem se destrói, apenas se transforma",
          formula: "Energia inicial = Energia final",
          contexts: "Movimento, calor, eletricidade"
        },
        {
          id: "fis-newton",
          title: "Leis de Newton Aplicadas",
          percentage: "20%",
          description: "Força = massa × aceleração",
          formula: "F = m × a",
          contexts: "Carros, elevadores, rampas, quedas"
        },
        {
          id: "fis-ondas",
          title: "Ondas e Fenômenos",
          percentage: "15%",
          description: "Som, luz, radiações",
          formula: "v = λ × f (velocidade = comprimento × frequência)",
          contexts: "Comunicação, energia, medicina"
        }
      ]
    },
    {
      area: "Química",
      icon: Atom,
      patterns: [
        {
          id: "qui-reacoes",
          title: "Transformações e Reações",
          percentage: "30%",
          description: "Balanceamento, produtos e reagentes",
          formula: "Reagentes → Produtos",
          contexts: "Combustão, respiração, digestão, poluição"
        },
        {
          id: "qui-tabela",
          title: "Estrutura Atômica e Tabela Periódica",
          percentage: "25%",
          description: "Propriedades periódicas, configurações eletrônicas",
          formula: "Relacionado com comportamento químico",
          contexts: "Ligações químicas, reatividade"
        },
        {
          id: "qui-solucoes",
          title: "Soluções e Concentrações",
          percentage: "20%",
          description: "pH, densidade, solubilidade",
          formula: "Concentração = massa/volume",
          contexts: "Remédios, produtos de limpeza, agricultura"
        }
      ]
    },
    {
      area: "Biologia",
      icon: Dna,
      patterns: [
        {
          id: "bio-ecologia",
          title: "Ecologia e Meio Ambiente",
          percentage: "30%",
          description: "Cadeias alimentares, ciclos biogeoquímicos",
          formula: "Fluxo de energia e matéria",
          contexts: "Aquecimento global, desmatamento, poluição"
        },
        {
          id: "bio-genetica",
          title: "Genética e Hereditariedade",
          percentage: "25%",
          description: "Leis de Mendel, DNA, RNA",
          formula: "Transmissão de características",
          contexts: "Doenças genéticas, melhoramento, biotecnologia"
        },
        {
          id: "bio-fisiologia",
          title: "Fisiologia Humana",
          percentage: "20%",
          description: "Sistemas cardiovascular, respiratório, nervoso",
          formula: "Funcionamento do corpo",
          contexts: "Saúde, doenças, exercícios"
        },
        {
          id: "bio-evolucao",
          title: "Evolução e Origem da Vida",
          percentage: "15%",
          description: "Seleção natural, especiação",
          formula: "Adaptação ao ambiente",
          contexts: "Fósseis, diversidade, adaptações"
        }
      ]
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
          module: 'ciencias',
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
          module: 'ciencias',
          notes: notes[patternId],
          last_studied_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,pattern_id'
        });

      toast({ title: "Anotações salvas! 📝" });
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
            Super-Padrões de Ciências da Natureza
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Os conceitos essenciais de Física, Química e Biologia
          </CardDescription>
        </CardHeader>
      </Card>

      {sections.map((section) => {
        const AreaIcon = section.icon;
        return (
          <div key={section.area} className="space-y-3 md:space-y-4">
            <Card className="card-premium bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <AreaIcon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  {section.area}
                </CardTitle>
              </CardHeader>
            </Card>

            {section.patterns.map((pattern) => (
              <Card key={pattern.id} className="card-premium ml-0 md:ml-4">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-bold text-xs md:text-sm">{pattern.percentage}</span>
                        <CardTitle className="text-sm md:text-base">{pattern.title}</CardTitle>
                      </div>
                      <CardDescription className="text-[10px] md:text-xs">{pattern.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => markComplete(pattern.id)}
                      className="flex-shrink-0"
                    >
                      {completed[pattern.id] ? (
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-3">
                  <div className="bg-muted p-2 rounded">
                    <p className="font-semibold text-[10px] md:text-xs mb-1">Fórmula/Conceito:</p>
                    <p className="text-[10px] md:text-xs">{pattern.formula}</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-semibold text-[10px] md:text-xs mb-1">Contextos:</p>
                    <p className="text-[10px] md:text-xs">{pattern.contexts}</p>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Suas anotações..."
                      value={notes[pattern.id] || ""}
                      onChange={(e) => setNotes(prev => ({ ...prev, [pattern.id]: e.target.value }))}
                      className="min-h-[60px] text-[10px] md:text-xs"
                    />
                    <Button onClick={() => saveNotes(pattern.id)} size="sm" className="mt-2">
                      Salvar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
};
