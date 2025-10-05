import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, TrendingUp, Zap, Lock } from "lucide-react";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LimitedDashboard = () => {
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

  const progressPercent = Math.min((dailyQuestionsUsed / dailyQuestionsLimit) * 100, 15);
  const streakPercent = (currentStreak / maxStreak) * 100;
  const hoursPercent = (studyHoursToday / maxStudyHours) * 100;

  return (
    <div className="space-y-6">
      {/* Progresso Limitado */}
      <Card className={isPremium ? "border-primary/20" : "border-green-500/30 bg-green-500/5"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className={isPremium ? "h-5 w-5 text-primary" : "h-5 w-5 text-green-600"} />
              Seu Progresso
            </CardTitle>
            {!isPremium && (
              <Badge className="bg-green-600 text-white">
                VERSÃO GRATUITA
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progresso Total</span>
              <span className="text-sm font-bold">{progressPercent.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            {!isPremium && progressPercent >= 15 && (
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ Progresso limitado a 15% na versão gratuita
              </p>
            )}
          </div>

          {/* Questões do Dia */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Questões Hoje</span>
              <span className="text-sm font-bold">
                {dailyQuestionsUsed}/{isPremium ? "∞" : dailyQuestionsLimit}
              </span>
            </div>
            <Progress 
              value={(dailyQuestionsUsed / (isPremium ? 100 : dailyQuestionsLimit)) * 100} 
              className="h-2" 
            />
            {!isPremium && dailyQuestionsUsed >= dailyQuestionsLimit && (
              <p className="text-xs text-destructive mt-2">
                Limite diário atingido! Desbloqueie ilimitado no premium.
              </p>
            )}
          </div>

          {/* Streak */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                Sequência de Estudos
              </span>
              <span className="text-sm font-bold">
                {currentStreak} {isPremium ? "" : `/ ${maxStreak}`} dias
              </span>
            </div>
            <Progress value={streakPercent} className="h-2" />
            {!isPremium && currentStreak >= maxStreak && (
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ Sequência limitada a 7 dias na versão gratuita
              </p>
            )}
          </div>

          {/* Horas de Estudo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Horas Hoje
              </span>
              <span className="text-sm font-bold">
                {studyHoursToday.toFixed(1)}h {isPremium ? "" : `/ ${maxStudyHours}h`}
              </span>
            </div>
            <Progress value={hoursPercent} className="h-2" />
            {!isPremium && studyHoursToday >= maxStudyHours && (
              <p className="text-xs text-destructive mt-2">
                Limite diário de 3h atingido! Estude sem limites no premium.
              </p>
            )}
          </div>

          {/* Métricas Bloqueadas */}
          {!isPremium && (
            <div className="mt-6 relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-background/50 rounded-lg flex items-center justify-center z-10">
                <Button
                  onClick={() => navigate("/pricing")}
                  variant="default"
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Desbloquear Análise Completa
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Cronograma IA</div>
                  <div className="text-2xl font-bold">***</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Pontos Fracos</div>
                  <div className="text-2xl font-bold">***</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Simulador Nota</div>
                  <div className="text-2xl font-bold">***</div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Analytics</div>
                  <div className="text-2xl font-bold">***</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Banner de Prova Social */}
      {!isPremium && (
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">Usuários premium acertam 67% mais questões</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              2.847 estudantes já garantiram vaga este mês com acesso completo
            </p>
            <Button
              onClick={() => navigate("/pricing")}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              Acelerar Aprovação Agora
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
