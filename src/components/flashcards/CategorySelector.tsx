import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Target, Zap, Lock, CheckCircle, 
  Clock, Trophy, TrendingUp 
} from "lucide-react";
import { Subject, getFlashcardsBySubject } from "@/data/flashcardsData";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";

interface CategorySelectorProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onStartRandom: () => void;
}

export const CategorySelector = ({ subjects, onSelectSubject, onStartRandom }: CategorySelectorProps) => {
  const { isPremium, canAccessContent } = useFreemiumLimits();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const getSubjectProgress = (subject: Subject) => {
    // Simular progresso baseado em dados reais (conectar ao banco depois)
    const progress = Math.floor(Math.random() * 100);
    return progress;
  };

  const getAvailableSubjects = () => {
    if (isPremium) return subjects;
    return subjects.slice(0, 5); // Apenas 5 matérias na versão gratuita
  };

  const getLockedSubjects = () => {
    if (isPremium) return [];
    return subjects.slice(5);
  };

  const availableSubjects = getAvailableSubjects();
  const lockedSubjects = getLockedSubjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">📚 Flashcards Inteligentes</h2>
        <p className="text-muted-foreground">
          Escolha uma matéria ou revise todas de uma vez
        </p>
      </div>

      {/* Filtro de Dificuldade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Filtro por Dificuldade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('all')}
            >
              Todas
            </Button>
            <Button
              variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('easy')}
            >
              <Badge variant="secondary" className="mr-1">Fácil</Badge>
            </Button>
            <Button
              variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('medium')}
            >
              <Badge variant="default" className="mr-1">Médio</Badge>
            </Button>
            <Button
              variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('hard')}
            >
              <Badge variant="destructive" className="mr-1">Difícil</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ação Rápida */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Revisão Completa
              </h3>
              <p className="text-sm text-muted-foreground">
                Revise flashcards de todas as matérias em ordem aleatória
              </p>
            </div>
            <Button
              onClick={onStartRandom}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Iniciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Matérias Disponíveis */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableSubjects.map((subject) => {
          const progress = getSubjectProgress(subject);
          const flashcards = getFlashcardsBySubject(subject.id);
          const filteredCards = selectedDifficulty === 'all' 
            ? flashcards 
            : flashcards.filter(card => card.difficulty === selectedDifficulty);
          
          return (
            <Card 
              key={subject.id} 
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              onClick={() => onSelectSubject(subject)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${subject.color}`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {filteredCards.length} flashcards
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{subject.completedCards} concluídos</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {subject.totalCards} total
                  </Badge>
                </div>

                <Button className="w-full" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Estudar
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Matérias Bloqueadas (Premium) */}
      {!isPremium && lockedSubjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Matérias Premium</h3>
            <Badge variant="secondary">DESBLOQUEIE</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lockedSubjects.map((subject) => (
              <Card key={subject.id} className="opacity-60 relative">
                <div className="absolute inset-0 backdrop-blur-sm bg-background/50 rounded-lg flex items-center justify-center z-10">
                  <Button
                    onClick={() => window.location.href = '/pricing'}
                    variant="default"
                    className="bg-gradient-to-r from-primary to-accent"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Desbloquear
                  </Button>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${subject.color} opacity-50`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {subject.totalCards} flashcards
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">***</span>
                    </div>
                    <Progress value={0} className="h-2 opacity-50" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>*** concluídos</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      PREMIUM
                    </Badge>
                  </div>

                  <Button className="w-full" size="sm" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Bloqueado
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Banner de Conversão */}
      {!isPremium && (
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-6 text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                Acesso Completo aos Flashcards
              </h3>
              <p className="text-sm text-muted-foreground">
                Desbloqueie todas as 14 matérias com 280+ flashcards inteligentes
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">280+</div>
                <div className="text-xs text-muted-foreground">Flashcards</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">14</div>
                <div className="text-xs text-muted-foreground">Matérias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Cobertura ENEM</div>
              </div>
            </div>

            <Button
              onClick={() => window.location.href = '/pricing'}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              <Zap className="mr-2 h-4 w-4" />
              Desbloquear Todas as Matérias - R$ 297
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


