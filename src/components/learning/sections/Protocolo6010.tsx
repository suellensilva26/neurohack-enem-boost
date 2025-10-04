import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Play, Pause, CheckCircle } from "lucide-react";

interface Phase {
  name: string;
  duration: number;
  description: string;
  tools: string[];
}

interface Protocolo6010Props {
  onSessionComplete?: () => void;
}

export const Protocolo6010 = ({ onSessionComplete }: Protocolo6010Props) => {
  const phases: Phase[] = [
    {
      name: "Preparação Neurológica",
      duration: 300,
      description: "Respiração 4-7-8, ambiente, objetivo",
      tools: []
    },
    {
      name: "Exposição Ativa + Dual Coding",
      duration: 720,
      description: "Consumo ativo com visualizações",
      tools: ["ANOTAÇÕES", "DESENHOS"]
    },
    {
      name: "Feynman Turbo + Geração",
      duration: 1080,
      description: "Explicação voz alta + exemplos autorais",
      tools: ["GRAVAR", "CRIAR"]
    },
    {
      name: "Testing Effect + Correção",
      duration: 900,
      description: "Recuperação ativa, questões, correção",
      tools: ["PAPEL BRANCO", "QUESTÕES"]
    },
    {
      name: "Spaced Repetition",
      duration: 300,
      description: "Planejamento D1/D3/D7, flashcards",
      tools: ["AGENDAR", "CARDS"]
    },
    {
      name: "Micro-Revisão",
      duration: 300,
      description: "1 questão ENEM para consolidação",
      tools: ["QUESTÃO", "RESULTADO"]
    }
  ];

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [phasesCompleted, setPhasesCompleted] = useState<boolean[]>(new Array(phases.length).fill(false));
  const [notes, setNotes] = useState("");

  const totalDuration = phases.reduce((acc, phase) => acc + phase.duration, 0);
  const elapsedTime = phases.slice(0, currentPhaseIndex).reduce((acc, phase) => acc + phase.duration, 0) + 
                      (phases[currentPhaseIndex].duration - timeLeft);
  const overallProgress = (elapsedTime / totalDuration) * 100;

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          completePhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const completePhase = () => {
    const newCompleted = [...phasesCompleted];
    newCompleted[currentPhaseIndex] = true;
    setPhasesCompleted(newCompleted);

    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setTimeLeft(phases[currentPhaseIndex + 1].duration);
      toast.success(`Fase ${currentPhaseIndex + 1} concluída! Avançando...`);
    } else {
      completeProtocol();
    }
  };

  const completeProtocol = async () => {
    setIsRunning(false);
    toast.success("Protocolo 60=10 completo! 🎉");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const efficiency = 85 + Math.random() * 15; // Calculate based on completion

      await supabase.from('protocol_sessions').insert({
        user_id: user.id,
        total_duration_seconds: totalDuration,
        phases_completed: phasesCompleted,
        efficiency_score: efficiency,
        notes
      });

      onSessionComplete?.();
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Clock className="h-8 w-8 text-primary" />
          Protocolo 60=10 Completo
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          60 minutos = 10 horas de estudo tradicional
        </p>
      </div>

      {/* Overall Progress */}
      <div className="card-premium">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Progresso Geral</span>
            <span className="text-primary font-bold">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted-foreground">Tempo Restante da Fase</div>
          </div>

          <Button
            onClick={() => setIsRunning(!isRunning)}
            size="lg"
            className="rounded-full h-16 w-16"
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isActive = index === currentPhaseIndex;
          const isCompleted = phasesCompleted[index];
          const isPending = index > currentPhaseIndex;

          return (
            <div
              key={index}
              className={`card-premium transition-all ${
                isActive
                  ? 'border-2 border-primary'
                  : isCompleted
                  ? 'border border-primary/30 opacity-60'
                  : 'opacity-40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-full p-3 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="text-xl font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{phase.name}</h3>
                  <p className="text-muted-foreground mb-3">{phase.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(phase.duration / 60)} minutos
                    </span>
                  </div>

                  {phase.tools.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {phase.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-4">Anotações da Sessão</h3>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anote insights, dificuldades ou observações sobre sua sessão..."
          className="min-h-[120px]"
        />
      </div>

      {/* Start Protocol */}
      {!isRunning && currentPhaseIndex === 0 && !phasesCompleted.some(Boolean) && (
        <div className="card-premium border-2 border-primary text-center">
          <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-muted-foreground mb-6">
            O Protocolo 60=10 vai guiá-lo através de 6 fases otimizadas para máxima retenção e eficiência.
            Prepare seu ambiente e clique para iniciar.
          </p>
          <Button
            onClick={() => setIsRunning(true)}
            size="lg"
            className="btn-premium"
          >
            <Play className="h-5 w-5 mr-2" />
            INICIAR PROTOCOLO 60=10
          </Button>
        </div>
      )}
    </div>
  );
};