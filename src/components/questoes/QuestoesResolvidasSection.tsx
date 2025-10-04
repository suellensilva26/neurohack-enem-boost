import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, GraduationCap, CheckCircle2, XCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { questoesResolvidas } from "@/data/questoesResolvidasData";

const QuestoesResolvidasSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questoesResolvidas[currentQuestion];

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleConfirm = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questoesResolvidas.length - 1) {
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

  const isCorrect = selectedAnswer === question.gabarito;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Questão {currentQuestion + 1} de {questoesResolvidas.length}
        </Badge>
        <Badge variant="secondary">{question.materia}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Questão {question.numero} - {question.tema}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-foreground">{question.enunciado}</p>
          </div>

          <div className="space-y-3">
            {["A", "B", "C", "D", "E"].map((option) => (
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
                  <span className="flex-1">{question.alternativas[option]}</span>
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
              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Explicação Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Passo a passo:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {question.explicacaoTecnica.passos.map((passo, idx) => (
                        <li key={idx} className="text-muted-foreground">{passo}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Por que {question.gabarito} está correta:</strong>{" "}
                      {question.explicacaoTecnica.justificativa}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Explicação Lógica */}
              <Card className="border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-5 w-5 text-accent" />
                    Explicação Lógica (sem conhecimento prévio)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Raciocínio puro:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {question.explicacaoLogica.raciocinio.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">{item}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                    <p className="text-sm">
                      <strong className="text-accent">💡 Dica de chute inteligente:</strong>{" "}
                      {question.explicacaoLogica.dica}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
              disabled={currentQuestion === questoesResolvidas.length - 1}
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
