import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, ArrowLeft, CheckCircle, XCircle, Lightbulb, 
  Clock, BookOpen, TrendingUp, RotateCcw, Eye, EyeOff,
  Trophy, Zap, Calendar, Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDailyQuestion, getQuestionHistory, DailyQuestion } from "@/data/dailyQuestionsData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

export default function DailyQuestion() {
  const navigate = useNavigate();
  const { isPremium, dailyQuestionsUsed, dailyQuestionsLimit, incrementQuestions } = useFreemiumLimits();
  const [currentQuestion, setCurrentQuestion] = useState<DailyQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionHistory, setQuestionHistory] = useState<DailyQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestion();
    loadHistory();
  }, []);

  const loadQuestion = () => {
    const question = getDailyQuestion();
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowExplanation(false);
    setIsCorrect(null);
    setLoading(false);
  };

  const loadHistory = () => {
    const history = getQuestionHistory();
    setQuestionHistory(history);
  };

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowAnswer(true);
    setShowExplanation(true);

    // Incrementar contador de questões
    if (!isPremium && dailyQuestionsUsed < dailyQuestionsLimit) {
      await incrementQuestions();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Desconhecido';
    }
  };

  const canAnswerMore = isPremium || dailyQuestionsUsed < dailyQuestionsLimit;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando questão do dia...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Target className="h-16 w-16 text-muted-foreground mx-auto" />
          <h2 className="text-xl font-semibold">Nenhuma questão disponível</h2>
          <p className="text-muted-foreground">Tente novamente mais tarde.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Questão do Dia
                </h1>
                <p className="text-sm text-muted-foreground">
                  Uma questão recorrente do ENEM com explicação completa
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date().toLocaleDateString('pt-BR')}
              </Badge>
              {!isPremium && (
                <Badge variant="secondary" className="text-xs">
                  {dailyQuestionsUsed}/{dailyQuestionsLimit} questões
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Limite de Questões */}
        {!isPremium && dailyQuestionsUsed >= dailyQuestionsLimit && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">Limite diário atingido!</h3>
                  <p className="text-sm text-orange-700">
                    Você já respondeu {dailyQuestionsLimit} questões hoje. Desbloqueie acesso ilimitado no premium.
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/pricing')}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Desbloquear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questão Principal */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Questão Recorrente do ENEM
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={`${getDifficultyColor(currentQuestion.difficulty)} border-0`}>
                  {getDifficultyLabel(currentQuestion.difficulty)}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{currentQuestion.subject.charAt(0).toUpperCase() + currentQuestion.subject.slice(1)}</span>
              </div>
              {currentQuestion.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>ENEM {currentQuestion.year}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Questão recorrente</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Enunciado */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Alternativas */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQuestion.correctAnswer;
                  const showResult = showAnswer && (isCorrectOption || isSelected);
                  
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full justify-start h-auto p-4 text-left transition-all ${
                        showResult 
                          ? isCorrectOption 
                            ? 'border-green-500 bg-green-50 text-green-800' 
                            : isSelected && !isCorrectOption
                              ? 'border-red-500 bg-red-50 text-red-800'
                              : ''
                          : isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'hover:border-primary/50'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          showResult
                            ? isCorrectOption
                              ? 'border-green-500 bg-green-500 text-white'
                              : isSelected && !isCorrectOption
                                ? 'border-red-500 bg-red-500 text-white'
                                : 'border-gray-300'
                            : isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrectOption && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showResult && isSelected && !isCorrectOption && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Botão de Envio */}
            {!showAnswer && selectedAnswer !== null && canAnswerMore && (
              <div className="text-center">
                <Button
                  onClick={handleSubmitAnswer}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirmar Resposta
                </Button>
              </div>
            )}

            {/* Resultado */}
            {showAnswer && (
              <Card className={`border-2 ${
                isCorrect 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-red-500 bg-red-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                    <h3 className={`font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? 'Parabéns! Você acertou!' : 'Ops! Resposta incorreta.'}
                    </h3>
                  </div>

                  {!isCorrect && (
                    <div className="mb-4 p-3 bg-white rounded-lg border">
                      <p className="text-sm">
                        <strong>Resposta correta:</strong> {String.fromCharCode(65 + currentQuestion.correctAnswer)} - {currentQuestion.options[currentQuestion.correctAnswer]}
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mb-4">
                    {currentQuestion.explanation}
                  </p>

                  {/* Dicas */}
                  {currentQuestion.tips && currentQuestion.tips.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm flex items-center gap-1">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Dicas para questões similares:
                      </h4>
                      <ul className="space-y-1">
                        {currentQuestion.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={loadQuestion}
                disabled={!canAnswerMore}
                className="flex-1"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Nova Questão
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                <Target className="mr-2 h-4 w-4" />
                Continuar Estudando
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Questões */}
        {questionHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Últimas 7 Questões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {questionHistory.map((question, index) => (
                  <Card key={question.id} className="border-gray-200">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {question.category}
                          </Badge>
                          <Badge className={`${getDifficultyColor(question.difficulty)} border-0 text-xs`}>
                            {getDifficultyLabel(question.difficulty)}
                          </Badge>
                        </div>
                        
                        <h4 className="text-sm font-medium line-clamp-2">
                          {question.question}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span>{question.subject}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Banner de Conversão */}
        {!isPremium && (
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  Questões Ilimitadas Premium
                </h3>
                <p className="text-sm text-muted-foreground">
                  Estude quantas questões quiser com explicações detalhadas e histórico completo
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-xs text-muted-foreground">Questões/dia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-xs text-muted-foreground">Banco de Questões</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">📊</div>
                  <div className="text-xs text-muted-foreground">Analytics</div>
                </div>
              </div>

              <Button
                onClick={() => navigate('/pricing')}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                <Zap className="mr-2 h-4 w-4" />
                Desbloquear Questões Ilimitadas - R$ 197
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


