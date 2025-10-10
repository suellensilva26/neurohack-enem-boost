import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, Star, Zap, Target, Brain, CheckCircle, 
  Crown, Medal, Award, Flame, BookOpen, Clock,
  TrendingUp, Users, Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  completed: boolean;
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalStudyHours: number;
  questionsAnswered: number;
  accuracy: number;
  rank: number;
  badges: Badge[];
  achievements: Achievement[];
}

const badges: Badge[] = [
  {
    id: "first_steps",
    name: "Primeiros Passos",
    description: "Complete seu primeiro dia de estudos",
    icon: <Target className="h-5 w-5" />,
    rarity: "common",
    requirement: "1 dia de estudo",
    unlocked: false,
    xpReward: 50
  },
  {
    id: "streak_7",
    name: "Semana de Ferro",
    description: "Mantenha uma sequência de 7 dias",
    icon: <Flame className="h-5 w-5" />,
    rarity: "rare",
    requirement: "7 dias consecutivos",
    unlocked: false,
    xpReward: 200
  },
  {
    id: "streak_30",
    name: "Mestre da Disciplina",
    description: "30 dias de estudo consecutivo",
    icon: <Crown className="h-5 w-5" />,
    rarity: "legendary",
    requirement: "30 dias consecutivos",
    unlocked: false,
    xpReward: 1000
  },
  {
    id: "flashcard_master",
    name: "Mestre dos Flashcards",
    description: "Acertou 100 flashcards",
    icon: <Brain className="h-5 w-5" />,
    rarity: "epic",
    requirement: "100 acertos em flashcards",
    unlocked: false,
    xpReward: 500
  },
  {
    id: "question_solver",
    name: "Resolvedor de Questões",
    description: "Resolveu 500 questões",
    icon: <CheckCircle className="h-5 w-5" />,
    rarity: "epic",
    requirement: "500 questões respondidas",
    unlocked: false,
    xpReward: 500
  },
  {
    id: "accuracy_king",
    name: "Rei da Precisão",
    description: "Manteve 90% de acerto por 7 dias",
    icon: <Medal className="h-5 w-5" />,
    rarity: "rare",
    requirement: "90% acerto por 7 dias",
    unlocked: false,
    xpReward: 300
  },
  {
    id: "speed_demon",
    name: "Demônio da Velocidade",
    description: "Resolveu 20 questões em 15 minutos",
    icon: <Zap className="h-5 w-5" />,
    rarity: "rare",
    requirement: "20 questões em 15 min",
    unlocked: false,
    xpReward: 250
  },
  {
    id: "night_owl",
    name: "Coruja Noturna",
    description: "Estudou após 22h por 5 dias",
    icon: <Clock className="h-5 w-5" />,
    rarity: "common",
    requirement: "Estudo após 22h",
    unlocked: false,
    xpReward: 100
  },
  {
    id: "early_bird",
    name: "Madrugador",
    description: "Estudou antes das 6h por 5 dias",
    icon: <Star className="h-5 w-5" />,
    rarity: "common",
    requirement: "Estudo antes das 6h",
    unlocked: false,
    xpReward: 100
  },
  {
    id: "perfectionist",
    name: "Perfeccionista",
    description: "Acertou 100% em um simulado",
    icon: <Trophy className="h-5 w-5" />,
    rarity: "legendary",
    requirement: "100% em simulado",
    unlocked: false,
    xpReward: 750
  }
];

const achievements: Achievement[] = [
  {
    id: "study_hours_10",
    name: "Maratonista",
    description: "Complete 10 horas de estudo",
    progress: 0,
    maxProgress: 10,
    reward: "100 XP + Badge especial",
    completed: false
  },
  {
    id: "study_hours_50",
    name: "Veterano",
    description: "Complete 50 horas de estudo",
    progress: 0,
    maxProgress: 50,
    reward: "500 XP + Acesso premium por 1 semana",
    completed: false
  },
  {
    id: "questions_100",
    name: "Centenário",
    description: "Responda 100 questões",
    progress: 0,
    maxProgress: 100,
    reward: "200 XP + Simulado exclusivo",
    completed: false
  },
  {
    id: "questions_1000",
    name: "Milenar",
    description: "Responda 1000 questões",
    progress: 0,
    maxProgress: 1000,
    reward: "1000 XP + Consultoria personalizada",
    completed: false
  },
  {
    id: "perfect_week",
    name: "Semana Perfeita",
    description: "Complete todos os objetivos por 7 dias",
    progress: 0,
    maxProgress: 7,
    reward: "300 XP + Badge dourado",
    completed: false
  }
];

export const GamificationSystem = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    streak: 0,
    totalStudyHours: 0,
    questionsAnswered: 0,
    accuracy: 0,
    rank: 0,
    badges: badges,
    achievements: achievements
  });
  const [showBadgeNotification, setShowBadgeNotification] = useState<Badge | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Carregar dados do usuário
      const { data: dailyUsage } = await supabase
        .from("daily_usage")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(30);

      if (dailyUsage) {
        const totalHours = dailyUsage.reduce((sum, day) => sum + (day.study_hours || 0), 0);
        const totalQuestions = dailyUsage.reduce((sum, day) => sum + (day.questions_answered || 0), 0);
        const currentStreak = calculateStreak(dailyUsage);
        
        // Calcular XP baseado nas atividades
        const xp = (totalHours * 10) + (totalQuestions * 2) + (currentStreak * 5);
        const level = Math.floor(xp / 100) + 1;
        const xpToNext = 100 - (xp % 100);

        setUserStats(prev => ({
          ...prev,
          level,
          xp,
          xpToNext,
          streak: currentStreak,
          totalStudyHours: totalHours,
          questionsAnswered: totalQuestions,
          accuracy: calculateAccuracy(dailyUsage)
        }));

        // Verificar badges e achievements
        checkBadgesAndAchievements({
          level,
          xp,
          streak: currentStreak,
          totalStudyHours: totalHours,
          questionsAnswered: totalQuestions
        });
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const calculateStreak = (dailyUsage: any[]) => {
    if (!dailyUsage.length) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < dailyUsage.length; i++) {
      const dayDate = new Date(dailyUsage[i].date);
      const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak && dailyUsage[i].study_hours > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateAccuracy = (dailyUsage: any[]) => {
    // Simulação - em um sistema real, isso viria de dados de questões
    return Math.random() * 30 + 70; // 70-100%
  };

  const checkBadgesAndAchievements = (stats: any) => {
    const updatedBadges = badges.map(badge => {
      let unlocked = badge.unlocked;
      
      switch (badge.id) {
        case "first_steps":
          unlocked = stats.totalStudyHours > 0;
          break;
        case "streak_7":
          unlocked = stats.streak >= 7;
          break;
        case "streak_30":
          unlocked = stats.streak >= 30;
          break;
        case "flashcard_master":
          unlocked = stats.questionsAnswered >= 100;
          break;
        case "question_solver":
          unlocked = stats.questionsAnswered >= 500;
          break;
        case "accuracy_king":
          unlocked = stats.accuracy >= 90;
          break;
        case "speed_demon":
          unlocked = stats.questionsAnswered >= 20; // Simplificado
          break;
      }
      
      if (unlocked && !badge.unlocked) {
        // Badge recém-desbloqueado
        setTimeout(() => {
          setShowBadgeNotification(badge);
          toast({
            title: "🏆 Badge Desbloqueado!",
            description: `Você conquistou: ${badge.name}`,
          });
        }, 1000);
      }
      
      return { ...badge, unlocked };
    });

    setUserStats(prev => ({ ...prev, badges: updatedBadges }));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600 bg-gray-100 border-gray-300";
      case "rare": return "text-blue-600 bg-blue-100 border-blue-300";
      case "epic": return "text-purple-600 bg-purple-100 border-purple-300";
      case "legendary": return "text-gold bg-yellow-100 border-gold";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getLevelTitle = (level: number) => {
    if (level >= 50) return "Lenda do ENEM";
    if (level >= 30) return "Mestre Supremo";
    if (level >= 20) return "Mestre";
    if (level >= 15) return "Expert";
    if (level >= 10) return "Avançado";
    if (level >= 5) return "Intermediário";
    return "Iniciante";
  };

  return (
    <div className="space-y-6">
      {/* Header com level e XP */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gold text-white">
                  {userStats.level}
                </Badge>
              </div>
              <div>
                <h3 className="text-xl font-bold">{getLevelTitle(userStats.level)}</h3>
                <p className="text-muted-foreground">{userStats.xp} XP total</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">dias de sequência</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso para próximo nível</span>
              <span>{userStats.xpToNext}/100 XP</span>
            </div>
            <Progress value={((100 - userStats.xpToNext) / 100) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{userStats.totalStudyHours}h</div>
            <div className="text-sm text-muted-foreground">Horas estudadas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{userStats.questionsAnswered}</div>
            <div className="text-sm text-muted-foreground">Questões respondidas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{Math.round(userStats.accuracy)}%</div>
            <div className="text-sm text-muted-foreground">Taxa de acerto</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">#{userStats.rank || "---"}</div>
            <div className="text-sm text-muted-foreground">Posição no ranking</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            Suas Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {userStats.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                  badge.unlocked 
                    ? "border-primary/20 bg-primary/5" 
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className={`p-2 rounded-lg ${badge.unlocked ? getRarityColor(badge.rarity) : "bg-gray-200"}`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{badge.name}</h4>
                    {badge.unlocked && (
                      <Badge className={`text-xs ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {!badge.unlocked && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Requisito: {badge.requirement}
                    </p>
                  )}
                </div>
                {badge.unlocked && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gold">+{badge.xpReward} XP</div>
                    <div className="text-xs text-muted-foreground">Desbloqueado</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-purple-500" />
            Missões Especiais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userStats.achievements.map((achievement) => (
              <div key={achievement.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{achievement.name}</h4>
                  <Badge variant={achievement.completed ? "default" : "outline"}>
                    {achievement.completed ? "Completo" : "Em progresso"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">Recompensa: {achievement.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge Notification Modal */}
      {showBadgeNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-gold/30 bg-gradient-to-br from-gold/10 to-gold/5">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Badge Desbloqueado!</h3>
              <div className={`inline-flex items-center gap-2 p-3 rounded-lg ${getRarityColor(showBadgeNotification.rarity)} mb-4`}>
                {showBadgeNotification.icon}
                <span className="font-medium">{showBadgeNotification.name}</span>
              </div>
              <p className="text-muted-foreground mb-4">{showBadgeNotification.description}</p>
              <div className="text-lg font-bold text-gold mb-4">
                +{showBadgeNotification.xpReward} XP
              </div>
              <Button 
                onClick={() => setShowBadgeNotification(null)}
                className="w-full"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
