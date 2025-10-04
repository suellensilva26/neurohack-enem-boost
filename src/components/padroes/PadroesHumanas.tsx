import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Clock, MapPin, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onUpdate: () => void;
}

export const PadroesHumanas = ({ onUpdate }: Props) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const sections = [
    {
      area: "História",
      icon: Clock,
      patterns: [
        {
          id: "hist-republica",
          title: "Brasil República",
          percentage: "40%",
          topics: [
            "Era Vargas (1930-1945): autoritarismo, trabalhismo",
            "Ditadura Militar (1964-1985): repressão, resistência",
            "Redemocratização (1985-1988): Constituição, direitos"
          ]
        },
        {
          id: "hist-imperio",
          title: "Brasil Império e Colônia",
          percentage: "35%",
          topics: [
            "Sistema colonial: exploração, escravidão",
            "Independência: processo, consequências",
            "Império: centralização, abolição"
          ]
        },
        {
          id: "hist-geral",
          title: "História Geral Conectada",
          percentage: "25%",
          topics: [
            "Revoluções Industrial e Francesa",
            "Primeira e Segunda Guerra Mundial",
            "Guerra Fria: contexto brasileiro"
          ]
        }
      ]
    },
    {
      area: "Geografia",
      icon: MapPin,
      patterns: [
        {
          id: "geo-urbano",
          title: "Brasil Urbano e Industrial",
          percentage: "30%",
          topics: [
            "Urbanização acelerada, migração interna",
            "Regiões metropolitanas, favelas, desemprego"
          ]
        },
        {
          id: "geo-ambiente",
          title: "Questões Ambientais",
          percentage: "25%",
          topics: [
            "Aquecimento global, desmatamento",
            "Recursos hídricos, energia"
          ]
        },
        {
          id: "geo-agricultura",
          title: "Agricultura e Território",
          percentage: "25%",
          topics: [
            "Agronegócio, reforma agrária, MST",
            "Concentração fundiária"
          ]
        },
        {
          id: "geo-globalizacao",
          title: "Globalização e Economia",
          percentage: "20%",
          topics: [
            "Blocos econômicos, comércio internacional",
            "Desigualdades regionais"
          ]
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
          module: 'humanas',
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
          module: 'humanas',
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
            Super-Temas de Humanas que Nunca Saem
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Os temas essenciais de História e Geografia
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
                  <div className="space-y-1">
                    {pattern.topics.map((topic, idx) => (
                      <div key={idx} className="bg-muted p-2 rounded text-[10px] md:text-xs">
                        • {topic}
                      </div>
                    ))}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Suas conexões, exemplos e anotações..."
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
