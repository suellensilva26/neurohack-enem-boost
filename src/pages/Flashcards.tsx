import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, BookOpen, Target, Trophy, TrendingUp, 
  Clock, CheckCircle, Zap 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardSwiper } from "@/components/flashcards/CardSwiper";
import { CategorySelector } from "@/components/flashcards/CategorySelector";
import { subjects, getFlashcardsBySubject, getRandomFlashcards, Subject } from "@/data/flashcardsData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

type SessionMode = 'select' | 'study' | 'complete';

export default function Flashcards() {
  const navigate = useNavigate();
  const { isPremium } = useFreemiumLimits();
  const [mode, setMode] = useState<SessionMode>('select');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentCards, setCurrentCards] = useState<any[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [cardHistory, setCardHistory] = useState<{ cardId: string; correct: boolean }[]>([]);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    const cards = getFlashcardsBySubject(subject.id);
    setCurrentCards(cards);
    setMode('study');
    setCardHistory([]);
  };

  const handleStartRandom = () => {
    const randomCards = getRandomFlashcards(20); // 20 flashcards aleatórios
    setSelectedSubject(null);
    setCurrentCards(randomCards);
    setMode('study');
    setCardHistory([]);
  };

  const handleCardComplete = (cardId: string, correct: boolean) => {
    setCardHistory(prev => [...prev, { cardId, correct }]);
  };

  const handleSessionComplete = (stats: { correct: number; total: number }) => {
    setSessionStats(stats);
    setMode('complete');
  };

  const resetSession = () => {
    setMode('select');
    setSelectedSubject(null);
    setCurrentCards([]);
    setSessionStats({ correct: 0, total: 0 });
    setCardHistory([]);
  };

  const getAccuracy = () => {
    return sessionStats.total > 0 ? (sessionStats.correct / sessionStats.total * 100).toFixed(1) : '0';
  };

  const getPerformanceMessage = (accuracy: number) => {
    if (accuracy >= 90) return { message: "Excelente! Você domina o assunto!", color: "text-green-600" };
    if (accuracy >= 80) return { message: "Muito bom! Continue assim!", color: "text-blue-600" };
    if (accuracy >= 70) return { message: "Bom trabalho! Pratique mais!", color: "text-yellow-600" };
    if (accuracy >= 60) return { message: "Precisa revisar mais!", color: "text-orange-600" };
    return { message: "Continue estudando!", color: "text-red-600" };
  };

  const performance = getPerformanceMessage(Number(getAccuracy()));

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
                  <BookOpen className="h-5 w-5 text-primary" />
                  Flashcards Inteligentes
                </h1>
                {selectedSubject && (
                  <p className="text-sm text-muted-foreground">
                    Estudando: {selectedSubject.name}
                  </p>
                )}
              </div>
            </div>
            
            {mode === 'study' && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                {currentCards.length} flashcards
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {mode === 'select' && (
          <CategorySelector
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onStartRandom={handleStartRandom}
          />
        )}

        {mode === 'study' && (
          <CardSwiper
            cards={currentCards}
            onCardComplete={handleCardComplete}
            onSessionComplete={handleSessionComplete}
            subjectName={selectedSubject?.name || 'Todas as Matérias'}
          />
        )}

        {mode === 'complete' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Resultado da Sessão */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center">
                  <Trophy className="h-6 w-6 text-primary" />
                  Sessão Concluída!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Estatísticas Principais */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {getAccuracy()}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Taxa de Acerto
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">
                      {sessionStats.correct}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Acertos
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-red-600">
                      {sessionStats.total - sessionStats.correct}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Erros
                    </div>
                  </div>
                </div>

                {/* Mensagem de Performance */}
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <p className={`font-semibold ${performance.color}`}>
                    {performance.message}
                  </p>
                </div>

                {/* Detalhes da Sessão */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Detalhes da Sessão
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Matéria:</span>
                        <span>{selectedSubject?.name || 'Todas as Matérias'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total de Cards:</span>
                        <span>{sessionStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Acertos:</span>
                        <span className="text-green-600">{sessionStats.correct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Erros:</span>
                        <span className="text-red-600">{sessionStats.total - sessionStats.correct}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Performance
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxa de Acerto:</span>
                        <span className="font-medium">{getAccuracy()}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nível:</span>
                        <Badge 
                          variant={
                            Number(getAccuracy()) >= 80 ? 'default' : 
                            Number(getAccuracy()) >= 60 ? 'secondary' : 'destructive'
                          }
                        >
                          {Number(getAccuracy()) >= 80 ? 'Avançado' : 
                           Number(getAccuracy()) >= 60 ? 'Intermediário' : 'Iniciante'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-3">
                  <Button
                    onClick={resetSession}
                    variant="outline"
                    className="flex-1"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Nova Sessão
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                  >
                    <Target className="mr-2 h-4 w-4" />
                    Continuar Estudando
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Banner de Conversão */}
            {!isPremium && (
              <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                      <Zap className="h-6 w-6 text-accent" />
                      Desbloqueie Análise Completa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Veja suas estatísticas detalhadas, pontos fracos e cronograma personalizado
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">📊</div>
                      <div className="text-xs text-muted-foreground">Analytics</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">🎯</div>
                      <div className="text-xs text-muted-foreground">Pontos Fracos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">📅</div>
                      <div className="text-xs text-muted-foreground">Cronograma IA</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/pricing')}
                    className="w-full bg-gradient-to-r from-primary to-accent"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Desbloquear Análise Completa - R$ 197
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


