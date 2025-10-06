import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, Clock, Flame, TrendingUp, Brain, Trophy, 
  Zap, Lock, CheckCircle, AlertTriangle 
} from "lucide-react";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StatsCardsProps {
  showUpgrade?: boolean;
}

export const StatsCards = ({ showUpgrade = true }: StatsCardsProps) => {
  const navigate = useNavigate();
  const {
    isPremium,
    dailyQuestionsLimit,
    dailyQuestionsUsed,
    maxStreak,
    currentStreak,
    maxStudyHours,
    studyHoursToday
  } = useFreemiumLimits();

  // Simular progresso geral (será conectado ao banco real)
  const overallProgress = Math.min((dailyQuestionsUsed / 30) * 100, isPremium ? 100 : 15);
  const questionsToday = dailyQuestionsUsed;
  const streakDays = currentStreak;
  const studyHours = studyHoursToday;

  const cards = [
    {
      id: "progress",
      title: "Progresso Geral",
      value: `${overallProgress.toFixed(0)}%`,
      icon: Target,
      color: isPremium ? "text-primary" : "text-green-600",
      bgColor: isPremium ? "bg-primary/10" : "bg-green-500/10",
      borderColor: isPremium ? "border-primary/20" : "border-green-500/30",
      progress: overallProgress,
      limit: isPremium ? null : "15% máximo",
      description: isPremium ? "Progresso completo" : "Versão gratuita limitada"
    },
    {
      id: "questions",
      title: "Questões Hoje",
      value: `${questionsToday}/${isPremium ? "∞" : dailyQuestionsLimit}`,
      icon: Brain,
      color: isPremium ? "text-primary" : "text-blue-600",
      bgColor: isPremium ? "bg-primary/10" : "bg-blue-500/10",
      borderColor: isPremium ? "border-primary/20" : "border-blue-500/30",
      progress: isPremium ? 100 : (questionsToday / dailyQuestionsLimit) * 100,
      limit: isPremium ? null : "5 questões/dia",
      description: isPremium ? "Questões ilimitadas" : "Limite diário ativo"
    },
    {
      id: "streak",
      title: "Sequência",
      value: `${streakDays} ${isPremium ? "dias" : `/${maxStreak} dias`}`,
      icon: Flame,
      color: isPremium ? "text-primary" : "text-orange-600",
      bgColor: isPremium ? "bg-primary/10" : "bg-orange-500/10",
      borderColor: isPremium ? "border-primary/20" : "border-orange-500/30",
      progress: isPremium ? 100 : (streakDays / maxStreak) * 100,
      limit: isPremium ? null : "7 dias máximo",
      description: isPremium ? "Sequência ilimitada" : "Sequência limitada"
    },
    {
      id: "study",
      title: "Horas Estudadas",
      value: `${studyHours.toFixed(1)}h ${isPremium ? "" : `/ ${maxStudyHours}h`}`,
      icon: Clock,
      color: isPremium ? "text-primary" : "text-purple-600",
      bgColor: isPremium ? "bg-primary/10" : "bg-purple-500/10",
      borderColor: isPremium ? "border-primary/20" : "border-purple-500/30",
      progress: isPremium ? 100 : (studyHours / maxStudyHours) * 100,
      limit: isPremium ? null : "3h/dia máximo",
      description: isPremium ? "Estudo ilimitado" : "Tempo limitado"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        const isLimited = !isPremium && card.limit;
        const isAtLimit = !isPremium && card.progress >= 100;

        return (
          <Card 
            key={card.id} 
            className={`${card.borderColor} ${card.bgColor} transition-all duration-200 hover:shadow-md`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </div>
                {isLimited && (
                  <Badge 
                    variant={isAtLimit ? "destructive" : "secondary"} 
                    className="text-xs"
                  >
                    {isAtLimit ? "LIMITADO" : "LIMITADO"}
                  </Badge>
                )}
              </div>
              
              <Progress 
                value={card.progress} 
                className={`h-2 ${isAtLimit ? 'opacity-50' : ''}`} 
              />
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isAtLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {card.description}
                </span>
                {isLimited && (
                  <Lock className="h-3 w-3 text-muted-foreground" />
                )}
              </div>

              {isAtLimit && showUpgrade && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/pricing")}
                  className="w-full text-xs h-7"
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Desbloquear
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


