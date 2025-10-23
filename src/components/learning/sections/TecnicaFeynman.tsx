import { useState } from "react";
import { CircularTimer } from "../CircularTimer";
import { AudioRecorder } from "../AudioRecorder";
import { FlashcardCreator } from "../FlashcardCreator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Zap, MessageSquare } from "lucide-react";
import * as logger from "@/utils/logger";

export const TecnicaFeynman = () => {
  const [template, setTemplate] = useState({
    about: "",
    recognize: "",
    method: "",
    works: ""
  });
  const [showFlashcardCreator, setShowFlashcardCreator] = useState(false);

  const phases = [
    { label: "Explicação voz alta", duration: 480 },
    { label: "Correção dirigida", duration: 120 },
    { label: "Nova explicação", duration: 300 }
  ];

  const [currentPhase, setCurrentPhase] = useState(0);

  const handlePhaseComplete = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      toast.success(`Fase ${currentPhase + 1} completa! Avançando para a próxima.`);
    } else {
      toast.success("Técnica Feynman completa! 🎯");
    }
  };

  const saveRecording = async (blob: Blob, duration: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In a real implementation, you would upload the blob to storage
      // For now, we'll just save the metadata
      await supabase.from('feynman_recordings').insert({
        user_id: user.id,
        duration_seconds: duration,
        engagements: []
      });

      toast.success("Gravação salva com sucesso!");
      setShowFlashcardCreator(true);
    } catch (error) {
      logger.error("Error saving recording:", error);
      toast.error("Erro ao salvar gravação");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-premium text-center">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          Técnica Feynman Turbo
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Versão Militar da Explicação: 4 Frases que Destroem Qualquer Conceito
        </p>
      </div>

      {/* Feynman Template */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Template Feynman</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              1. "É sobre..."
            </label>
            <Textarea
              value={template.about}
              onChange={(e) => setTemplate({ ...template, about: e.target.value })}
              placeholder="Descreva o conceito em uma frase simples"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              2. "Reconheço porque..."
            </label>
            <Textarea
              value={template.recognize}
              onChange={(e) => setTemplate({ ...template, recognize: e.target.value })}
              placeholder="Como você identifica esse conceito na prática?"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              3. "O método é..."
            </label>
            <Textarea
              value={template.method}
              onChange={(e) => setTemplate({ ...template, method: e.target.value })}
              placeholder="Qual é o passo a passo?"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              4. "Funciona porque..."
            </label>
            <Textarea
              value={template.works}
              onChange={(e) => setTemplate({ ...template, works: e.target.value })}
              placeholder="Por que funciona? Qual é a lógica?"
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Timer with Phases */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-6">Timer Feynman (15 minutos)</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <CircularTimer
              durationSeconds={phases[currentPhase].duration}
              label={phases[currentPhase].label}
              onComplete={handlePhaseComplete}
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Fases:</h4>
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all ${
                  index === currentPhase
                    ? 'border-primary bg-primary/10'
                    : index < currentPhase
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border bg-card/50'
                }`}
              >
                <div className="font-medium">{phase.label}</div>
                <div className="text-sm text-muted-foreground">
                  {Math.floor(phase.duration / 60)} min {phase.duration % 60} seg
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Recording */}
      <div className="card-premium">
        <h3 className="text-xl font-bold mb-4">Exercício Prático</h3>
        <p className="text-muted-foreground mb-6">
          Grave sua explicação (60-90s) e marque os engasgos para transformar em flashcards
        </p>
        <AudioRecorder 
          onRecordingComplete={saveRecording}
          maxDuration={90}
        />
      </div>

      {/* Flashcard Creator */}
      {showFlashcardCreator && (
        <div className="card-premium">
          <h3 className="text-xl font-bold mb-4">Transforme Engasgos em Flashcards</h3>
          <FlashcardCreator source="feynman" />
        </div>
      )}
    </div>
  );
};