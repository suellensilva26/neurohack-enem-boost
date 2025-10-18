import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, Target, BookOpen, Brain, Clock, Flame, 
  TrendingUp, Zap, Award, AlertTriangle, CheckCircle,
  Play, BarChart3, Calendar, Trophy, Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFreemiumLimits } from "@/hooks/useFreemiumLimits";
import { CountdownTimer } from "./CountdownTimer";
import { StatsCards } from "./StatsCards";

const motivationalQuotes = [
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Cada questão que você resolve hoje é um passo em direção à sua aprovação.",
  "A diferença entre o possível e o impossível está na determinação.",
  "Você não precisa ser perfeito, precisa ser consistente.",
  "O ENEM não é sobre saber tudo, é sobre saber o essencial.",
  "Cada dia de estudo te aproxima da sua vaga na universidade.",
  "A preparação de hoje é a aprovação de amanhã.",
  "Persistência é o caminho do êxito."
];

export const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const { isPremium, canAccessContent } = useFreemiumLimits();
  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Simular dados de progresso (conectar ao banco real depois)
  const [progressData] = useState({
    totalQuestions: 1247,
    correctAnswers: 892,
    studyHours: 67.5,
    streakDays: 12,
    weakSubjects: ["Física", "Química", "Matemática"],
    strongSubjects: ["Português", "História", "Geografia"]
  });

  const quickActions = [
    {
      id: "daily-question",
      title: "Questão do Dia",
      icon: Target,
      description: "Uma questão recorrente com explicação",
      color: "bg-green-500",
      available: true,
      premium: false
    },
    {
      id: "flashcards",
      title: "Flashcards",
      icon: Brain,
      description: "Revise com flashcards inteligentes",
      color: "bg-blue-500",
      available: true,
      premium: false
    },
    {
      id: "checklist",
      title: "Checklist Essencial",
      icon: CheckCircle,
      description: "Tópicos com 80%+ de recorrência ENEM",
      color: "bg-purple-500",
      available: true,
      premium: false
    },
    {
      id: "simulado",
      title: "Simulado Completo",
      icon: BookOpen,
      description: "180 questões cronometradas",
      color: "bg-purple-500",
      available: isPremium,
      premium: true
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
      description: "Análise detalhada do seu progresso",
      color: "bg-orange-500",
      available: isPremium,
      premium: true
    },
    {
      id: "cronograma",
      title: "Cronograma IA",
      icon: Calendar,
      description: "Plano personalizado de estudos",
      color: "bg-pink-500",
      available: isPremium,
      premium: true
    },
    {
      id: "redacao",
      title: "Redação Completa",
      icon: Award,
      description: "Temas, repertórios e correção",
      color: "bg-red-500",
      available: isPremium,
      premium: true
    }
  ];

  const handleQuickAction = (action: typeof quickActions[0]) => {
    if (!action.available && action.premium) {
      setShowUpgradeModal(true);
      return;
    }
    
    // Navegar para a funcionalidade específica
    navigate(`/${action.id}`);
  };

  const accuracy = progressData.totalQuestions > 0 
    ? ((progressData.correctAnswers / progressData.totalQuestions) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      {/* Header com Contador */}
      <CountdownTimer />

      {/* Cards de Estatísticas */}
      <StatsCards />

      {/* Citação Motivacional */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-2">
                💡 Citação Motivacional do Dia
              </h3>
              <p className="italic text-foreground">
                "{currentQuote}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Seu Progresso Detalhado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Acerto</span>
                <span className="font-semibold">{accuracy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questões Resolvidas</span>
                <span className="font-semibold">{progressData.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Acertos</span>
                <span className="font-semibold text-green-600">{progressData.correctAnswers}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horas de Estudo</span>
                <span className="font-semibold">{progressData.studyHours}h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sequência Atual</span>
                <span className="font-semibold flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  {progressData.streakDays} dias
                </span>
              </div>
            </div>
          </div>

          {/* Matérias Fracas e Fortes */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                🎯 Matérias Fortes
              </h4>
              <div className="flex flex-wrap gap-1">
                {progressData.strongSubjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                ⚠️ Pontos de Atenção
              </h4>
              <div className="flex flex-wrap gap-1">
                {progressData.weakSubjects.map((subject) => (
                  <Badge key={subject} variant="destructive" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              const isLocked = action.premium && !action.available;
              
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-auto p-4 justify-start ${isLocked ? 'opacity-60' : 'hover:shadow-md'} transition-all`}
                  onClick={() => handleQuickAction(action)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-2 rounded-lg ${action.color} ${isLocked ? 'opacity-50' : ''}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{action.title}</h4>
                        {action.premium && !isPremium && (
                          <Badge variant="secondary" className="text-xs">
                            PREMIUM
                          </Badge>
                        )}
                        {isLocked && (
                          <Badge variant="destructive" className="text-xs">
                            BLOQUEADO
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Banner de Conversão */}
      {!isPremium && (
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                <span className="font-bold text-lg">Usuários premium acertam 67% mais questões</span>
              </div>
              <p className="text-sm text-muted-foreground">
                2.847 estudantes já garantiram vaga este mês com acesso completo
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => navigate("/pricing")}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Acelerar Aprovação - R$ 197
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/pricing")}
                >
                  Ver Predição de Nota
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Upgrade */}
      {!isPremium && showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Funcionalidade Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Esta funcionalidade está disponível apenas para usuários premium.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/pricing")}
                  className="flex-1 bg-gradient-to-r from-primary to-accent"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Desbloquear Agora
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
