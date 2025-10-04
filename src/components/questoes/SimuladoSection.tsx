import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, Clock, Target } from "lucide-react";
import { simuladoQuestoes } from "@/data/simuladoData";

const SimuladoSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);

  const question = simuladoQuestoes[currentQuestion];
  const progress = ((currentQuestion + 1) / simuladoQuestoes.length) * 100;

  const handleSelectAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < simuladoQuestoes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setEndTime(Date.now());
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    simuladoQuestoes.forEach((q, idx) => {
      if (answers[idx] === q.gabarito) {
        correct++;
      }
    });
    return correct;
  };

  const getTimeSpent = () => {
    const time = endTime ? endTime - startTime : Date.now() - startTime;
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}min ${seconds}s`;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / simuladoQuestoes.length) * 100;

    return (
      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Resultado do Simulado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/20">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold text-primary">{score}</p>
                <p className="text-sm text-muted-foreground">Acertos</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-accent/5 border border-accent/20">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold text-accent">{percentage.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Aproveitamento</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-3xl font-bold">{getTimeSpent()}</p>
                <p className="text-sm text-muted-foreground">Tempo Total</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Gabarito Detalhado</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {simuladoQuestoes.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.gabarito;
                  
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect
                          ? "border-green-500 bg-green-50 dark:bg-green-950"
                          : userAnswer
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold">
                            Questão {idx + 1} - {q.tema}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {userAnswer ? (
                              <>
                                Sua resposta: <strong>{userAnswer}</strong> | Gabarito: <strong>{q.gabarito}</strong>
                              </>
                            ) : (
                              <>
                                Não respondida | Gabarito: <strong>{q.gabarito}</strong>
                              </>
                            )}
                          </p>
                        </div>
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                        ) : userAnswer ? (
                          <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                        ) : (
                          <div className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              className="w-full"
              size="lg"
            >
              Refazer Simulado
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Questão {currentQuestion + 1} de {simuladoQuestoes.length}</span>
          <Badge variant="outline">
            {Object.keys(answers).length} respondidas
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{question.materia}</Badge>
            <Badge variant="outline">{question.tema}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-line text-foreground font-medium">
              {question.enunciado}
            </p>
          </div>

          <div className="space-y-3">
            {["A", "B", "C", "D", "E"].map((option) => (
              <button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === option
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                } cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg">{option})</span>
                  <span className="flex-1">{question.alternativas[option]}</span>
                  {answers[currentQuestion] === option && (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              Anterior
            </Button>
            {currentQuestion === simuladoQuestoes.length - 1 ? (
              <Button onClick={handleFinish} className="flex-1" size="lg">
                Finalizar Simulado
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                Próxima
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimuladoSection;
