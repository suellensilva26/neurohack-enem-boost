import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, ArrowLeft, CheckCircle, XCircle, Lightbulb, 
  Clock, BookOpen, TrendingUp, RotateCcw, Eye, EyeOff,
  Trophy, Zap, Calendar, Award, Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDailyQuestion, getQuestionHistory, DailyQuestion } from "@/data/dailyQuestionsData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";
import { useEnemAPI, QuestaoEnem } from "@/hooks/useEnemAPI";

export default function DailyQuestion() {
  const navigate = useNavigate();
  const { isPremium, dailyQuestionsUsed, dailyQuestionsLimit, incrementQuestions } = useFreemiumLimits();
  const { buscarQuestoes } = useEnemAPI();
  const [currentQuestion, setCurrentQuestion] = useState<DailyQuestion | QuestaoEnem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionHistory, setQuestionHistory] = useState<DailyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    loadQuestion();
    loadHistory();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive]);

  useEffect(() => {
    // Iniciar o cronômetro quando a questão for carregada
    if (currentQuestion && !showAnswer) {
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [currentQuestion, showAnswer]);

  const loadQuestion = async () => {
    setLoading(true);
    try {
      // Se for usuário premium, buscar da API
      if (isPremium) {
        // Buscar questão aleatória da API
        const questoes = await buscarQuestoes({
          year: new Date().getFullYear() - 1, // Ano anterior
          limit: 1
        });
        
        if (questoes && questoes.length > 0) {
          setCurrentQuestion(questoes[0]);
        } else {
          // Fallback para questão estática
          const question = getDailyQuestion();
          setCurrentQuestion(question);
        }
      } else {
        // Usuário gratuito: usar questão estática do dia
        const question = getDailyQuestion();
        setCurrentQuestion(question);
      }
      
      setSelectedAnswer(null);
      setShowAnswer(false);
      setShowExplanation(false);
      setIsCorrect(null);
      setElapsedTime(0);
    } catch (error) {
      console.error("Erro ao carregar questão:", error);
    } finally {
      setLoading(false);
    }
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

    // Parar o cronômetro
    setTimerActive(false);

    // Verificar se é uma questão da API ou estática
    const isApiQuestion = 'enunciado' in currentQuestion;
    const correctAnswerIndex = isApiQuestion 
      ? (currentQuestion as QuestaoEnem).correctAnswer 
      : (currentQuestion as DailyQuestion).correctAnswer;
    
    const correct = selectedAnswer === correctAnswerIndex;
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const loadNextQuestion = async () => {
    // Verificar limite para usuários gratuitos
    if (!isPremium && dailyQuestionsUsed >= dailyQuestionsLimit) {
      return;
    }
    
    await loadQuestion();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-4">
        <div className="space-y-4">
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

  // Verificar se é uma questão da API ou estática
  const isApiQuestion = 'enunciado' in currentQuestion;
  const question = isApiQuestion 
    ? (currentQuestion as QuestaoEnem).enunciado 
    : (currentQuestion as DailyQuestion).question;
  const options = isApiQuestion 
    ? (currentQuestion as QuestaoEnem).alternatives 
    : (currentQuestion as DailyQuestion).options;
  const correctAnswerIndex = isApiQuestion 
    ? (currentQuestion as QuestaoEnem).correctAnswer 
    : (currentQuestion as DailyQuestion).correctAnswer;
  const explanation = isApiQuestion 
    ? "Explicação não disponível para esta questão." 
    : (currentQuestion as DailyQuestion).explanation;
  const subject = isApiQuestion 
    ? (currentQuestion as QuestaoEnem).discipline 
    : (currentQuestion as DailyQuestion).subject;
  const year = isApiQuestion 
    ? (currentQuestion as QuestaoEnem).year 
    : (currentQuestion as DailyQuestion).year;

  // Verificar se o usuário atingiu o limite diário
  const limitReached = !isPremium && dailyQuestionsUsed >= dailyQuestionsLimit;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="h-8 w-8 p-0 sm:h-9 sm:w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Questão do Dia
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Uma questão recorrente do ENEM com explicação completa
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2 sm:mt-0 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto justify-end">
              <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="h-3 w-3" />
                {new Date().toLocaleDateString('pt-BR')}
              </Badge>
              {!isPremium && (
                <Badge variant="secondary" className="text-xs whitespace-nowrap">
                  {dailyQuestionsUsed}/{dailyQuestionsLimit} questões
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                <Clock className="h-3 w-3" />
                {formatTime(elapsedTime)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Alerta de limite */}
        {limitReached && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mt-0.5 hidden sm:block" />
            <div className="flex-1">
              <h3 className="font-semibold text-orange-800 text-sm sm:text-base flex items-center gap-2">
                <XCircle className="h-4 w-4 text-orange-600 sm:hidden" />
                Limite diário atingido!
              </h3>
              <p className="text-xs sm:text-sm text-orange-700 mt-1">
                Você já respondeu {dailyQuestionsLimit} questões hoje. Desbloqueie acesso ilimitado no premium.
              </p>
            </div>
            <Button
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-primary to-accent w-full sm:w-auto mt-2 sm:mt-0 text-xs sm:text-sm h-8 sm:h-9"
            >
              Ver planos
            </Button>
          </div>
        )}

        {/* Card da questão */}
        <Card>
          <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <Badge className={`${getDifficultyColor(isApiQuestion ? 'medium' : (currentQuestion as DailyQuestion).difficulty)} text-xs`}>
                {isApiQuestion ? 'Médio' : getDifficultyLabel((currentQuestion as DailyQuestion).difficulty)}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {subject.charAt(0).toUpperCase() + subject.slice(1).replace('-', ' ')}
              </Badge>
              {year && (
                <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-0.5 rounded-full">
                  <Calendar className="h-3 w-3" />
                  <span>ENEM {year}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                <span>Recorrente</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-3 sm:px-6 py-3 sm:py-4 space-y-4 sm:space-y-6">
            {/* Enunciado */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium leading-relaxed">
                {question}
              </h3>

              {/* Alternativas */}
              <div className="space-y-2 sm:space-y-3">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-gray-400'
                    } ${
                      showAnswer
                        ? index === correctAnswerIndex
                          ? 'border-green-500 bg-green-50'
                          : selectedAnswer === index && selectedAnswer !== correctAnswerIndex
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border text-xs sm:text-sm ${
                        showAnswer
                          ? index === correctAnswerIndex
                            ? 'border-green-500 bg-green-500 text-white'
                            : selectedAnswer === index && selectedAnswer !== correctAnswerIndex
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300'
                            : selectedAnswer === index
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-sm sm:text-base">{option}</span>
                        {showAnswer && index === correctAnswerIndex && (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão de confirmar */}
            {!showAnswer && (
              <div className="flex justify-center">
                <Button
                  onClick={handleSubmitAnswer}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent w-full sm:w-auto h-10 sm:h-12 text-sm sm:text-base"
                >
                  <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    {isCorrect ? (
                      <>
                        <div className="bg-green-500 text-white p-1.5 sm:p-2 rounded-full self-start sm:self-auto">
                          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-green-700 text-sm sm:text-base">Resposta Correta!</h3>
                          <p className="text-xs sm:text-sm text-green-600">Muito bem! Continue assim.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-red-500 text-white p-1.5 sm:p-2 rounded-full self-start sm:self-auto">
                          <XCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-red-700 text-sm sm:text-base">Resposta Incorreta</h3>
                          <p className="text-xs sm:text-sm text-red-600">
                            <strong>Resposta correta:</strong> {String.fromCharCode(65 + correctAnswerIndex)} - {options[correctAnswerIndex]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    {explanation}
                  </p>

                  {/* Dicas */}
                  {!isApiQuestion && (currentQuestion as DailyQuestion).tips && (currentQuestion as DailyQuestion).tips!.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-xs sm:text-sm flex items-center gap-1">
                        <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        Dicas para questões similares:
                      </h4>
                      <ul className="space-y-1">
                        {(currentQuestion as DailyQuestion).tips!.map((tip, index) => (
                          <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tempo de resposta */}
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 text-xs sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="font-medium">Tempo de resposta: {formatTime(elapsedTime)}</span>
                    </div>
                  </div>

                  {/* Botão próxima questão */}
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <Button
                      onClick={loadNextQuestion}
                      disabled={limitReached}
                      className="bg-gradient-to-r from-primary to-accent w-full sm:w-auto h-10 sm:h-11 text-sm"
                    >
                      {limitReached ? (
                        <>
                          <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Limite atingido
                        </>
                      ) : (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Próxima Questão
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Seção Premium */}
        {!isPremium && (
          <Card className="border-2 border-amber-200 bg-amber-50">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-4">
              <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-lg">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                Desbloqueie Acesso Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
              <p className="text-amber-700 text-xs sm:text-sm">
                Estude quantas questões quiser com explicações detalhadas e histórico completo
              </p>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">∞</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Questões/dia</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">1000+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Banco de Questões</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">📊</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Analytics</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/pricing')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 h-10 sm:h-11 text-xs sm:text-sm"
              >
                <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Assinar Premium
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Histórico de questões */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Questões Anteriores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {questionHistory.slice(0, isPremium ? undefined : 3).map((question, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-muted p-2 sm:p-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] sm:text-xs">
                      {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)}
                    </Badge>
                    <Badge className={`${getDifficultyColor(question.difficulty)} text-[10px] sm:text-xs`}>
                      {getDifficultyLabel(question.difficulty)}
                    </Badge>
                  </div>
                  <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium line-clamp-2">
                    {question.question}
                  </h3>
                </div>
                <CardContent className="p-2 sm:p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      {new Date().getDate() - index} {index === 0 ? 'hoje' : index === 1 ? 'ontem' : 'dias atrás'}
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 sm:h-8 w-7 sm:w-8 p-0">
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {!isPremium && questionHistory.length > 3 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/pricing')}
                className="text-xs sm:text-sm h-9 sm:h-10"
              >
                Ver histórico completo (Premium)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


