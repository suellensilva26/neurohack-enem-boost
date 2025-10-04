import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, Clock, Target, BookOpen, Grid3x3 } from "lucide-react";
import { simuladoData } from "@/data/simuladoData";

const SimuladoSection = () => {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);

  const blocks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    start: i * 10,
    end: Math.min(i * 10 + 9, simuladoData.length - 1),
    label: `Bloco ${i + 1} (Q${i * 10 + 1}-Q${Math.min(i * 10 + 10, simuladoData.length)})`
  }));

  const activeQuestions = selectedBlock === null || selectedBlock === 0
    ? simuladoData 
    : simuladoData.slice(blocks[selectedBlock - 1].start, blocks[selectedBlock - 1].end + 1);

  const question = activeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / activeQuestions.length) * 100;

  const handleSelectAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < activeQuestions.length - 1) {
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
    activeQuestions.forEach((q, idx) => {
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

  // Menu de seleção
  if (selectedBlock === null && !showResults) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Grid3x3 className="h-6 w-6" />
              Escolha seu Modo de Prática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Você pode fazer todas as {simuladoData.length} questões de uma vez ou praticar em blocos de 10 questões
            </p>

            <div className="grid gap-4">
              <Button
                size="lg"
                className="w-full h-auto py-8"
                onClick={() => {
                  setSelectedBlock(0);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="h-8 w-8" />
                  <span className="text-lg font-bold">Simulado Completo</span>
                  <span className="text-sm opacity-90">{simuladoData.length} Questões</span>
                </div>
              </Button>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {blocks.filter((_, i) => i * 10 < simuladoData.length).map((block) => (
                  <Button
                    key={block.id}
                    variant="outline"
                    className="h-auto py-4"
                    onClick={() => {
                      setSelectedBlock(block.id);
                      setCurrentQuestion(0);
                      setAnswers({});
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-xs">{block.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de resultados
  if (showResults) {
    const score = calculateScore();
    const percentage = (score / activeQuestions.length) * 100;

    return (
      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Resultado do {selectedBlock && selectedBlock !== 0 ? `Bloco ${selectedBlock}` : 'Simulado'}
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
                {activeQuestions.map((q, idx) => {
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
                            Questão {q.id} - {q.sub_materia}
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

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setSelectedBlock(null);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Voltar ao Menu
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="flex-1"
                size="lg"
              >
                Refazer {selectedBlock && selectedBlock !== 0 ? `Bloco ${selectedBlock}` : 'Simulado'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de questão
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Questão {currentQuestion + 1} de {activeQuestions.length}</span>
          <div className="flex gap-2">
            <Badge variant="outline">
              {Object.keys(answers).length} respondidas
            </Badge>
            {selectedBlock && selectedBlock !== 0 && (
              <Badge>Bloco {selectedBlock}</Badge>
            )}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{question.materia}</Badge>
            <Badge variant="outline">{question.sub_materia}</Badge>
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
              onClick={() => {
                setSelectedBlock(null);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
              variant="outline"
            >
              Menu
            </Button>
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              Anterior
            </Button>
            {currentQuestion === activeQuestions.length - 1 ? (
              <Button onClick={handleFinish} className="flex-1" size="lg">
                Finalizar
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
