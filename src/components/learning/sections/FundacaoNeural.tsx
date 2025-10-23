import { useState } from "react";
import { CircularTimer } from "../CircularTimer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Brain, Wind, Eye, Smartphone, Target as TargetIcon } from "lucide-react";
import * as logger from "@/utils/logger";

export const FundacaoNeural = () => {
  const [objective, setObjective] = useState("");
  const [checklist, setChecklist] = useState({
    breathing: false,
    eyes: false,
    environment: false,
    goal: false
  });

  const steps = [
    { label: "Respiração 4-7-8", duration: 120, icon: Wind, key: "breathing" },
    { label: "Relaxar olhos e pescoço", duration: 60, icon: Eye, key: "eyes" },
    { label: "Modo avião, mesa limpa", duration: 60, icon: Smartphone, key: "environment" },
    { label: "1 objetivo mensurável", duration: 60, icon: TargetIcon, key: "goal" }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepComplete = async () => {
    const stepKey = steps[currentStep]?.key as keyof typeof checklist;
    setChecklist(prev => ({ ...prev, [stepKey]: true }));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save session to database
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from('neuro_prep_sessions').insert({
          user_id: user.id,
          objective: objective || "Sem objetivo definido",
          duration_seconds: 540
        });

        toast.success("Preparação neural completa! 🧠");
      } catch (error) {
        logger.error("Error saving session:", error);
      }
    }
  };

  const saveObjective = async () => {
    if (!objective.trim()) {
      toast.error("Digite um objetivo mensurável");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profile) {
        toast.success("Objetivo salvo!");
      }
    } catch (error) {
      logger.error("Error saving objective:", error);
    }
  };

  const CurrentStepIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          Fundação Neurológica
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          "O cérebro se reorganiza rapidamente quando há clareza de objetivo, prática ativa e feedback próximo do erro. Ritmos cerebrais estáveis elevam a codificação neural."
        </p>
      </div>

      {/* Preparation Routine */}
      <div className="card-premium">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CurrentStepIcon className="h-6 w-6 text-primary" />
          Rotina de Preparo (9 minutos)
        </h3>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Timer */}
          <div className="flex justify-center">
            <CircularTimer
              durationSeconds={steps[currentStep]?.duration || 120}
              label={steps[currentStep]?.label}
              onComplete={handleStepComplete}
            />
          </div>

          {/* Steps Checklist */}
          <div className="space-y-4">
            <h4 className="font-semibold mb-4">Passos da Rotina:</h4>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = checklist[step.key as keyof typeof checklist];
              
              return (
                <div
                  key={step.key}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    isActive 
                      ? 'border-primary bg-primary/10' 
                      : isCompleted
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border bg-card/50'
                  }`}
                >
                  <Checkbox 
                    checked={isCompleted} 
                    disabled
                    className="data-[state=checked]:bg-primary"
                  />
                  <StepIcon className={`h-5 w-5 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1">
                    <div className={`font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(step.duration / 60)} min
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Breathing Animation Helper */}
      {steps[currentStep]?.key === "breathing" && (
        <div className="card-premium text-center">
          <h4 className="font-semibold mb-4">Respiração 4-7-8</h4>
          <div className="space-y-3 max-w-md mx-auto">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
              <div className="text-primary font-bold">Inspire pelo nariz</div>
              <div className="text-2xl text-primary">4 segundos</div>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
              <div className="text-accent font-bold">Segure</div>
              <div className="text-2xl text-accent">7 segundos</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary border border-border">
              <div className="text-foreground font-bold">Expire pela boca</div>
              <div className="text-2xl text-foreground">8 segundos</div>
            </div>
          </div>
        </div>
      )}

      {/* Objective Setting */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TargetIcon className="h-6 w-6 text-primary" />
          Defina Seu Objetivo Mensurável
        </h3>
        <div className="flex gap-2">
          <Input
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="Ex: Resolver 6 questões de função quadrática"
            className="flex-1"
          />
          <Button onClick={saveObjective} className="rounded-xl">
            Salvar Objetivo
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Seja específico e mensurável para máxima clareza neural
        </p>
      </div>
    </div>
  );
};