import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, GraduationCap, CheckCircle2, XCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { questoesResolvidasData } from "@/data/questoesResolvidasData";

const QuestoesResolvidasSection = () => {
  const [allQuestions, setAllQuestions] = useState<any[]>(questoesResolvidasData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Tenta carregar dataset completo de /questoes.json (em /public)
    const loadExternal = async () => {
      try {
        const res = await fetch("/questoes.json", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllQuestions(data);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
          }
        }
      } catch (_) {
        // Silenciar falhas; mantém fallback local (questoesResolvidasData)
      }
    };
    loadExternal();
  }, []);

  const question = allQuestions[currentQuestion];

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleConfirm = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const isCorrect = selectedAnswer === question?.gabarito;

  if (!question) {
    return (
      <div className="space-y-6">
        <Badge variant="outline" className="text-sm">Carregando questões...</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Questão {currentQuestion + 1} de {allQuestions.length}
        </Badge>
        <Badge variant="secondary">{question.materia}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Questão {question.id} - {question.sub_materia}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-foreground">{question.enunciado}</p>
          </div>

          <div className="space-y-3">
            {["A", "B", "C", "D", "E"].map((option, index) => (
              <button
                key={option}
                onClick={() => !showExplanation && handleSelectAnswer(option)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showExplanation && option === question.gabarito
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : showExplanation && option === selectedAnswer && !isCorrect
                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                    : selectedAnswer === option
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg">{option})</span>
                  <span className="flex-1">{question.alternativas[index]}</span>
                  {showExplanation && option === question.gabarito && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  )}
                  {showExplanation && option === selectedAnswer && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {!showExplanation && selectedAnswer && (
            <Button onClick={handleConfirm} className="w-full" size="lg">
              Confirmar Resposta
            </Button>
          )}

          {showExplanation && (
            <div className="space-y-6 mt-6">
              <Separator />
              
              <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}`}>
                <p className="font-semibold flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Resposta Correta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300">
                        Resposta Incorreta. A alternativa correta é: {question.gabarito}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Explicação Técnica */}
              {question.explicacaoTecnica && (
                <Card className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Explicação Técnica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{question.explicacaoTecnica}</p>
                  </CardContent>
                </Card>
              )}

              {/* Explicação Lógica */}
              {question.explicacaoLogica && (
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Brain className="h-5 w-5 text-accent" />
                      Explicação Lógica (sem conhecimento prévio)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{question.explicacaoLogica}</p>
                  </CardContent>
                </Card>
              )}

              {/* Dica de Chute */}
              {question.dicaChute && (
                <Card className="border-accent/30 bg-accent/5">
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      <strong className="text-accent">💡 Dica de chute inteligente:</strong>{" "}
                      {question.dicaChute}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestion === allQuestions.length - 1}
              className="flex-1"
            >
              Próxima
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestoesResolvidasSection;
