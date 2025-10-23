import { useState } from "react";
import { CircularTimer } from "../CircularTimer";
import { AudioRecorder } from "../AudioRecorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Target, FileText, BookOpen, MessageCircle, AlertCircle, Plus } from "lucide-react";
import * as logger from "@/utils/logger";

export const TestingEffect = () => {
  const [errorTracking, setErrorTracking] = useState({
    subject: "",
    errorType: "",
    strategy: ""
  });

  const levels = [
    { label: "Lembrar", duration: 300, icon: FileText, description: "Papel em branco, 5 minutos sem consulta" },
    { label: "Aplicar", duration: 480, icon: BookOpen, description: "6 questões cronometradas em condições reais" },
    { label: "Sumarizar", duration: 0, icon: MessageCircle, description: "Explique a um amigo imaginário" },
    { label: "Avaliar", duration: 0, icon: AlertCircle, description: "Liste 3 pegadinhas e estratégias" }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);

  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      toast.success(`Nível ${levels[currentLevel].label} completo!`);
    } else {
      toast.success("Testing Effect completo! 🎯");
    }
  };

  const addError = async () => {
    if (!errorTracking.subject || !errorTracking.errorType) {
      toast.error("Preencha matéria e tipo de erro");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from('error_tracking')
        .insert({
          user_id: user.id,
          subject: errorTracking.subject,
          error_type: errorTracking.errorType,
          strategy: errorTracking.strategy,
          frequency: 1
        });

      if (error) throw error;

      toast.success("Erro registrado!");
      setErrorTracking({ subject: "", errorType: "", strategy: "" });
    } catch (error) {
      logger.error("Error saving error:", error);
      toast.error("Erro ao registrar");
    }
  };

  const CurrentLevelIcon = levels[currentLevel].icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          Testing Effect Devastador
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Recuperar é Aprender: Recordação ativa supera releitura passiva
        </p>
      </div>

      {/* Levels Navigation */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">4 Níveis de Recuperação</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {levels.map((level, index) => {
            const LevelIcon = level.icon;
            const isActive = index === currentLevel;
            const isCompleted = index < currentLevel;

            return (
              <button
                key={index}
                onClick={() => setCurrentLevel(index)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-primary bg-primary/10'
                    : isCompleted
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border bg-card/50 hover:border-primary/50'
                }`}
              >
                <LevelIcon className={`h-6 w-6 mx-auto mb-2 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="font-bold text-sm">{level.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Level Content */}
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <CurrentLevelIcon className="h-8 w-8 text-primary" />
          <h3 className="text-2xl font-bold">{levels[currentLevel].label}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{levels[currentLevel].description}</p>

        {levels[currentLevel].duration > 0 ? (
          <div className="flex justify-center">
            <CircularTimer
              durationSeconds={levels[currentLevel].duration}
              onComplete={handleLevelComplete}
            />
          </div>
        ) : currentLevel === 2 ? (
          <div>
            <AudioRecorder maxDuration={300} />
            <Button onClick={handleLevelComplete} className="w-full mt-4 rounded-xl" size="lg">
              Concluir Sumarização
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Liste 3 pegadinhas comuns e suas estratégias de resolução..."
              className="min-h-[150px]"
            />
            <Button onClick={handleLevelComplete} className="w-full rounded-xl" size="lg">
              Concluir Avaliação
            </Button>
          </div>
        )}
      </div>

      {/* Sample Question */}
      {currentLevel === 1 && (
        <div className="card-premium">
          <h3 className="text-xl font-bold mb-4">Questão Exemplo</h3>
          <p className="mb-4">
            (ENEM 2023) Uma função f(x) = ax² + bx + c possui vértice em (2, -4) e passa pelo ponto (0, 0). 
            Qual é o valor de a + b + c?
          </p>
          <div className="space-y-2">
            {['A) -2', 'B) -1', 'C) 0', 'D) 1', 'E) 2'].map((alt, i) => (
              <button
                key={i}
                className="w-full p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                {alt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Tracking */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-4">Planilha de Erros Recorrentes</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              value={errorTracking.subject}
              onChange={(e) => setErrorTracking({ ...errorTracking, subject: e.target.value })}
              placeholder="Matéria"
            />
            <Input
              value={errorTracking.errorType}
              onChange={(e) => setErrorTracking({ ...errorTracking, errorType: e.target.value })}
              placeholder="Tipo de erro"
            />
            <Input
              value={errorTracking.strategy}
              onChange={(e) => setErrorTracking({ ...errorTracking, strategy: e.target.value })}
              placeholder="Estratégia de correção"
            />
          </div>
          <Button onClick={addError} className="w-full rounded-xl">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Erro
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3">Matéria</th>
                <th className="text-left p-3">Tipo de Erro</th>
                <th className="text-left p-3">Frequência</th>
                <th className="text-left p-3">Estratégia</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="p-3 text-muted-foreground" colSpan={4}>
                  Nenhum erro registrado ainda
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};